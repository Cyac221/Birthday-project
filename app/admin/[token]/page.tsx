'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'

type Entry = {
  id: string
  name: string
  message: string
  imageUrl?: string
  createdAt: string
}

export default function AdminPage() {
  const { token } = useParams()
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)

  const validToken = process.env.NEXT_PUBLIC_ADMIN_TOKEN

  useEffect(() => {
    if (token !== validToken) return
    fetch('/api/entries')
      .then(res => res.json())
      .then(data => {
        setEntries(data)
        setLoading(false)
      })
  }, [token, validToken])

  if (token !== validToken) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#002a22' }}>
        <p className="text-white text-xl">Página no encontrada</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen px-6 py-16" style={{ background: 'linear-gradient(135deg, #001a14 0%, #002a22 40%, #004a3f 70%, #003830 100%)' }}>
      <div className="max-w-4xl mx-auto">
        <p className="text-green-400/60 text-xs uppercase tracking-widest mb-2">Admin</p>
        <h1 className="text-white text-3xl font-light mb-2">Mensajes para Belaisa</h1>
        <p className="text-green-300/50 text-sm mb-10">{entries.length} mensaje{entries.length !== 1 ? 's' : ''} recibido{entries.length !== 1 ? 's' : ''}</p>

        {loading ? (
          <p className="text-green-300/50 text-sm">Cargando...</p>
        ) : entries.length === 0 ? (
          <p className="text-green-300/50 text-sm">Aún no hay mensajes.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {entries.map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 overflow-hidden"
                style={{ backgroundColor: 'rgba(0,42,34,0.8)' }}
              >
                {entry.imageUrl && (
                  <img
                    src={entry.imageUrl}
                    alt={entry.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-5">
                  <p className="text-white font-medium mb-1">{entry.name}</p>
                  <p className="text-green-200/70 text-sm leading-relaxed mb-3">{entry.message}</p>
                  <p className="text-green-400/40 text-xs">
                    {new Date(entry.createdAt).toLocaleDateString('es-CO', {
                      day: 'numeric',
                      month: 'long',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}