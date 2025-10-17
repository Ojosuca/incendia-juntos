import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Worship from "@/components/Worship";

const WorshipPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <Worship />
      </main>
      <Footer />
    </div>
  );
};

export default WorshipPage;
