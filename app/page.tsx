import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Destinos from "@/components/Destinos";
import Flota from "@/components/Flota";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Destinos />
      <Flota />
      <Blog />
      <Footer />
      <Chatbot />
    </>
  );
}
