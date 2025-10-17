import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Ministries from "@/components/Ministries";

const MinistriesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <Ministries />
      </main>
      <Footer />
    </div>
  );
};

export default MinistriesPage;
