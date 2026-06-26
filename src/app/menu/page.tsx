import Header from "@/components/Header";
import MenuSection from "@/components/MenuSection";
import QuickActions from "@/components/QuickActions";
import Footer from "@/components/Footer";

export default function MenuPage() {
  return (
    <>
      <Header />
      <div className="pt-16" />
      <MenuSection />
      <Footer />
      <QuickActions />
    </>
  );
}
