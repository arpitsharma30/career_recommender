import { motion } from "framer-motion"

export default function ResultPage({ result, onRetry }) {
  if (!result) return null
  return (
    <motion.div className="max-w-3xl mx-auto px-6 py-12"
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

      <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-5 py-3 text-sm font-semibold mb-6 text-center">
        🎉 Career Match Found for <strong>{result.name}</strong>!
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg mb-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500" />
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-4">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block" />
              Top Match · {result.field}
            </div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">{result.icon}</span>
              <h1 className="text-3xl font-black text-gray-900 leading-tight">{result.career}</h1>
            </div>
            <p className="text-gray-500 leading-relaxed">{result.description}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-800 to-blue-950 rounded-2xl p-6 text-center min-w-[190px] shadow-xl shadow-blue-200">
            <div className="text-blue-300 text-xs uppercase tracking-wider mb-2">Salary in India</div>
            <div className="text-yellow-400 font-black text-base leading-tight mb-1">{result.salary}</div>
            <div className="text-blue-400 text-xs mb-3">Per Year</div>
            {result.salary_source && (
              <div className="text-blue-300 text-xs border-t border-blue-700 pt-3 text-left leading-relaxed">
                📊 {result.salary_source}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="font-black text-gray-900 mb-1">📚 What to Learn Next</h3>
          <p className="text-gray-400 text-xs mb-4">Build these to grow faster</p>
          <ol className="space-y-3">
            {result.learn.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                <span className="w-5 h-5 bg-blue-50 border border-blue-200 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="font-black text-gray-900 mb-1">🚀 Future Scope in India</h3>
          <p className="text-gray-400 text-xs mb-4">Job market outlook</p>
          <p className="text-gray-600 text-sm leading-relaxed mb-5">{result.scope}</p>
          <div>
            <div className="flex justify-between text-xs font-semibold mb-2">
              <span className="text-gray-400 uppercase tracking-wider">Demand Level</span>
              <span className="text-green-600 font-bold">Very High</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "85%" }}
                transition={{ duration: 1.2, delay: 0.4 }} />
            </div>
          </div>
        </div>

      </div>

      <div className="flex gap-3">
        <button onClick={onRetry} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-100">
          ← Try Again
        </button>
        <button onClick={onRetry} className="flex-1 border-2 border-gray-200 text-gray-600 font-bold py-3 rounded-xl hover:border-blue-300 hover:text-blue-600 transition-colors">
          Explore More
        </button>
      </div>

    </motion.div>
  )
}