import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Work from "./components/Work";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Marquee />
      <Services />
      <Work />
      <About />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
