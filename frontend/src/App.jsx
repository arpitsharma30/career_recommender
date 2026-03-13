import { useState } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import StepName from "./components/StepName"
import StepInterest from "./components/StepInterest"
import StepSkills from "./components/StepSkills"
import ResultPage from "./components/ResultPage"
import ProgressBar from "./components/ProgressBar"
import Footer from "./components/Footer"

export default function App() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({ name: "", interest: "", skills: [] })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch("/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      setResult(data)
      setStep(4)
    } catch (err) {
      alert("Make sure Flask is running on port 5000!")
    }
    setLoading(false)
  }

  const handleRetry = () => {
    setStep(0)
    setResult(null)
    setFormData({ name: "", interest: "", skills: [] })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      {step === 0 && <Hero onStart={() => setStep(1)} />}
      {step > 0 && step < 4 && <ProgressBar step={step} />}
      {step === 1 && <StepName formData={formData} setFormData={setFormData} onNext={() => setStep(2)} />}
      {step === 2 && <StepInterest formData={formData} setFormData={setFormData} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
      {step === 3 && <StepSkills formData={formData} setFormData={setFormData} onSubmit={handleSubmit} onBack={() => setStep(2)} loading={loading} />}
      {step === 4 && <ResultPage result={result} onRetry={handleRetry} />}
      <Footer />
    </div>
  )
}