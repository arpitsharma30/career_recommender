import { motion } from "framer-motion"

export default function Hero({ onStart }) {
  return (
    <section className="min-h-[90vh] flex items-center justify-center px-6 py-20 relative overflow-hidden">
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-60 animate-pulse" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-indigo-100 rounded-full blur-3xl opacity-50 animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,_#e2e8f0_1px,_transparent_1px)] bg-[size:32px_32px] opacity-40" />

      <motion.div className="text-center max-w-3xl relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}>

        <motion.div
          className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-600 text-xs font-bold rounded-full px-4 py-2 mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}>
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping inline-block" />
          Career Discovery for Indian Students
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-6 tracking-tight">
          CareerPath India<br />
          <span className="text-blue-600 italic font-serif">Find Your Future</span>
        </h1>

        <p className="text-gray-500 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Tell us your skills and interests. We match you with the best career — with real ₹ salaries, learning roadmap, and India job market insights.
        </p>

        <div className="flex items-center justify-center gap-8 mb-12 flex-wrap">
          {[["28+", "Careers"], ["4", "Industries"], ["₹", "Real Salaries"], ["Free", "Always"]].map(([num, label]) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-black text-blue-600">{num}</div>
              <div className="text-gray-400 text-xs uppercase tracking-wider font-semibold">{label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {["💻 Software Dev", "📊 Data Scientist", "🎨 UX Designer", "🚀 Entrepreneur", "🔬 Researcher"].map(c => (
            <span key={c} className="text-sm bg-white border border-gray-200 text-gray-600 rounded-full px-4 py-2 shadow-sm hover:border-blue-300 hover:text-blue-600 transition-colors cursor-default">
              {c}
            </span>
          ))}
        </div>

        <motion.button
          onClick={onStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-12 py-4 rounded-2xl shadow-xl shadow-blue-200 transition-colors">
          Find My Career →
        </motion.button>

      </motion.div>
    </section>
  )
}