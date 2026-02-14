"use client"

import Image from "next/image"
import { Clock } from "lucide-react"
import { services, formatPrice } from "@/lib/services-data"
import { getServiceIcon } from "@/lib/service-icons"

interface ServiceSelectionProps {
  selectedServices: string[]
  onServiceToggle: (serviceId: string) => void
  onContinue: () => void
}

function ServiceCard({
  service,
  isSelected,
  onToggle,
}: {
  service: (typeof services)[0]
  isSelected: boolean
  onToggle: () => void
}) {
  return (
    <button
      onClick={onToggle}
      className="agendar-service-card relative rounded-[10px] text-left transition-all duration-300 flex flex-col"
      style={{
        width: "330px",
        height: "200px",
        borderRadius: "10px",
        paddingTop: "28px",
        paddingRight: "20px",
        paddingBottom: "28px",
        paddingLeft: "26px",
        gap: "12px",
      }}
    >
      {/* Row 1: icon + title on left, price badge on right */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-[7px]">
          <Image
            src={getServiceIcon(service.id) || "/placeholder.svg"}
            alt=""
            width={32}
            height={32}
            className="w-8 h-8 flex-shrink-0"
          />
          <h3
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "24px",
              lineHeight: "24px",
              fontWeight: 600,
              color: "#FFFFFF",
            }}
          >
            {service.name}
          </h3>
        </div>
        <span
          className="rounded-[6px] flex items-center justify-center flex-shrink-0"
          style={{
            padding: "7px 14px",
            border: "1px solid #9AC138",
          }}
        >
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "16px",
              color: "#FFFFFF",
            }}
          >
            {formatPrice(service.price)}
          </span>
        </span>
      </div>

      {/* Row 2: Description */}
      <p
        className="w-full"
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "16px",
          fontWeight: 400,
          lineHeight: "24px",
          color: "#FFFFFF",
        }}
      >
        {service.description}
      </p>

      {/* Row 3: Duration only */}
      <div className="flex items-center w-full mt-auto">
        <div className="flex items-center gap-[5px]">
          <Clock className="w-[14px] h-[14px]" style={{ color: "#DFE1D5" }} />
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              lineHeight: "16px",
              color: "#DFE1D5",
            }}
          >
            {"Duraci\u00f3n: "}
            {service.duration}
            {" min"}
          </span>
        </div>
      </div>
    </button>
  )
}

export function ServiceSelection({
  selectedServices,
  onServiceToggle,
  onContinue,
}: ServiceSelectionProps) {
  const packages = services.filter((s) => s.type === "package")
  const individualServices = services.filter((s) => s.type === "individual")

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-12">
        Elige tus servicios
      </h2>

      {/* Package Services - Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 mb-6 justify-items-center" style={{ gap: "13rem" }}>
        {packages.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            isSelected={selectedServices.includes(service.id)}
            onToggle={() => onServiceToggle(service.id)}
          />
        ))}
      </div>

      {/* Individual Services - Middle Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 mb-6 justify-items-center" style={{ gap: "13rem" }}>
        {individualServices.slice(0, 3).map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            isSelected={selectedServices.includes(service.id)}
            onToggle={() => onServiceToggle(service.id)}
          />
        ))}
      </div>

      {/* Bottom Row - 2 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto mb-12 justify-items-center" style={{ gap: "13rem" }}>
        {individualServices.slice(3).map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            isSelected={selectedServices.includes(service.id)}
            onToggle={() => onServiceToggle(service.id)}
          />
        ))}
      </div>

      {/* Continue Button */}
      <div className="text-center">
        <button
          onClick={onContinue}
          disabled={selectedServices.length === 0}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all duration-300 text-black disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: "#FDB400",
            border: "none",
          }}
          onMouseEnter={(e) => {
            if (!e.currentTarget.disabled) {
              e.currentTarget.style.background =
                "linear-gradient(180deg, #7B9A2D -72.56%, #1A2722 100%)"
              e.currentTarget.style.color = "white"
            }
          }}
          onMouseLeave={(e) => {
            if (!e.currentTarget.disabled) {
              e.currentTarget.style.background = "#FDB400"
              e.currentTarget.style.color = "black"
            }
          }}
        >
          Continuar
          <span className="text-lg">{"→"}</span>
        </button>
      </div>
    </div>
  )
}
