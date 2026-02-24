const AboutSection = () => {
  return (
    <section id="about" className="relative py-24 px-6">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-copper">
          Our Philosophy
        </p>
        <h2 className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl">
          Fire, Copper &{" "}
          <span className="italic font-light">Tradition</span>
        </h2>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
          At CELO, we honour the ancient art of Anatolian fire cooking. Our
          copper pots are hand-hammered in Gaziantep, our lamb sourced from the
          highlands of Eastern Turkey, and our spices ground fresh each morning.
          Every dish is a bridge between centuries of tradition and the bold
          flavours of today.
        </p>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {[
            { value: "6+", label: "Hours Slow-Cooked" },
            { value: "1200°", label: "Charcoal Heat" },
            { value: "100%", label: "Open Fire" },
          ].map((stat) => (
            <div key={stat.label} className="space-y-2">
              <p className="text-copper-gradient text-4xl font-bold">
                {stat.value}
              </p>
              <p className="text-sm uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
