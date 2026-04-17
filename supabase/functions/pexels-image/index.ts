// Edge function: GET /pexels-image?q=<query>
// Returns { url: string | null } — the medium-size URL of the first Pexels result.
// Keeps PEXELS_API_KEY server-side.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

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

    const apiKey = Deno.env.get("PEXELS_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "PEXELS_API_KEY not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const query = encodeURIComponent(`${q} food`);
    const pexelsRes = await fetch(
      `https://api.pexels.com/v1/search?query=${query}&per_page=1`,
      { headers: { Authorization: apiKey } },
    );

    if (!pexelsRes.ok) {
      return new Response(
        JSON.stringify({ error: `pexels ${pexelsRes.status}`, url: null }),
        {
          status: 200, // soft-fail so client falls back gracefully
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
            // cache failures briefly to avoid hammering Pexels
            "Cache-Control": "public, max-age=60",
          },
        },
      );
    }

    const data = await pexelsRes.json();
    const photo = data?.photos?.[0];
    const imageUrl: string | null = photo?.src?.medium ?? null;

    return new Response(JSON.stringify({ url: imageUrl }), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        // cache successful lookups for a day in the browser/CDN
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: (e as Error).message, url: null }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
