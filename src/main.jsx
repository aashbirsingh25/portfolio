import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.css'
import App from './App.jsx'

gsap.registerPlugin(ScrollTrigger)

// Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync
// with the momentum scrolling (this is the standard Lenis + ScrollTrigger wiring).
const lenis = new Lenis({
  duration: 1.15,
  easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  smoothWheel: true,
})
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)

// Smooth-scroll anchor links via Lenis.
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]')
  if (link) {
    const id = link.getAttribute('href')
    if (id && id.length > 1) {
      const el = document.querySelector(id)
      if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: -40 }) }
    }
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
