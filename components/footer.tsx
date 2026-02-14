import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="relative border-t border-border/30" style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
      {/* Footer background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/IMG-FOOTER.png"
          alt=""
          fill
          className="object-cover"
        />
      </div>
      {/* Dark overlay matching design spec: rgba(26, 39, 34, 0.95) */}
      <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(26, 39, 34, 0.95)' }} />
      <div className="container mx-auto relative z-10" style={{ padding: '34px 87px' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo */}
          <div className="flex justify-center md:justify-start">
            <Image
              src="/images/vertical-negativo.svg"
              alt="Vegas Estudio"
              width={124}
              height={165}
              className="w-[124px] h-[165px] object-contain"
            />
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center gap-3">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Inicio
            </Link>
            <Link href="/#ubicacion" className="text-foreground hover:text-primary transition-colors">
              Ubicación
            </Link>
            <Link href="/servicios" className="text-foreground hover:text-primary transition-colors">
              Servicios
            </Link>
            <Link href="/agendar" className="text-foreground hover:text-primary transition-colors">
              Agendar cita
            </Link>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-end gap-3 text-foreground">
            <div>
              <p className="text-muted-foreground text-sm">Ubicación</p>
              <p>Calle 76 #63-58</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Horario de atención:</p>
              <p>9:30 a. m. - 8:00 p. m.</p>
            </div>
            <Link href="https://wa.me/573147801264" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.967 1.523 9.86 9.86 0 00-3.105 3.098 9.87 9.87 0 00-.866 4.282c0 1.46.278 2.848.813 4.127l.845-3.08c-.102-.34-.158-.699-.158-1.068 0-1.917.78-3.647 2.042-4.909a5.823 5.823 0 014.913-2.038c2.338 0 4.43.95 5.945 2.487a5.876 5.876 0 011.96 4.422c0 3.249-2.647 5.898-5.898 5.898-1.092 0-2.126-.306-3.006-.833l-3.097 1.602c.816.432 1.749.678 2.726.678 3.249 0 5.898-2.647 5.898-5.898 0-1.56-.597-2.978-1.57-4.05a5.86 5.86 0 00-4.238-1.756z" />
              </svg>
              <span className="text-sm font-medium">314 780 1264</span>
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border/30 text-center text-muted-foreground text-sm">
          <p>© 2026 Vegas Estudio</p>
          <p>Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  )
}
