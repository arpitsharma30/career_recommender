import { motion } from 'framer-motion'

const c = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const i = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }

export default function Hero({ onGetStarted }) {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 32px 60px', position: 'relative', overflow: 'hidden', background: '#f8f5f0' }}>
      {/* Subtle texture circles */}
      <div style={{ position: 'absolute', top: '15%', right: '8%', width: 320, height: 320, borderRadius: '50%', border: '1px solid rgba(249,115,22,0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '20%', right: '12%', width: 200, height: 200, borderRadius: '50%', border: '1px solid rgba(249,115,22,0.06)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '20%', left: '5%', width: 260, height: 260, borderRadius: '50%', border: '1px solid rgba(26,24,20,0.04)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 780, textAlign: 'center', position: 'relative' }}>
        <motion.div variants={c} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>

          <motion.div variants={i}>
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', color: '#f97316', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 24, height: 1.5, background: '#f97316', display: 'inline-block', borderRadius: 2 }} />
              AI-Powered Career Guidance for India
              <span style={{ width: 24, height: 1.5, background: '#f97316', display: 'inline-block', borderRadius: 2 }} />
            </span>
          </motion.div>

          <motion.h1 variants={i} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(52px, 8vw, 92px)', fontWeight: 600, lineHeight: 1.02, letterSpacing: '-0.02em', color: '#1a1814', margin: 0 }}>
            Find the career<br />
            <em style={{ fontStyle: 'italic', color: '#f97316' }}>you were born for</em>
          </motion.h1>

          <motion.p variants={i} style={{ fontSize: 16, lineHeight: 1.75, color: '#6b6460', maxWidth: 500, margin: 0, fontWeight: 400 }}>
            Answer a few honest questions about your interests and strengths. Our AI maps personalised career paths built for the Indian job market.
          </motion.p>

          <motion.div variants={i} style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button onClick={onGetStarted} className="btn-orange">Start exploring →</button>
            <button className="btn-outline">See how it works</button>
          </motion.div>

          <motion.div variants={i} style={{ display: 'flex', gap: 48, paddingTop: 24, borderTop: '1px solid #ede8df', width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[['500+', 'Career paths mapped'], ['50K+', 'Students guided'], ['98%', 'Satisfaction rate']].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 700, color: '#1a1814', margin: '0 0 2px' }}>{v}</p>
                <p style={{ fontSize: 12, color: '#9b9490', margin: 0, letterSpacing: '0.04em' }}>{l}</p>
              </div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}