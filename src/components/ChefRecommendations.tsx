import zirhKebab from "@/assets/zirh-kebab.jpg";
import pide from "@/assets/pide.jpg";
import baklava from "@/assets/baklava.jpg";

const dishes = [
  {
    name: "Zırh Kebabı",
    description:
      "Slow-cooked lamb sealed in a copper pot, roasted over charcoal for 6 hours. A centuries-old Anatolian tradition.",
    price: "₺450",
    tag: "Signature",
    image: zirhKebab,
  },
  {
    name: "Kuşbaşılı Pide",
    description:
      "Hand-stretched flatbread filled with tender diced lamb, roasted peppers, and sumac butter.",
    price: "₺280",
    tag: "Popular",
    image: pide,
  },
  {
    name: "Antep Baklavası",
    description:
      "40-layer filo pastry with Gaziantep pistachios, bathed in wild flower honey syrup.",
    price: "₺180",
    tag: "Dessert",
    image: baklava,
  },
];

const ChefRecommendations = () => {
  return (
    <section id="menu" className="relative py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-copper">
            Curated Selection
          </p>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Chef's <span className="italic font-light">Recommendations</span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {dishes.map((dish) => (
            <div
              key={dish.name}
              className="group relative overflow-hidden rounded-2xl border border-copper bg-card transition-all duration-500 hover:glow-copper"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-copper-gradient rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
                    {dish.tag}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{dish.name}</h3>
                  <span className="text-lg font-bold text-copper">
                    {dish.price}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {dish.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChefRecommendations;
