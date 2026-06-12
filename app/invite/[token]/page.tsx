'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const img = new Image()
    img.onload = () => {
      const maxW = 1200
      const ratio = Math.min(maxW / img.width, maxW / img.height, 1)
      canvas.width = img.width * ratio
      canvas.height = img.height * ratio
      canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height)
      canvas.toBlob(blob => {
        resolve(new File([blob!], file.name, { type: 'image/jpeg' }))
      }, 'image/jpeg', 0.7)
    }
    img.src = URL.createObjectURL(file)
  })
}

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
    { top: '2%',   left: '-5%',  size: 170, delay: 0,   duration: 8  },
    { top: '1%',   left: '82%',  size: 140, delay: 1,   duration: 7  },
    { top: '35%',  left: '-6%',  size: 160, delay: 4,   duration: 8  },
    { top: '38%',  left: '83%',  size: 180, delay: 0.5, duration: 9  },
    { top: '72%',  left: '-4%',  size: 165, delay: 1,   duration: 8  },
    { top: '70%',  left: '80%',  size: 155, delay: 2,   duration: 9  },
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


function Popup({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md rounded-2xl p-8 border border-green-400/20"
        style={{ backgroundColor: '#002a22' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-green-300/50 hover:text-green-300 transition text-xl"
        >
          ✕
        </button>
        <p className="text-green-400/60 text-xs uppercase tracking-widest mb-4">Hola! Gracias por estar aquí :)</p>
        <h2 className="text-white text-2xl font-light mb-4">
          Que estés aquí con nosotros celebrando la vida de Isa lo hace mas especial
        </h2>
        <p className="text-green-200/60 text-sm leading-relaxed italic mb-6">
          Esta página es una sorpresa para ella — aquí puedes dejarle un mensaje de cumpleaños, una foto o el recuerdo que quieras. Ella lo verá después.
        </p>
        <p className="text-white/70 text-sm text-center mb-6">
        🤫 ¡ES SECRETO! - Que no se de cuenta! 🤫
        </p>
        <button
          onClick={onClose}
          className="w-full bg-green-400/20 border border-green-400/40 text-green-300 py-3 rounded-full text-sm hover:bg-green-400/30 transition-all"
        >
          Dejar un mensaje
        </button>
      </motion.div>
    </motion.div>
  )
}

export default function GuestBook() {
  const { token } = useParams()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [showPopup, setShowPopup] = useState(true)

  const validToken = process.env.NEXT_PUBLIC_INVITE_TOKEN

  if (token !== validToken) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#002a22' }}>
        <p className="text-white text-xl">Página no encontrada</p>
      </main>
    )
  }

  const handleImage = (file: File) => {
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const removeImage = () => {
    setImage(null)
    setPreview(null)
  }

  const handleSubmit = async () => {
    if (!name || !message) return
    setStatus('loading')

    const formData = new FormData()
    formData.append('name', name)
    formData.append('message', message)

    if (image) {
      const compressed = await compressImage(image)
      formData.append('image', compressed)
    }

    const res = await fetch('/api/entries', {
      method: 'POST',
      body: formData,
    })

    if (res.ok) {
      setStatus('success')
    } else {
      setStatus('error')
    }
  }

  const handleReset = () => {
    setName('')
    setMessage('')
    setImage(null)
    setPreview(null)
    setStatus('idle')
  }

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #001a14 0%, #002a22 40%, #004a3f 70%, #003830 100%)' }}
    >
      <FloatingPhotos />
      <AnimatePresence>
        {showPopup && <Popup onClose={() => setShowPopup(false)} />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-6xl mb-6">🎉</p>
            <h2 className="text-white text-2xl font-light mb-2">¡Gracias!</h2>
            <p className="text-green-300/70 text-sm text-center mb-8">
              Tu mensaje fue guardado. Belaisa lo verá pronto.
            </p>
            <button
              onClick={handleReset}
              className="bg-green-400/20 border border-green-400/40 text-green-300 px-8 py-3 rounded-full text-sm hover:bg-green-400/30 transition-all"
            >
              Enviar otro mensaje
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md relative z-10"
          >
            <p className="text-green-400/60 text-xs uppercase tracking-widest text-center mb-2">Pon tu mensaje de cumpleaños aquí</p>
            <h1 className="text-white text-3xl font-light text-center mb-8">
              Déjale un mensaje a Belaisa
            </h1>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={e => setName(e.target.value)}
                className="bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 outline-none focus:border-green-400/50"
              />

              <textarea
                placeholder="Tu mensaje..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={4}
                className="bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 outline-none focus:border-green-400/50 resize-none"
              />

              {preview ? (
                <div className="relative rounded-xl overflow-hidden border border-white/20">
                  <img src={preview} alt="preview" className="w-full object-contain" />
                  <button
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/80 transition text-sm"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="border border-dashed border-white/20 rounded-xl px-4 py-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => e.target.files?.[0] && handleImage(e.target.files[0])}
                    className="hidden"
                    id="photo"
                  />
                  <label htmlFor="photo" className="text-green-300/70 text-sm cursor-pointer">
                    Sube aquí tu foto con Bela (opcional)
                  </label>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={status === 'loading' || !name || !message}
                className="bg-green-400/20 border border-green-400/40 text-green-300 py-3 rounded-full text-sm hover:bg-green-400/30 transition-all disabled:opacity-50"
              >
                {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
              </button>

              {status === 'error' && (
                <p className="text-red-400/70 text-sm text-center">Hubo un error. Intenta de nuevo.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}