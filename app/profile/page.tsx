"use client"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function ProfilePage() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    const hasUser = user || localStorage.getItem('vegas_user')
    if (!hasUser) router.push('/auth')
  }, [user, router])

  if (!user && !localStorage.getItem('vegas_user')) return null

  const stored = user || JSON.parse(localStorage.getItem('vegas_user') || 'null')

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Mi perfil</h1>
        {stored ? (
          <div>
            <p><strong>Nombre:</strong> {stored.name}</p>
            <p><strong>Email:</strong> {stored.email}</p>
            <p><strong>Teléfono:</strong> {stored.phone || '—'}</p>
          </div>
        ) : (
          <p>Cargando...</p>
        )}
      </main>
      <Footer />
    </div>
  )
}
