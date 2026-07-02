'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getNextQuestion, type Question } from '@/lib/questionQueue'

export default function DinamicasPage() {
  const [allQuestions, setAllQuestions] = useState<Question[]>([])
  const [current, setCurrent] = useState<Question | null>(null)
  const [spinning, setSpinning] = useState(false)
  const [reelItems, setReelItems] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/questions')
      .then(res => res.json())
      .then((data: Question[]) => {
        setAllQuestions(data)
        setLoading(false)
      })
  }, [])

  const spin = () => {
    if (spinning || allQuestions.length === 0) return

    const next = getNextQuestion(allQuestions)
    if (!next) return

    // Genera preguntas random para el efecto visual del rodillo girando
    const filler = Array.from({ length: 16 }, () => {
      const r = allQuestions[Math.floor(Math.random() * allQuestions.length)]
      return r
    })

    setReelItems([...filler, next])
    setSpinning(true)
    setCurrent(null)

    // Duración total = tiempo que dura la animación de framer-motion (definida abajo)
    setTimeout(() => {
      setCurrent(next)
      setSpinning(false)
    }, 2200)
  }

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #001a14 0%, #002a22 40%, #004a3f 70%, #003830 100%)' }}
    >
      <div className="relative z-10 flex flex-col items-center">
        <img
          src="/images/belaisa-name.png"
          alt="Bela's Birthday"
          className="w-48 sm:w-64 mb-6"
        />

        <h1 className="text-white text-2xl font-light mb-10">Preguntas aleatorias con Bela</h1>

        <div className="relative w-full max-w-md h-28 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
          {spinning ? (
            <motion.div
              animate={{ y: [0, -(reelItems.length - 1) * 112] }}
              transition={{ duration: 2, ease: [0.15, 0.85, 0.25, 1] }}
            >
              {reelItems.map((q, i) => (
                <div key={i} className="h-28 flex items-center justify-center px-6 text-center">
                  <p className="text-white text-lg">{q.text}</p>
                </div>
              ))}
            </motion.div>
          ) : (
            <div className="h-28 flex items-center justify-center px-6 text-center">
              <AnimatePresence mode="wait">
                {current && (
                  <motion.p
                    key={current.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-white text-lg"
                  >
                    {current.text}
                  </motion.p>
                )}
              </AnimatePresence>
              {!current && !loading && (
                <p className="text-green-300/50 text-sm">Presiona girar</p>
              )}
            </div>
          )}
        </div>

        <button
          onClick={spin}
          disabled={spinning || loading}
          className="mt-8 px-8 py-3 rounded-full bg-green-400 text-black font-medium disabled:opacity-40"
        >
          {loading ? 'Cargando...' : spinning ? 'Girando...' : 'Girar 🎲'}
        </button>
      </div>
    </main>
  )
}