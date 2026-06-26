import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import QuickActions from "@/components/QuickActions";
import MenuSection from "@/components/MenuSection";
import GallerySection from "@/components/GallerySection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <MenuSection />
      <GallerySection />
      <Footer />
      <QuickActions />
    </>
  );
}
