"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, Plus } from "lucide-react"
import { getServiceIcon } from "@/lib/service-icons"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartModal } from "@/components/cart-modal"
import { LoginModal } from "@/components/login-modal"
import { useCart } from "@/lib/cart-context"
import { services, formatPrice } from "@/lib/services-data"

export default function ServiciosPage() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const { addItem } = useCart()

  const packages = services.filter((s) => s.type === "package")
  const individualServices = services.filter((s) => s.type === "individual")

  const handleAddToCart = (service: (typeof services)[0]) => {
    addItem({
      id: service.id,
      name: service.name,
      price: service.price,
    })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        onCartClick={() => setIsCartOpen(true)}
        onLoginClick={() => setIsLoginOpen(true)}
      />

      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center"
        style={{
          width: '100%',
          maxWidth: '1440px',
          height: '525px',
          margin: '0 auto',
          padding: '44px 80px',
        }}
      >
        <div className="absolute inset-0">
          <Image
            src="/images/IMG-SERVICIOS-1.png"
            alt="Vegas Estudio servicios"
            fill
            className="object-cover"
            style={{ objectPosition: 'center 20%' }}
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider" style={{ fontFamily: 'serif' }}>
            Nuestros servicios
          </h1>
        </div>
      </section>

      {/* Package Services */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Clásico */}
          <div className="grid grid-cols-1 md:grid-cols-2 mb-16 items-center" style={{ gap: '0rem' }}>
            <div className="aspect-square rounded-2xl overflow-hidden relative w-full max-w-[400px]">
              <Image
                src="/images/IMAGEN.png"
                alt="Servicio Clasico"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={getServiceIcon("clasico") || "/placeholder.svg"}
                  alt=""
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <h2 className="text-2xl font-bold">Clásico</h2>
                <span className="border border-border px-3 py-1 rounded text-sm">
                  Duración: 40 min
                </span>
              </div>
              <p className="text-muted-foreground mb-4">
                El corte de siempre, bien hecho.
                <br />
                Rápido, limpio y efectivo.
              </p>
              <ul className="text-sm space-y-1 mb-4">
                <li>• Lavado completo</li>
                <li>• Corte de cabello</li>
                <li>• Arreglo de barba (si aplica)</li>
                <li>• Mascarilla</li>
                <li>• Exfoliación express con vapor ozono</li>
              </ul>
              <button
                onClick={() => handleAddToCart(packages[0])}
                className="plus-btn w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #9AC138', padding: '9px' }}
              >
                <Plus className="plus-btn-icon w-[14px] h-[14px] text-white transition-colors duration-300" />
              </button>
            </div>
          </div>

          {/* Vegas Pro */}
          <div className="grid grid-cols-1 md:grid-cols-2 mb-16 items-center" style={{ gap: '0rem' }}>
            <div className="md:order-2 aspect-square rounded-2xl overflow-hidden relative w-full max-w-[400px] md:ml-auto">
              <Image
                src="/images/IMAGEN-1.png"
                alt="Servicio Vegas Pro"
                fill
                className="object-cover"
              />
            </div>
            <div className="md:order-1">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={getServiceIcon("vegas-pro") || "/placeholder.svg"}
                  alt=""
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <h2 className="text-2xl font-bold">Vegas Pro</h2>
                <span className="border border-border px-3 py-1 rounded text-sm">
                  Duración: 60 min
                </span>
              </div>
              <p className="text-muted-foreground mb-4">
                El servicio de la casa.
                <br />
                Más detalle, más tiempo y mejor experiencia.
              </p>
              <ul className="text-sm space-y-1 mb-4">
                <li>• Lavado completo</li>
                <li>• Corte de cabello</li>
                <li>• Perfilado de barba con tónicos</li>
                <li>• Toalla caliente</li>
                <li>• Limpieza facial Pro</li>
                <li className="pl-4 text-muted-foreground">(vaporización, exfoliación, mascarilla y crema hidratante)</li>
              </ul>
              <button
                onClick={() => handleAddToCart(packages[1])}
                className="plus-btn w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #9AC138', padding: '9px' }}
              >
                <Plus className="plus-btn-icon w-[14px] h-[14px] text-white transition-colors duration-300" />
              </button>
            </div>
          </div>

          {/* Premium */}
          <div className="grid grid-cols-1 md:grid-cols-2 mb-16 items-center" style={{ gap: '0rem' }}>
            <div className="aspect-square rounded-2xl overflow-hidden relative w-full max-w-[400px]">
              <Image
                src="/images/IMAGEN-2.png"
                alt="Servicio Premium"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={getServiceIcon("premium") || "/placeholder.svg"}
                  alt=""
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <h2 className="text-2xl font-bold">Premium</h2>
                <span className="border border-border px-3 py-1 rounded text-sm">
                  Duración: 90 min
                </span>
              </div>
              <p className="text-muted-foreground mb-4">
                Todo el cuidado completo.
                <br />
                Tiempo, técnica y atención al máximo nivel.
              </p>
              <ul className="text-sm space-y-1 mb-4">
                <li>• Lavado completo</li>
                <li>• Corte de cabello</li>
                <li>• Perfilado de barba con tónicos</li>
                <li>• Toalla caliente</li>
                <li>• Limpieza facial Premium</li>
                <li className="pl-4 text-muted-foreground">(vaporización, exfoliación, mascarilla, extracción de puntos negros, tratamiento con lámpara UV y crema hidratante)</li>
              </ul>
              <button
                onClick={() => handleAddToCart(packages[2])}
                className="plus-btn w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #9AC138', padding: '9px' }}
              >
                <Plus className="plus-btn-icon w-[14px] h-[14px] text-white transition-colors duration-300" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Individual Services - Servicios Premium layout */}
      <section className="py-16" style={{ width: '100%', maxWidth: '1440px', margin: '0 auto', paddingRight: '50px', paddingLeft: '50px' }}>
        <h2 className="text-3xl font-bold text-center mb-12">Servicios individuales</h2>

        {/* All cards in a single grid: 3 columns, gap 55px */}
        <div className="grid grid-cols-1 md:grid-cols-3 mb-10 justify-items-center" style={{ gap: "55px", alignContent: "flex-start", alignItems: "start" }}>
          {individualServices.map((service) => (
            <div
              key={service.id}
              className="service-card cursor-pointer flex flex-col bg-card overflow-hidden"
              style={{
                width: '344px',
                height: '260px',
                borderRadius: '10px',
                border: '1px solid #7B9A2D',
                padding: '39px',
              }}
            >
              {/* Top row: icon + name + price badge */}
              <div className="flex items-center gap-3 w-full">
                <Image
                  src={getServiceIcon(service.id) || "/placeholder.svg"}
                  alt=""
                  width={32}
                  height={32}
                  className="w-8 h-8 flex-shrink-0"
                />
                <span className="font-bold text-white whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif', fontSize: '22px', lineHeight: '28px' }}>{service.name}</span>
                <span className="rounded-[6px] flex items-center justify-center flex-shrink-0 ml-auto" style={{ border: '1px solid #9AC138', padding: '6px 14px' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: '#FFFFFF', whiteSpace: 'nowrap' }}>
                    {formatPrice(service.price)}
                  </span>
                </span>
              </div>

              {/* Description */}
              <p className="mt-4" style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 400, lineHeight: '22px', color: '#DFE1D5' }}>
                {service.description}
              </p>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Bottom row: duration + plus button */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#DFE1D5' }}>
                    {"Duraci\u00f3n: "}{service.duration}{" min"}
                  </span>
                </span>
                <button
                  onClick={() => handleAddToCart(service)}
                  className="plus-btn w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0"
                  style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #9AC138', padding: '9px' }}
                >
                  <Plus className="plus-btn-icon w-[16px] h-[16px] text-white transition-colors duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Continue button */}
        <div className="text-center mt-12">
          <Link
            href="/agendar"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors font-medium"
          >
            Continuar
            <span className="text-lg">{"→"}</span>
          </Link>
        </div>
      </section>

      <Footer />

      {/* Modals */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  )
}
