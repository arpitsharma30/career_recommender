export default function ProgressBar({ step }) {
  const steps = ["Your Name", "Interest", "Skills"]
  return (
    <div className="max-w-md mx-auto px-6 pt-10 pb-2">
      <div className="flex items-start justify-between mb-3">
        {steps.map((label, i) => (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
              ${i + 1 < step ? "bg-green-500 text-white shadow-lg shadow-green-200" :
                i + 1 === step ? "bg-blue-600 text-white shadow-lg shadow-blue-200" :
                "bg-gray-100 text-gray-400"}`}>
              {i + 1 < step ? "✓" : i + 1}
            </div>
            <span className={`text-xs font-semibold text-center ${i + 1 === step ? "text-blue-600" : "text-gray-400"}`}>
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full">
        <div className="h-full bg-blue-600 rounded-full transition-all duration-500"
          style={{ width: `${((step - 1) / 2) * 100}%` }} />
      </div>
    </div>
  )
}