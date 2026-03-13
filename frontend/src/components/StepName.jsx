import { motion } from "framer-motion"

export default function StepName({ formData, setFormData, onNext }) {
  return (
    <motion.div className="max-w-md mx-auto px-6 py-10"
      initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl mb-5">👤</div>
        <h2 className="text-2xl font-black text-gray-900 mb-1">What's your name?</h2>
        <p className="text-gray-400 text-sm mb-6">Enter your name to get started</p>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          onKeyDown={(e) => e.key === "Enter" && formData.name.trim() && onNext()}
          placeholder="Enter your full name..."
          className="w-full border-2 border-gray-200 focus:border-blue-500 rounded-xl px-4 py-3 text-gray-900 font-medium outline-none transition-colors mb-5 bg-gray-50 focus:bg-white"
        />
        <button
          onClick={() => formData.name.trim() && onNext()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-100">
          Continue →
        </button>
      </div>
    </motion.div>
  )
}