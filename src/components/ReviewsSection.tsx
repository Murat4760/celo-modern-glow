import { useLanguage } from "@/i18n/LanguageContext";
import { Star } from "lucide-react";

const ReviewsSection = () => {
  const { t } = useLanguage();

  return (
    <section className="px-5 py-24 bg-secondary/30">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-copper">
            {t.reviews.subtitle}
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {t.reviews.title}{" "}
            <span className="italic font-light">{t.reviews.titleItalic}</span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className="h-5 w-5 fill-copper text-copper"
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              4.5 / 5 · Google
            </span>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.reviews.items.map((review, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-background p-6 transition-colors hover:border-copper/40"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-copper-gradient text-sm font-bold text-accent-foreground">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {review.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
                <div className="ml-auto flex">
                  {Array.from({ length: review.stars }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-3.5 w-3.5 fill-copper text-copper"
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                "{review.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
