import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ChefRecommendations from "@/components/ChefRecommendations";
import ReviewsSection from "@/components/ReviewsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ChefRecommendations />
      <ReviewsSection />
      <AboutSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
};

export default Index;
