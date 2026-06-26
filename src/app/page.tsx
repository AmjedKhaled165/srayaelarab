import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedMenu from "@/components/FeaturedMenu";
import FeaturedGallery from "@/components/FeaturedGallery";
import HomeContact from "@/components/HomeContact";
import Footer from "@/components/Footer";
import QuickActions from "@/components/QuickActions";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturedMenu />
      <FeaturedGallery />
      <HomeContact />
      <Footer />
      <QuickActions />
    </>
  );
}
