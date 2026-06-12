'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'

export default function GuestBook() {
  const { token } = useParams()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const validToken = process.env.NEXT_PUBLIC_INVITE_TOKEN

  if (token !== validToken) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#002a22' }}>
        <p className="text-white text-xl">Página no encontrada</p>
      </main>
    )
  }

  const handleSubmit = async () => {
    if (!name || !message) return
    setStatus('loading')

    const formData = new FormData()
    formData.append('name', name)
    formData.append('message', message)
    if (image) formData.append('image', image)

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

  if (status === 'success') {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: '#002a22' }}>
        <p className="text-6xl mb-6">🎉</p>
        <h2 className="text-white text-2xl font-light mb-2">¡Gracias!</h2>
        <p className="text-green-300/70 text-sm text-center">Tu mensaje fue guardado. Belaisa lo verá pronto.</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16" style={{ backgroundColor: '#002a22' }}>
      <div className="w-full max-w-md">
        <p className="text-green-400/60 text-xs uppercase tracking-widest text-center mb-2">Guest Book</p>
        <h1 className="text-white text-3xl font-light text-center mb-8">Déjale un mensaje a Belaisa</h1>

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

          <div className="border border-dashed border-white/20 rounded-xl px-4 py-6 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={e => setImage(e.target.files?.[0] || null)}
              className="hidden"
              id="photo"
            />
            <label htmlFor="photo" className="text-green-300/70 text-sm cursor-pointer">
              {image ? image.name : 'Subir una foto (opcional)'}
            </label>
          </div>

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
      </div>
    </main>
  )
}