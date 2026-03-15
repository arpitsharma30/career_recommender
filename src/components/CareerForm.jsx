import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getCareerRecommendations } from '../api/careerApi'

const slide = {
  enter: d => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: d => ({ x: d > 0 ? -40 : 40, opacity: 0, transition: { duration: 0.25 } }),
}

export default function CareerForm({ onResults, onLoading }) {
  const [step, setStep] = useState(1)
  const [dir, setDir] = useState(1)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ educationLevel: '', interests: '', favoriteSubjects: '', skills: '', workStyle: '' })

  const set = e => { setForm(p => ({ ...p, [e.target.name]: e.target.value })); setError('') }

  const next = () => {
    if (step === 1 && !form.educationLevel) { setError('Please select your education level.'); return }
    if (step === 2 && !form.interests.trim()) { setError('Please add at least one interest.'); return }
    setDir(1); setStep(s => s + 1); setError('')
  }
  const back = () => { setDir(-1); setStep(s => s - 1); setError('') }

  const submit = async () => {
    if (!form.skills.trim()) { setError('Please mention at least one skill.'); return }
    try { onLoading(true); const r = await getCareerRecommendations(form); onResults(r) }
    catch (e) { setError(e.message); onLoading(false) }
  }

  const stepTitles = ['Your Education', 'Interests & Passions', 'Skills & Work Style']

  return (
    <section id="career-form" style={{ padding: '0 24px 100px', background: '#f8f5f0' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-chip">
            <span style={{ width: 16, height: 1.5, background: '#f97316', display: 'inline-block' }} />
            Step {step} of 3
          </span>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 40, fontWeight: 600, color: '#1a1814', margin: '0 0 8px', lineHeight: 1.1 }}>Tell Us About Yourself</h2>
          <p style={{ fontSize: 14, color: '#8b8480', margin: 0 }}>Takes less than 2 minutes — honest answers give the best results</p>
        </div>

        {/* Progress */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 40, alignItems: 'center' }}>
          {[1,2,3].map(n => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 6, flex: n === step ? 2 : 1 }}>
              <div style={{ height: 3, flex: 1, borderRadius: 3, background: n < step ? '#f97316' : n === step ? '#f97316' : '#e8e3da', opacity: n < step ? 0.5 : 1, transition: 'all 0.4s ease' }} />
              {n < 3 && <div style={{ width: 6, height: 6, borderRadius: '50%', background: n < step ? '#f97316' : '#e8e3da', flexShrink: 0, transition: 'background 0.3s' }} />}
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="card-light" style={{ boxShadow: '0 4px 32px rgba(26,24,20,0.06)' }}>
          {/* Step label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28, paddingBottom: 20, borderBottom: '1px solid #f0ebe3' }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>{step}</div>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#1a1814', letterSpacing: '0.01em' }}>{stepTitles[step - 1]}</span>
          </div>

          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={step} custom={dir} variants={slide} initial="enter" animate="center" exit="exit">
              {step === 1 && <S1 form={form} set={set} />}
              {step === 2 && <S2 form={form} set={set} />}
              {step === 3 && <S3 form={form} set={set} />}
            </motion.div>
          </AnimatePresence>

          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: 16, padding: '10px 14px', borderRadius: 10, background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.2)', fontSize: 13, color: '#c2410c', display: 'flex', alignItems: 'center', gap: 8 }}>
              ⚠ {error}
            </motion.div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32, paddingTop: 24, borderTop: '1px solid #f0ebe3' }}>
            <button onClick={back} disabled={step === 1}
              style={{ fontSize: 13, color: step === 1 ? '#c8c3bc' : '#6b6460', background: 'none', border: 'none', cursor: step === 1 ? 'not-allowed' : 'pointer', padding: 0, fontFamily: 'Inter, sans-serif', transition: 'color 0.2s' }}>
              ← Back
            </button>
            {step < 3
              ? <button onClick={next} className="btn-primary">Continue →</button>
              : <button onClick={submit} className="btn-orange">✦ Get my career paths</button>
            }
          </div>
        </div>
      </div>
    </section>
  )
}

const labelStyle = { fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9b9490', marginBottom: 8, display: 'block' }

function S1({ form, set }) {
  const levels = ['Class 10 (appearing/passed)', 'Class 12 – Science (PCM)', 'Class 12 – Science (PCB)', 'Class 12 – Commerce', 'Class 12 – Arts/Humanities', 'Undergraduate (current)', 'Graduate / Postgraduate']
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <label style={labelStyle}>Education Level</label>
        <select name="educationLevel" value={form.educationLevel} onChange={set} className="input-light" style={{ cursor: 'pointer', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b6460' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}>
          <option value="">Select your level…</option>
          {levels.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>
      <div>
        <label style={labelStyle}>Favourite Subjects <span style={{ textTransform: 'none', letterSpacing: 0, fontWeight: 400, color: '#b8b0a4', fontSize: 12 }}>(optional)</span></label>
        <input type="text" name="favoriteSubjects" value={form.favoriteSubjects} onChange={set} placeholder="e.g. Maths, Biology, History, Economics…" className="input-light" />
        <p style={{ fontSize: 12, color: '#b8b0a4', margin: '6px 0 0' }}>Helps us understand your academic strengths</p>
      </div>
    </div>
  )
}

function S2({ form, set }) {
  const tags = ['Technology', 'Medicine', 'Art & Design', 'Business', 'Teaching', 'Law', 'Sports', 'Music', 'Environment', 'Social Work', 'Finance', 'Media']
  const toggle = tag => {
    const cur = form.interests
    const has = cur.toLowerCase().includes(tag.toLowerCase())
    const val = has ? cur.replace(new RegExp(`,?\\s*${tag}`, 'gi'), '').trim().replace(/^,/, '') : cur ? `${cur}, ${tag}` : tag
    set({ target: { name: 'interests', value: val } })
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <label style={labelStyle}>Quick Select</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {tags.map(tag => {
            const active = form.interests.toLowerCase().includes(tag.toLowerCase())
            return (
              <button key={tag} type="button" onClick={() => toggle(tag)}
                style={{ fontSize: 12, fontWeight: 500, padding: '7px 14px', borderRadius: 100, border: active ? '1.5px solid #f97316' : '1.5px solid #e8e3da', background: active ? '#fff7f0' : '#fff', color: active ? '#f97316' : '#6b6460', cursor: 'pointer', transition: 'all 0.15s' }}>
                {tag}
              </button>
            )
          })}
        </div>
      </div>
      <div>
        <label style={labelStyle}>Describe in Your Own Words</label>
        <textarea name="interests" value={form.interests} onChange={set} rows={3}
          placeholder="e.g. I love solving puzzles, helping people, building things from scratch…"
          className="input-light" style={{ resize: 'none' }} />
      </div>
    </div>
  )
}

function S3({ form, set }) {
  const styles = ['Remote / Work from home', 'Office environment', 'Outdoor / Field work', 'Travel frequently', 'Creative studio', 'Research lab']
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <label style={labelStyle}>Your Skills</label>
        <textarea name="skills" value={form.skills} onChange={set} rows={3}
          placeholder="e.g. coding, drawing, leadership, writing, problem-solving, public speaking…"
          className="input-light" style={{ resize: 'none' }} />
        <p style={{ fontSize: 12, color: '#b8b0a4', margin: '6px 0 0' }}>List anything you're naturally good at — no skill is too small</p>
      </div>
      <div>
        <label style={labelStyle}>Preferred Work Environment</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {styles.map(s => (
            <label key={s} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 12, border: form.workStyle === s ? '1.5px solid #f97316' : '1.5px solid #e8e3da', background: form.workStyle === s ? '#fff7f0' : '#faf8f5', cursor: 'pointer', fontSize: 13, color: form.workStyle === s ? '#c2410c' : '#6b6460', transition: 'all 0.15s', fontWeight: form.workStyle === s ? 500 : 400 }}>
              <input type="radio" name="workStyle" value={s} checked={form.workStyle === s} onChange={set} style={{ accentColor: '#f97316' }} />
              {s}
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}