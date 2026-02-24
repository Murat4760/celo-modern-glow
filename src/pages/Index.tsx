import HeroSection from "@/components/HeroSection";
import ChefRecommendations from "@/components/ChefRecommendations";
import AboutSection from "@/components/AboutSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <ChefRecommendations />
      <AboutSection />
      <FooterSection />
    </main>
  );
};

export default Index;
