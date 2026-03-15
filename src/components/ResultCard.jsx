import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CAREER_EXTRA = {
  "Data Scientist": {
    what_you_do: "You collect, clean and analyse large datasets to find patterns and insights. You build predictive models, create visualisations, and present findings to help organisations make smarter decisions.",
    day_in_life: ["Write Python/R scripts to clean and explore data", "Build ML models to predict outcomes", "Create dashboards and reports for stakeholders", "Collaborate with engineers to deploy models to production"],
    skills_required: ["Python", "SQL", "Machine Learning", "Statistics", "Data Visualisation", "Pandas", "Scikit-learn"],
    certifications: [
      { name: "Google Data Analytics Certificate", link: "https://grow.google/certificates/data-analytics/", platform: "Coursera" },
      { name: "IBM Data Science Professional", link: "https://www.coursera.org/professional-certificates/ibm-data-science", platform: "Coursera" },
      { name: "Microsoft Azure Data Scientist", link: "https://learn.microsoft.com/en-us/certifications/azure-data-scientist/", platform: "Microsoft" },
    ],
    future_paths: ["Junior Data Scientist", "Senior Data Scientist", "ML Engineer", "AI Research Scientist", "Chief Data Officer"],
    top_companies: ["Google", "Amazon", "Flipkart", "Paytm", "Zomato", "TCS", "Infosys"],
    work_type: "Mostly office or remote — laptop-based analytical work",
  },
  "AI/ML Engineer": {
    what_you_do: "You design and build machine learning systems and AI models that power products like recommendation engines, voice assistants, and fraud detection systems.",
    day_in_life: ["Design neural network architectures", "Train and fine-tune ML models on large datasets", "Deploy models to production servers", "Optimise model performance and latency"],
    skills_required: ["Python", "TensorFlow / PyTorch", "Deep Learning", "MLOps", "Docker", "Cloud Platforms", "Linear Algebra"],
    certifications: [
      { name: "DeepLearning.AI TensorFlow Developer", link: "https://www.coursera.org/professional-certificates/tensorflow-in-practice", platform: "Coursera" },
      { name: "AWS Certified Machine Learning", link: "https://aws.amazon.com/certification/certified-machine-learning-specialty/", platform: "AWS" },
      { name: "Fast.ai Practical Deep Learning", link: "https://course.fast.ai/", platform: "Fast.ai (Free)" },
    ],
    future_paths: ["Junior ML Engineer", "Senior ML Engineer", "AI Research Scientist", "Principal Engineer", "CTO"],
    top_companies: ["Google DeepMind", "OpenAI", "Microsoft", "NVIDIA", "Ola", "Swiggy"],
    work_type: "Remote-friendly — very high demand globally and in India",
  },
  "Software Developer": {
    what_you_do: "You design, write and maintain code that powers websites, apps and software systems. From building user interfaces to writing backend APIs, you turn ideas into working digital products.",
    day_in_life: ["Write and review code in team sprints", "Debug issues and fix bugs", "Build new features based on product requirements", "Attend daily standups and planning meetings"],
    skills_required: ["JavaScript / Python / Java", "React / Node.js", "Git & GitHub", "SQL", "REST APIs", "Problem Solving", "System Design"],
    certifications: [
      { name: "Meta Front-End Developer Certificate", link: "https://www.coursera.org/professional-certificates/meta-front-end-developer", platform: "Coursera" },
      { name: "The Odin Project (Full Stack)", link: "https://www.theodinproject.com/", platform: "Free Online" },
      { name: "freeCodeCamp Full Stack", link: "https://www.freecodecamp.org/", platform: "Free Online" },
    ],
    future_paths: ["Junior Developer", "Senior Developer", "Tech Lead", "Software Architect", "CTO / Founder"],
    top_companies: ["Infosys", "Wipro", "Google", "Microsoft", "Razorpay", "Startups"],
    work_type: "Highly remote-friendly — work from anywhere in the world",
  },
  "UX/UI Designer": {
    what_you_do: "You design the look, feel and flow of digital products. You research how users think, create wireframes and prototypes, and work with developers to bring intuitive interfaces to life.",
    day_in_life: ["Conduct user research and interviews", "Create wireframes and high-fidelity mockups in Figma", "Present designs to stakeholders for feedback", "Collaborate with developers on implementation"],
    skills_required: ["Figma", "Adobe XD", "User Research", "Wireframing", "Prototyping", "Visual Design", "Interaction Design"],
    certifications: [
      { name: "Google UX Design Certificate", link: "https://grow.google/certificates/ux-design/", platform: "Coursera" },
      { name: "Interaction Design Foundation", link: "https://www.interaction-design.org/", platform: "IDF" },
      { name: "Figma for UX Design", link: "https://www.udemy.com/course/figma-ux-ui-design/", platform: "Udemy" },
    ],
    future_paths: ["Junior UX Designer", "Senior UX Designer", "Product Designer", "Design Lead", "Creative Director"],
    top_companies: ["Zomato", "CRED", "Swiggy", "Razorpay", "Adobe", "Google"],
    work_type: "Highly remote-friendly — creative studio or home setup",
  },
  "Financial Analyst": {
    what_you_do: "You analyse financial data, prepare reports and advise companies on investments, budgets and strategy. You turn numbers into actionable business insights.",
    day_in_life: ["Build financial models in Excel", "Analyse company performance and market trends", "Prepare reports and presentations for management", "Research industries and competitor strategies"],
    skills_required: ["Excel / Google Sheets", "Financial Modelling", "Accounting", "Data Analysis", "Valuation", "Communication", "Bloomberg Terminal"],
    certifications: [
      { name: "CFA (Chartered Financial Analyst)", link: "https://www.cfainstitute.org/", platform: "CFA Institute" },
      { name: "CA (Chartered Accountant)", link: "https://www.icai.org/", platform: "ICAI India" },
      { name: "CFI Financial Modelling (FMVA)", link: "https://corporatefinanceinstitute.com/certifications/financial-modeling-valuation-analyst-fmva-program/", platform: "CFI" },
    ],
    future_paths: ["Junior Analyst", "Senior Analyst", "Investment Banker", "Portfolio Manager", "CFO"],
    top_companies: ["Goldman Sachs", "JP Morgan", "HDFC Bank", "Zerodha", "Deloitte", "PwC"],
    work_type: "Office-based — fast-paced financial environments",
  },
  "default": {
    what_you_do: "This career involves applying your unique combination of skills and interests to solve real problems and create genuine value for organisations and society.",
    day_in_life: ["Apply your core skills daily on meaningful projects", "Collaborate with teams across disciplines", "Continuously learn and grow in your specialisation", "Contribute to outcomes that matter"],
    skills_required: ["Domain Knowledge", "Communication", "Problem Solving", "Teamwork", "Continuous Learning"],
    certifications: [
      { name: "LinkedIn Learning Courses", link: "https://www.linkedin.com/learning/", platform: "LinkedIn" },
      { name: "Coursera Career Certificates", link: "https://www.coursera.org/", platform: "Coursera" },
      { name: "NPTEL Indian Courses", link: "https://nptel.ac.in/", platform: "NPTEL (Free)" },
    ],
    future_paths: ["Entry Level", "Mid Level", "Senior Professional", "Manager", "Director"],
    top_companies: ["Top MNCs", "Indian Startups", "Government Sector", "Freelance"],
    work_type: "Varies by specialisation and industry",
  }
}

