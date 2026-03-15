import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CareerForm from './components/CareerForm'
import Results from './pages/Results'
import LoadingSpinner from './components/LoadingSpinner'
import Footer from './components/Footer'

export default function App() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleResults = (data) => {
    setLoading(false)
    setResults(data)
  }

  const handleReset = () => {
    setResults(null)
    setLoading(false)
  }

  const scrollToForm = () => {
    document.getElementById('career-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <AnimatePresence mode="wait">
        {loading && <LoadingSpinner key="loading" />}
      </AnimatePresence>
      {!results ? (
        <>
          <Hero onGetStarted={scrollToForm} />
          <CareerForm onResults={handleResults} onLoading={setLoading} />
          <Footer />
        </>
      ) : (
        <>
          <Results results={results} onReset={handleReset} />
          <Footer />
        </>
      )}
    </div>
  )
}