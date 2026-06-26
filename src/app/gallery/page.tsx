import Header from "@/components/Header";
import GallerySection from "@/components/GallerySection";
import QuickActions from "@/components/QuickActions";
import Footer from "@/components/Footer";

export default function GalleryPage() {
  return (
    <>
      <Header />
      <div className="pt-16" />
      <GallerySection />
      <Footer />
      <QuickActions />
    </>
  );
}
