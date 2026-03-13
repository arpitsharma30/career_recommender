import { motion } from "framer-motion"

const interests = [
  { value: "Tech",     emoji: "💻", label: "Technology",    sub: "AI · Cloud · Dev" },
  { value: "Business", emoji: "📊", label: "Business",      sub: "Finance · Marketing" },
  { value: "Arts",     emoji: "🎨", label: "Arts & Design", sub: "UX · Creative · Media" },
  { value: "Science",  emoji: "🔬", label: "Science",       sub: "Research · Bio · Data" },
]

export default function StepInterest({ formData, setFormData, onNext, onBack }) {
  return (
    <motion.div className="max-w-md mx-auto px-6 py-10"
      initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl mb-5">🎯</div>
        <h2 className="text-2xl font-black text-gray-900 mb-1">What excites you?</h2>
        <p className="text-gray-400 text-sm mb-6">Pick the field that pulls you in</p>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {interests.map((item) => (
            <button key={item.value}
              onClick={() => setFormData({ ...formData, interest: item.value })}
              className={`p-4 rounded-xl border-2 text-left transition-all duration-200
                ${formData.interest === item.value
                  ? "border-blue-500 bg-blue-50 shadow-md shadow-blue-100"
                  : "border-gray-200 hover:border-blue-300 bg-gray-50"}`}>
              <div className="text-2xl mb-2">{item.emoji}</div>
              <div className="font-bold text-gray-900 text-sm">{item.label}</div>
              <div className="text-gray-400 text-xs mt-0.5">{item.sub}</div>
              {formData.interest === item.value && (
                <div className="mt-2 text-xs font-bold text-blue-600">✓ Selected</div>
              )}
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={onBack} className="flex-1 border-2 border-gray-200 text-gray-600 font-bold py-3 rounded-xl hover:border-gray-300 transition-colors">
            ← Back
          </button>
          <button onClick={() => formData.interest && onNext()}
            className={`flex-1 font-bold py-3 rounded-xl transition-colors ${formData.interest ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-100" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>
            Continue →
          </button>
        </div>
      </div>
    </motion.div>
  )
}