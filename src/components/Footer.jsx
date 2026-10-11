import { Braces } from "lucide-react";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <a href="#top" className="logo"><span className="logo-mark"><Braces /></span>Aashbir Singh</a>
        <p>Websites for business, made smarter with AI.</p>
        <p className="footer-copy">© {new Date().getFullYear()} Aashbir Singh</p>
      </div>
    </footer>
  );
}

export default Footer;
