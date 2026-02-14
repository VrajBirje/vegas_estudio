"use client"

import Link from "next/link"

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  services: string[]
  date: string
  time: string
  price: number
}

export function ConfirmationModal({
  isOpen,
  onClose,
  services,
  date,
  time,
  price,
}: ConfirmationModalProps) {
  if (!isOpen) return null

  const formatPrice = (p: number) => {
    return `$ ${p.toLocaleString("es-CO")} COP`
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative rounded-lg shadow-xl text-white" style={{
        width: '545px',
        height: '349px',
        padding: '10px',
        gap: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #7B9A2D -72.56%, #1A2722 100%)',
      }}>
        <h2 className="text-xl font-semibold text-center mb-6">
          ¡Tu cita quedó registrada!
        </h2>

        <ul className="space-y-2 mb-6 list-disc list-inside">
          <li>Servicios: {services.join(", ")}</li>
          <li>Fecha: {date}</li>
          <li>Hora: {time}</li>
          <li>Precio: {formatPrice(price)}</li>
        </ul>

        <div className="flex flex-col items-center gap-2">
          <Link
            href="/"
            className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors font-medium"
          >
            Volver al home
          </Link>
          <button
            onClick={onClose}
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Modificar
          </button>
        </div>
      </div>
    </div>
  )
}
