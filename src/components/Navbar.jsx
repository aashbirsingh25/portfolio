import { useState, useEffect } from "react";
import { Braces } from "lucide-react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <a href="#top" className="logo">
          <span className="logo-mark"><Braces /></span>Aashbir Singh
        </a>
        <ul className="nav-links">
          <li><a href="#services">What I do</a></li>
          <li><a href="#work">Work</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#contact" className="btn">Let&apos;s talk</a>
      </div>
    </nav>
  );
}

export default Navbar;
