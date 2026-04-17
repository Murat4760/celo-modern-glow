// Edge function: GET /ai-food-image?q=<dish name>
// Returns { url: string | null }
// 1. Slugifies the query into a stable filename.
// 2. If the file already exists in the `menu-images` bucket, returns its public URL.
// 3. Otherwise calls Lovable AI (Gemini image model) to generate an appetizing
//    food photo, uploads it to storage, and returns the public URL.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const BUCKET = "menu-images";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function buildPrompt(dish: string): string {
  // Carefully-tuned prompt for consistent, appetizing, professional food photos.
  return [
    `A high-end professional food photograph of "${dish}", a traditional Turkish dish.`,
    "Overhead three-quarter angle, served on rustic ceramic or copper tableware,",
    "warm golden natural lighting, soft shallow depth of field, steam rising slightly,",
    "garnished authentically with fresh herbs, lemon, or accompanying mezze where appropriate.",
    "Dark moody background with subtle wooden table texture.",
    "Editorial restaurant menu photography style, ultra detailed, sharp focus on the food.",
    "Absolutely no text, no watermarks, no logos, no people, no hands, no cutlery in motion.",
  ].join(" ");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const q = (url.searchParams.get("q") || "").trim();
    if (!q) {
      return new Response(JSON.stringify({ error: "missing q" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

    const slug = slugify(q);
    if (!slug) {
      return new Response(JSON.stringify({ url: null }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const path = `${slug}.png`;
    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;

    // 1) Check cache: HEAD the public URL
    const head = await fetch(publicUrl, { method: "HEAD" });
    if (head.ok) {
      return new Response(JSON.stringify({ url: publicUrl, cached: true }), {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=86400",
        },
      });
    }

    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "LOVABLE_API_KEY not configured", url: null }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // 2) Generate via Lovable AI Gateway
    const aiRes = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-image",
          messages: [{ role: "user", content: buildPrompt(q) }],
          modalities: ["image", "text"],
        }),
      },
    );

    if (!aiRes.ok) {
      const txt = await aiRes.text();
      console.error("AI gateway error:", aiRes.status, txt);
      const status = aiRes.status === 429 || aiRes.status === 402 ? aiRes.status : 200;
      return new Response(
        JSON.stringify({ error: `ai ${aiRes.status}`, url: null }),
        {
          status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const aiJson = await aiRes.json();
    const dataUrl: string | undefined =
      aiJson?.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!dataUrl || !dataUrl.startsWith("data:")) {
      console.error("No image in AI response", JSON.stringify(aiJson).slice(0, 500));
      return new Response(JSON.stringify({ url: null }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Decode base64 data URL → bytes
    const commaIdx = dataUrl.indexOf(",");
    const meta = dataUrl.slice(5, commaIdx); // "image/png;base64"
    const contentType = meta.split(";")[0] || "image/png";
    const b64 = dataUrl.slice(commaIdx + 1);
    const bin = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));

    // 3) Upload to storage (idempotent: if a parallel request already wrote it, ignore)
    const { error: uploadErr } = await supabase.storage
      .from(BUCKET)
      .upload(path, bin, { contentType, upsert: true });

    if (uploadErr) {
      console.error("Upload error:", uploadErr.message);
      return new Response(JSON.stringify({ url: null, error: uploadErr.message }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ url: publicUrl, cached: false }), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (e) {
    console.error("ai-food-image error:", e);
    return new Response(
      JSON.stringify({ error: (e as Error).message, url: null }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
