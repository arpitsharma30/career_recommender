import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? 'rgba(248,245,240,0.92)' : 'transparent',
        borderBottom: scrolled ? '1px solid #ede8df' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <nav style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }}>CP</div>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 19, fontWeight: 600, color: '#1a1814', letterSpacing: '0.01em' }}>
            CareerPath <span style={{ color: '#f97316' }}>India</span>
          </span>
        </div>
        <a href="#career-form"
          style={{ fontSize: 13, fontWeight: 600, color: '#1a1814', textDecoration: 'none', padding: '8px 20px', borderRadius: 100, border: '1.5px solid rgba(26,24,20,0.12)', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.target.style.background = '#1a1814'; e.target.style.color = '#f8f5f0' }}
          onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#1a1814' }}>
          Begin →
        </a>
      </nav>
    </motion.header>
  )
}