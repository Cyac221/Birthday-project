'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Canvas de partículas ──────────────────────────────────────────
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1,
    }))

    let raf: number
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180, 255, 200, ${p.opacity})`
        ctx.fill()
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />
}

// ── Blobs orgánicos ───────────────────────────────────────────────
const photos = [
  '/images/belaisa-photo-back1.png',
  '/images/belaisa-photo-back2.png',
  '/images/belaisa-photo-back3.png',
  '/images/belaisa-photo-back4.png',
  '/images/belaisa-photo-back5.png',
  '/images/belaisa-photo-back6.png',
  '/images/belaisa-photo-back7.png',
  '/images/belaisa-photo-back8.png',
  '/images/belaisa-photo-back9.png',
  '/images/belaisa-photo-back10.png',
  '/images/belaisa-photo-back11.png',
  '/images/belaisa-photo-back12.png',
  '/images/belaisa-photo-back13.png',
  '/images/belaisa-photo-back14.png',
  
]

function FloatingPhotos() {
const positions = [
  { top: '2%',   left: '-3%',  size: 160, delay: 0,   duration: 8  },
  { top: '1%',   left: '83%',  size: 145, delay: 1,   duration: 7  },
  { top: '14%',  left: '-5%',  size: 155, delay: 3,   duration: 9  },
  { top: '20%',  left: '88%',  size: 165, delay: 1.5, duration: 11 },
  { top: '32%',  left: '-2%',  size: 150, delay: 4,   duration: 8  },
  { top: '40%',  left: '84%',  size: 160, delay: 0.5, duration: 9  },
  { top: '50%',  left: '-6%',  size: 155, delay: 2.5, duration: 7  },
  { top: '55%',  left: '87%',  size: 145, delay: 3.5, duration: 10 },
  { top: '65%',  left: '-3%',  size: 165, delay: 1,   duration: 8  },
  { top: '70%',  left: '85%',  size: 150, delay: 2,   duration: 9  },
  { top: '80%',  left: '-5%',  size: 155, delay: 0,   duration: 10 },
  { top: '82%',  left: '86%',  size: 160, delay: 3,   duration: 7  },
  { top: '92%',  left: '-2%',  size: 145, delay: 1.5, duration: 9  },
  { top: '90%',  left: '84%',  size: 155, delay: 2.5, duration: 8  },
]

  return (
    <>
      {positions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none z-0"
          style={{ top: pos.top, left: pos.left }}
          animate={{ y: [0, -15, 0], rotate: [-3, 3, -3] }}
          transition={{ duration: pos.duration, repeat: Infinity, ease: 'easeInOut', delay: pos.delay }}
        >
          <img
            src={photos[i % photos.length]}
            alt=""
            style={{ width: pos.size, height: pos.size, opacity: 0.22 }}
            className="object-contain rounded-xl"
          />
        </motion.div>
      ))}
    </>
  )
}


function Blobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,100,70,0.5) 0%, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,80,55,0.6) 0%, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], x: [0, 20, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute -bottom-40 left-1/4 w-[700px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,120,80,0.35) 0%, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.25, 1], x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(10,60,45,0.4) 0%, transparent 70%)' }}
      />
    </div>
  )
}

// ── Countdown ─────────────────────────────────────────────────────
  function AnimatedNumber() {
    const [count, setCount] = useState(0)

    useEffect(() => {
      let current = 0
      const interval = setInterval(() => {
        current++
        setCount(current)
        if (current >= 25) clearInterval(interval)
      }, 80)
      return () => clearInterval(interval)
    }, [])

    return (
      <div className="flex flex-col items-center gap-0">
        <span className="font-serif text-white" style={{ fontSize: '8rem', fontWeight: 300 }}>
          {count}
        </span>
        <span className="text-2xl tracking-[0.3em] uppercase text-white -mt-4">Julios</span>
      </div>
    )
  }

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-5 min-w-[90px]"
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25 }}
          className="text-5xl font-bold text-white tabular-nums"
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </AnimatePresence>
      <span className="text-xs uppercase tracking-[0.2em] text-green-300/70 mt-2">{label}</span>
    </motion.div>
  )
}

function Countdown() {
  const getTimeLeft = () => {
    const target = new Date('2026-07-05T13:00:00')
    const now = new Date()
    const diff = target.getTime() - now.getTime()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }

  const [timeLeft, setTimeLeft] = useState(getTimeLeft)

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-4 gap-2 w-full max-w-md mx-auto">
      <CountdownUnit value={timeLeft.days} label="Días" />
      <CountdownUnit value={timeLeft.hours} label="Horas" />
      <CountdownUnit value={timeLeft.minutes} label="Minutos" />
      <CountdownUnit value={timeLeft.seconds} label="Segundos" />
    </div>
  )
}

// ── URLs ──────────────────────────────────────────────────────────
const MAPS_URL = "https://www.google.com/maps/place/Parques+del+R%C3%ADo/@6.2436857,-75.578435,3a,86.9y,223.35h,87.32t/data=!3m8!1e1!3m6!1sCIHM0ogKEICAgICiwMLltQE!2e10!3e11!6shttps:%2F%2Flh3.googleusercontent.com%2Fgpms-cs-s%2FABJJf52xI7A2-PzaHKUb4Ubemucyn65ekHcCm6ILEXaq5Tqy8aYUjvrytUH8WgX94gJMhrF1Ubj0DNeYWrRVUW5kbJF0IVSSyLJEBxCekNOHI-XIWsL9tDJQKqjwz9TkjjF0M9GJBzbP%3Dw900-h600-k-no-pi2.684572730629327-ya145.35475466911586-ro0-fo100!7i11264!8i5632!4m6!3m5!1s0x8e4429ac150efd3b:0xe07ee393112a7a77!8m2!3d6.2435957!4d-75.5795253!16s%2Fg%2F11bv18m15l?entry=ttu&g_ep=EgoyMDI2MDYwMy4xIKXMDSoASAFQAw%3D%3D"
const CALENDAR_URL = "https://www.google.com/calendar/render?action=TEMPLATE&text=Belaisa%27s+Birthday&dates=20260705T130000/20260705T190000&details=Celebracion+de+los+25+anos+de+Belaisa&location=Parques+del+Rio%2C+Medellin&sf=true&output=xml"

// ── Page ──────────────────────────────────────────────────────────
export default function Home() {
  return (
<motion.main
  className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16 overflow-hidden"
  animate={{ background: [
    'linear-gradient(135deg, #001a14 0%, #002a22 40%, #004a3f 70%, #003830 100%)',
    'linear-gradient(135deg, #002a22 0%, #004a3f 40%, #003328 70%, #001a14 100%)',
    'linear-gradient(135deg, #001a14 0%, #002a22 40%, #004a3f 70%, #003830 100%)',
  ]}}
  transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
>

      <Blobs />
      <Particles />
      <FloatingPhotos />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="text-center mb-6 relative z-10"
      >

        {/* Foto con gorrito */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="flex justify-center -mb-20"
        >
          <img
            src="/images/belaisa-photo.png"
            alt="Belaisa"
            className="w-96 h-96 object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* Nombre como imagen */}
        <img
          src="/images/belaisa-name.png"
          alt="Belaisa"
          className="w-96 md:w-[600px] object-contain mx-auto mb-16"
        />

        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-3 justify-center -mt-20">
          <AnimatedNumber />
          <p className="text-sm tracking-[0.3em] uppercase text-green-300/60 self-end mb-3"></p>
        </div>
        </div>
      </motion.div>

      {/* Countdown */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-center mb-6 relative z-10"
      >
        <p className="text-white/80 text-xl font-light mb-4">
          ¿Qué tal si celebramos juntos mi primer cuarto de siglo?
        </p>
        <p className="text-white/90 text-2xl font-bold tracking-wide">Domingo 5 de Julio</p>
        <p className="text-green-400/60 text-base tracking-widest mt-1">1:00 PM</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="text-center mb-2 relative z-10"
      >
        <p className="text-green-400/50 text-xs uppercase tracking-[0.3em] mb-8">
          Faltan
        </p>
        <Countdown />
      </motion.div>

      {/* Date */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="text-center mb-6 relative z-10"
      >
      </motion.div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="max-w-sm text-center mb-6 relative z-10"
      >
      </motion.div>

      {/* Location */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="text-center mb-2 relative z-10"
      >
        <p className="text-green-400/50 text-xs uppercase tracking-[0.3em] mb-2">Lugar</p>
        <p className="text-white/80 text-xl font-bold mb-6">Parques del Río, Medellín</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-green-400/30 text-green-300/70 px-7 py-3 rounded-full text-sm hover:bg-green-400/10 hover:border-green-400/50 transition-all duration-300">
            Ver en Google Maps
          </a>
          <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-green-400/10 border border-green-400/30 text-green-300/70 px-7 py-3 rounded-full text-sm hover:bg-green-400/20 hover:border-green-400/50 transition-all duration-300">
                      Agregar al calendario
                    </a>
                  </div>
                  <p className="text-green-200/60 text-sm leading-relaxed italic font-light max-w-sm mx-auto mt-8 text-center">
                    Cada seis de julio marca un capítulo lleno de aprendizajes, sueños cumplidos y nuevos caminos por recorrer. Pero sé que no lo hago sola: cada abrazo, palabra y compañía vienen de personas que hacen este camino más liviano y significativo.
                    <br /><br />
                    Soy quien soy gracias a ti, y es por eso que mi luz también te pertenece.
                  </p>
                </motion.div>

    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.2, duration: 0.8 }}
  className="relative z-10 mt-8"
>
  <img
    src="/images/belaisa-footer.png"
    alt="Belaisa"
    className="w-64 object-contain mx-auto"
  />
</motion.div>

    </motion.main>
  )
}