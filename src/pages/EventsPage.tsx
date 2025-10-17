import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Events from "@/components/Events";

const EventsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <Events />
      </main>
      <Footer />
    </div>
  );
};

export default EventsPage;