const Divider = () => <div style={{ height: 1, background: '#f0ebe3', margin: '24px 0' }} />

const SectionBlock = ({ icon, title, bg, children }) => (
  <div style={{ background: bg || '#faf8f5', borderRadius: 14, padding: '20px 20px', border: '1px solid #ede8df' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
      <span style={{ fontSize: 16 }}>{icon}</span>
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9b9490', margin: 0 }}>{title}</p>
    </div>
    {children}
  </div>
)

export default function ResultCard({ career, index }) {
  const [open, setOpen] = useState(false)
  const title = career.title || career.career_title || 'Career Path'
  const extra = CAREER_EXTRA[title] || CAREER_EXTRA["default"]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ borderRadius: 20, border: '1.5px solid #ede8df', background: '#ffffff', marginBottom: 20, overflow: 'hidden', boxShadow: '0 2px 20px rgba(26,24,20,0.05)', transition: 'box-shadow 0.25s' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 40px rgba(26,24,20,0.1)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 20px rgba(26,24,20,0.05)'}
    >
      {/* Header */}
      <div onClick={() => setOpen(!open)} style={{ padding: '24px 28px', cursor: 'pointer' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 24 }}>{career.icon || '💼'}</span>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#f97316', background: '#fff7f0', padding: '3px 10px', borderRadius: 100, border: '1px solid rgba(249,115,22,0.2)' }}>{career.field || 'Career'}</span>
              {career.match_score && <span style={{ fontSize: 11, color: '#6b6460', padding: '3px 10px', borderRadius: 100, border: '1px solid #e8e3da', background: '#faf8f5' }}>{career.match_score}% match</span>}
            </div>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 30, fontWeight: 700, color: '#1a1814', margin: '0 0 8px', lineHeight: 1.1 }}>{title}</h3>
            <p style={{ fontSize: 14, color: '#6b6460', margin: 0, lineHeight: 1.7 }}>{career.description}</p>
          </div>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}
            style={{ width: 32, height: 32, borderRadius: '50%', background: '#faf8f5', border: '1px solid #e8e3da', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#9b9490', flexShrink: 0 }}>
            ↓
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid #f0ebe3', background: '#fdfcfa' }}>
        {[
          { label: 'Avg. Salary', value: career.avg_salary, highlight: false },
          { label: 'Growth Outlook', value: career.growth_outlook, highlight: true },
          { label: 'Education', value: career.education_path?.split('+')[0]?.trim() || 'See below', highlight: false },
        ].map(({ label, value, highlight }, i) => (
          <div key={label} style={{ padding: '14px 20px', borderRight: i < 2 ? '1px solid #f0ebe3' : 'none' }}>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#b8b0a4', margin: '0 0 4px' }}>{label}</p>
            <p style={{ fontSize: 14, fontWeight: 600, color: highlight && value?.includes('High') ? '#f97316' : '#1a1814', margin: 0 }}>{value || '—'}</p>
          </div>
        ))}
      </div>

      {/* Expanded */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: 'hidden' }}>
            <div style={{ padding: '28px', borderTop: '1px solid #f0ebe3', display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* What you do */}
              <SectionBlock icon="🎯" title="What You'll Actually Do" bg="#fdfcfa">
                <p style={{ fontSize: 14, color: '#4a4640', lineHeight: 1.8, margin: 0 }}>{extra.what_you_do}</p>
              </SectionBlock>

              {/* Day in life */}
              <SectionBlock icon="🗓" title="A Typical Day" bg="#fdfcfa">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {extra.day_in_life.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 14px', background: '#fff', borderRadius: 10, border: '1px solid #ede8df' }}>
                      <span style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff7f0', border: '1px solid rgba(249,115,22,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#f97316', flexShrink: 0 }}>{i + 1}</span>
                      <p style={{ fontSize: 13, color: '#4a4640', margin: 0, lineHeight: 1.6 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </SectionBlock>

              {/* Skills */}
              <SectionBlock icon="⚡" title="Skills You'll Need" bg="#fdfcfa">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {extra.skills_required.map(skill => (
                    <span key={skill} style={{ fontSize: 12, fontWeight: 500, padding: '6px 14px', borderRadius: 100, background: '#fff7f0', border: '1.5px solid rgba(249,115,22,0.2)', color: '#c2410c' }}>{skill}</span>
                  ))}
                </div>
              </SectionBlock>

              {/* Certifications */}
              <SectionBlock icon="🏆" title="Recommended Certifications & Courses" bg="#fdfcfa">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {extra.certifications.map((cert, i) => (
                    <a key={i} href={cert.link} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderRadius: 12, border: '1.5px solid #ede8df', background: '#fff', textDecoration: 'none', transition: 'all 0.2s', gap: 12 }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#f97316'; e.currentTarget.style.background = '#fff7f0' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#ede8df'; e.currentTarget.style.background = '#fff' }}>
                      <div>
                        <p style={{ fontSize: 14, color: '#1a1814', margin: '0 0 2px', fontWeight: 600 }}>{cert.name}</p>
                        <p style={{ fontSize: 12, color: '#9b9490', margin: 0 }}>{cert.platform}</p>
                      </div>
                      <span style={{ fontSize: 18, color: '#f97316', flexShrink: 0, fontWeight: 600 }}>↗</span>
                    </a>
                  ))}
                </div>
              </SectionBlock>

              {/* Career path */}
              <SectionBlock icon="🚀" title="Career Progression Path" bg="#fdfcfa">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
                  {extra.future_paths.map((path, i) => (
                    <span key={path} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: i === extra.future_paths.length - 1 ? 700 : 400, color: i === extra.future_paths.length - 1 ? '#f97316' : i === 0 ? '#1a1814' : '#6b6460', background: i === extra.future_paths.length - 1 ? '#fff7f0' : 'transparent', padding: i === extra.future_paths.length - 1 ? '3px 10px' : '3px 0', borderRadius: 100, border: i === extra.future_paths.length - 1 ? '1px solid rgba(249,115,22,0.25)' : 'none' }}>{path}</span>
                      {i < extra.future_paths.length - 1 && <span style={{ color: '#d4cfc8', fontSize: 12 }}>→</span>}
                    </span>
                  ))}
                </div>
              </SectionBlock>

              {/* Companies + Work type side by side */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <SectionBlock icon="🏢" title="Top Companies in India" bg="#fdfcfa">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {extra.top_companies.map(co => (
                      <span key={co} style={{ fontSize: 12, padding: '4px 10px', borderRadius: 100, border: '1px solid #e8e3da', color: '#6b6460', background: '#fff' }}>{co}</span>
                    ))}
                  </div>
                </SectionBlock>

                <SectionBlock icon="💼" title="Work Environment" bg="#fdfcfa">
                  <p style={{ fontSize: 13, color: '#4a4640', margin: 0, lineHeight: 1.7 }}>{extra.work_type}</p>
                  <Divider />
                  <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#b8b0a4', margin: '0 0 4px' }}>Education Path</p>
                  <p style={{ fontSize: 13, color: '#4a4640', margin: 0, lineHeight: 1.6 }}>🎓 {career.education_path}</p>
                </SectionBlock>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}