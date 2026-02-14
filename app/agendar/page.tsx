"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartModal } from "@/components/cart-modal"
import { LoginModal } from "@/components/login-modal"
import { ConfirmationModal } from "@/components/confirmation-modal"
import { StepIndicator } from "@/components/step-indicator"
import { ServiceSelection } from "@/components/service-selection"
import { DateTimeSelection } from "@/components/date-time-selection"
import { services } from "@/lib/services-data"

export default function AgendarPage() {
  const router = useRouter()
  const { token, user } = useAuth()

  useEffect(() => {
    // if not logged in (no token or user), redirect to auth
    const hasToken = token || localStorage.getItem('vegas_token')
    const hasUser = user || localStorage.getItem('vegas_user')
    if (!hasToken && !hasUser) {
      router.push('/auth')
    }
  }, [token, user, router])

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>("8:00 AM")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  const handleContinueToDateTime = () => {
    if (selectedServices.length > 0) {
      setCurrentStep(2)
    }
  }

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
    setIsLoginOpen(false)
    setCurrentStep(1)
  }

  const handleBack = () => {
    setCurrentStep(1)
  }

  const handleConfirm = () => {
    setCurrentStep(3)
    setIsConfirmationOpen(true)
  }

  const getTotalDuration = () => {
    return selectedServices.reduce((sum, id) => {
      const service = services.find((s) => s.id === id)
      return sum + (service?.duration || 0)
    }, 0)
  }

  const selectedServiceNames = selectedServices
    .map((id) => services.find((s) => s.id === id)?.name)
    .filter(Boolean) as string[]

  const totalPrice = selectedServices.reduce((sum, id) => {
    const service = services.find((s) => s.id === id)
    return sum + (service?.price || 0)
  }, 0)

  const formatDate = (date: Date | null) => {
    if (!date) return ""
    return date.toLocaleDateString("es-CO", {
      day: "numeric",
      month: "long",
    })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        onCartClick={() => setIsCartOpen(true)}
        onLoginClick={() => setIsLoginOpen(true)}
      />

      {/* Step Indicator Section */}
      <section className="bg-white w-full" style={{ height: "244px" }}>
        <div className="container mx-auto max-w-6xl h-full flex items-center justify-center">
          <StepIndicator currentStep={currentStep} />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          {currentStep === 0 && (
            <div className="text-center py-12">
              <h2 className="text-3xl font-bold mb-4">
                Inicia sesión para agendar tu cita
              </h2>
              <p className="text-muted-foreground mb-8">
                Necesitas estar autenticado para reservar tu cita
              </p>
              <button
                onClick={() => setIsLoginOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all duration-300 text-black"
                style={{
                  background: "#FDB400",
                  border: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "linear-gradient(180deg, #7B9A2D -72.56%, #1A2722 100%)"
                  e.currentTarget.style.color = "white"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#FDB400"
                  e.currentTarget.style.color = "black"
                }}
              >
                Inicia sesión
              </button>
            </div>
          )}

          {currentStep === 1 && isLoggedIn && (
            <ServiceSelection
              selectedServices={selectedServices}
              onServiceToggle={handleServiceToggle}
              onContinue={handleContinueToDateTime}
            />
          )}

          {currentStep >= 2 && isLoggedIn && (
            <DateTimeSelection
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              selectedServices={selectedServiceNames}
              totalDuration={getTotalDuration()}
              onDateChange={setSelectedDate}
              onTimeChange={setSelectedTime}
              onBack={handleBack}
              onConfirm={handleConfirm}
            />
          )}
        </div>
      </section>

      <Footer />

      {/* Modals */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onSuccess={handleLoginSuccess} />
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        services={selectedServiceNames}
        date={formatDate(selectedDate)}
        time={selectedTime}
        price={totalPrice}
      />
    </div>
  )
}
