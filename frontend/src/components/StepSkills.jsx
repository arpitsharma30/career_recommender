import { motion } from "framer-motion"

const allSkills = [
  { value: "Python", emoji: "🐍" }, { value: "Math", emoji: "📐" },
  { value: "Communication", emoji: "💬" }, { value: "Drawing", emoji: "🎨" },
  { value: "Leadership", emoji: "🚀" }, { value: "Analysis", emoji: "🔍" },
  { value: "Creativity", emoji: "💡" }, { value: "Writing", emoji: "✍️" },
  { value: "Biology", emoji: "🧬" }, { value: "Design", emoji: "🖌️" },
]

export default function StepSkills({ formData, setFormData, onSubmit, onBack, loading }) {
  const toggle = (skill) => {
    const updated = formData.skills.includes(skill)
      ? formData.skills.filter(s => s !== skill)
      : [...formData.skills, skill]
    setFormData({ ...formData, skills: updated })
  }

  return (
    <motion.div className="max-w-md mx-auto px-6 py-10"
      initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl mb-5">⚡</div>
        <h2 className="text-2xl font-black text-gray-900 mb-1">Your strengths?</h2>
        <p className="text-gray-400 text-sm mb-6">Select all skills you have</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {allSkills.map((skill) => (
            <button key={skill.value} onClick={() => toggle(skill.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 text-sm font-semibold transition-all duration-200
                ${formData.skills.includes(skill.value)
                  ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200"
                  : "border-gray-200 text-gray-600 hover:border-blue-300 bg-gray-50"}`}>
              {skill.emoji} {skill.value}
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={onBack} className="flex-1 border-2 border-gray-200 text-gray-600 font-bold py-3 rounded-xl hover:border-gray-300 transition-colors">
            ← Back
          </button>
          <button onClick={onSubmit} disabled={loading}
            className="flex-1 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-blue-100 disabled:opacity-70">
            {loading ? "Finding..." : "Reveal My Career ✦"}
          </button>
        </div>
      </div>
    </motion.div>
  )
}