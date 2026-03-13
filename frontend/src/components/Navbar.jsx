export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
              <path d="M7 14L11 18L21 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className="font-black text-gray-900 text-sm leading-none">CareerPath</div>
            <div className="text-blue-600 text-xs font-bold uppercase tracking-widest">India</div>
          </div>
        </div>
        <span className="text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200 rounded-full px-4 py-1.5">
          ✦ Free Tool
        </span>
      </div>
    </nav>
  )
}