import { motion } from 'framer-motion'
import ResultCard from '../components/ResultCard'

export default function Results({ results, onReset }) {
  const careers = Array.isArray(results) ? results : results?.careers || results?.recommendations || []
  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ minHeight: '100vh', padding: '100px 24px 80px', background: '#f8f5f0' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ marginBottom: 48 }}>
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', color: '#f97316', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <span style={{ width: 20, height: 1.5, background: '#f97316', display: 'inline-block' }} />
            Your Results
          </span>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px,6vw,60px)', fontWeight: 700, color: '#1a1814', margin: '0 0 12px', lineHeight: 1.05 }}>
            Career paths matched to you
          </h2>
          <p style={{ fontSize: 15, color: '#6b6460', margin: 0, lineHeight: 1.7 }}>
            Click any card to explore the full details — salary, certifications, growth path, and more.
          </p>
        </motion.div>

        {careers.length > 0
          ? careers.map((c, i) => <ResultCard key={i} career={c} index={i} />)
          : (
            <div style={{ padding: 32, borderRadius: 16, border: '1.5px solid #ede8df', background: '#fff', textAlign: 'center' }}>
              <p style={{ color: '#6b6460', marginBottom: 12 }}>Could not parse career data from server.</p>
              <pre style={{ fontSize: 11, textAlign: 'left', background: '#faf8f5', padding: 16, borderRadius: 8, overflow: 'auto', maxHeight: 200, color: '#9b9490' }}>{JSON.stringify(results, null, 2)}</pre>
            </div>
          )
        }

        <div style={{ marginTop: 48, textAlign: 'center' }}>
          <button onClick={onReset}
            style={{ fontSize: 13, color: '#9b9490', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#1a1814'}
            onMouseLeave={e => e.target.style.color = '#9b9490'}>
            ← Start over with different inputs
          </button>
        </div>
      </div>
    </motion.section>
  )
}