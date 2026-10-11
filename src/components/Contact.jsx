import { useState } from "react";
import { Mail, MessageCircle, Linkedin, Send, Check } from "lucide-react";
import Reveal from "./Reveal";

// Contact: a lead form plus direct channels. The form posts to Formspree
// (no backend needed). Submissions are emailed to the Formspree account owner.
const FORM_ID = "xaeqjvrg"; // Formspree form -> emails submissions to the account owner
const EMAIL = "singhaashbir1234@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/aashbirsingh";
// WhatsApp needs full international format. 7015307251 assumed India (+91).
const WHATSAPP = "https://wa.me/917015307251";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();

    // If Formspree isn't configured yet, fall back to a prefilled email so a
    // lead is never silently lost.
    if (FORM_ID === "YOUR_FORMSPREE_ID") {
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Project enquiry from " + form.name)}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORM_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus("sent"); setForm({ name: "", email: "", message: "" }); }
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <Reveal>
          <div className="contact-box">
            <span className="eyebrow">Contact</span>
            <h2 className="section-title">Let&apos;s build something that works</h2>
            <p className="section-subtitle">
              Tell me about your business and what you need — no commitment.
              I&apos;ll get back to you within 24 hours.
            </p>

            <div className="contact-layout">
              <form className="contact-form" onSubmit={handleSubmit}>
                {status === "sent" ? (
                  <div className="contact-sent">
                    <Check size={28} />
                    <p>Thanks — your message is in. I&apos;ll reply within 24 hours.</p>
                  </div>
                ) : (
                  <>
                    <input
                      type="text" required placeholder="Your name"
                      value={form.name} onChange={update("name")}
                    />
                    <input
                      type="email" required placeholder="Your email"
                      value={form.email} onChange={update("email")}
                    />
                    <textarea
                      required rows={4} placeholder="Tell me about your project..."
                      value={form.message} onChange={update("message")}
                    />
                    <button type="submit" className="btn" disabled={status === "sending"}>
                      <Send size={18} />
                      {status === "sending" ? "Sending..." : "Send message"}
                    </button>
                    {status === "error" && (
                      <p className="contact-err">
                        Something went wrong — email me directly at {EMAIL}.
                      </p>
                    )}
                  </>
                )}
              </form>

              <div className="contact-direct">
                <p className="contact-direct-label">Or reach me directly</p>
                <a href={`mailto:${EMAIL}`} className="contact-channel">
                  <Mail size={18} /> <span>{EMAIL}</span>
                </a>
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className="contact-channel">
                  <MessageCircle size={18} /> <span>WhatsApp</span>
                </a>
                <a href={LINKEDIN} target="_blank" rel="noreferrer" className="contact-channel">
                  <Linkedin size={18} /> <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Contact;
