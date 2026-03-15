import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const msgs = ['Analysing your profile…', 'Mapping career pathways…', 'Consulting the Indian job market…', 'Personalising your results…']

function Cycling() {
  const [i, setI] = useState(0)
  useEffect(() => { const t = setInterval(() => setI(x => (x+1)%msgs.length), 1800); return () => clearInterval(t) }, [])
  return (
    <AnimatePresence mode="wait">
      <motion.p key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
        style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 600, color: '#1a1814', margin: 0, textAlign: 'center' }}>
        {msgs[i]}
      </motion.p>
    </AnimatePresence>
  )
}

export default function LoadingSpinner() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(248,245,240,0.96)', backdropFilter: 'blur(12px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        style={{ width: 44, height: 44, borderRadius: '50%', border: '2px solid #e8e3da', borderTop: '2px solid #f97316' }} />
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Cycling />
        <p style={{ fontSize: 12, color: '#b8b0a4', margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Usually 2–5 seconds</p>
      </div>
    </motion.div>
  )
}