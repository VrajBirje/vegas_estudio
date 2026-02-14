-- Create admin_settings table for managing booking availability
CREATE TABLE IF NOT EXISTS admin_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  is_booking_open BOOLEAN DEFAULT true,
  business_hours_start TIME DEFAULT '09:30:00',
  business_hours_end TIME DEFAULT '20:00:00',
  closed_dates TEXT[] DEFAULT ARRAY[]::TEXT[],
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blocked_slots table for managing specific date/time closures
CREATE TABLE IF NOT EXISTS blocked_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  reason VARCHAR(255),
  is_full_day BOOLEAN DEFAULT false,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(slot_date, start_time, end_time)
);

-- Create services table for dynamic service management
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  description TEXT,
  duration INTEGER NOT NULL,
  features TEXT[],
  type VARCHAR(50) DEFAULT 'individual',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255),
  user_phone VARCHAR(20),
  service_ids TEXT[] NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  duration_minutes INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'confirmed',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin settings
INSERT INTO admin_settings (is_booking_open) 
VALUES (true)
ON CONFLICT DO NOTHING;

-- Insert default services
INSERT INTO services (service_id, name, price, description, duration, features, type, is_active) VALUES
('clasico', 'Clásico', 35000, 'El corte de siempre, bien hecho. Rápido, limpio y efectivo.', 40, ARRAY['Lavado completo', 'Corte de cabello', 'Arreglo de barba (si aplica)', 'Mascarilla negra', 'Exfoliación express con vapor ozono'], 'package', true),
('vegas-pro', 'Vegas Pro', 45000, 'El servicio de la casa. Más detalle, más tiempo y mejor experiencia.', 60, ARRAY['Lavado completo', 'Corte de cabello', 'Perfilado de barba con tónicos', 'Toalla caliente', 'Limpieza facial Pro (vaporización, exfoliación, mascarilla y crema hidratante)'], 'package', true),
('premium', 'Premium', 60000, 'Todo el cuidado completo. Tiempo, técnica y atención al máximo nivel.', 90, ARRAY['Lavado completo', 'Corte de cabello', 'Perfilado de barba con tónicos', 'Toalla caliente', 'Limpieza facial Premium (vaporización, exfoliación, mascarilla, extracción de puntos negros, tratamiento con lámpara UV y crema hidratante)'], 'package', true),
('corte', 'Corte', 25000, 'Corte sencillo', 30, ARRAY[], 'individual', true),
('barba', 'Barba', 15000, 'Perfildo de barba con tónicos', 20, ARRAY[], 'individual', true),
('depilacion', 'Depilación', 20000, 'Depilación de nariz y orejas', 20, ARRAY[], 'individual', true),
('limpieza-facial', 'Limpieza facial', 35000, 'vaporización, exfoliación, mascarilla, extracción de puntos negros, tratamiento con lámpara UV y crema hidratante', 25, ARRAY[], 'individual', true),
('cejas', 'Cejas', 6000, 'Perfilado de cejas', 5, ARRAY[], 'individual', true)
ON CONFLICT DO NOTHING;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_date_time ON appointments(appointment_date, appointment_time);
CREATE INDEX IF NOT EXISTS idx_blocked_slots_date ON blocked_slots(slot_date);
CREATE INDEX IF NOT EXISTS idx_blocked_slots_date_time ON blocked_slots(slot_date, start_time, end_time);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_services_service_id ON services(service_id);
