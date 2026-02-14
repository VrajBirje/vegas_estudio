import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      user_id,
      user_name,
      user_email,
      user_phone,
      service_ids,
      appointment_date,
      appointment_time,
      duration_minutes,
      notes,
    } = body

    // Validate required fields
    if (!user_name || !user_phone || !service_ids || !appointment_date || !appointment_time || !duration_minutes) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if booking is open
    const { data: settings } = await supabase
      .from('admin_settings')
      .select('is_booking_open, closed_dates')
      .single()

    if (!settings?.is_booking_open) {
      return NextResponse.json(
        { error: 'Booking is currently closed' },
        { status: 403 }
      )
    }

    // Check if date is in closed dates
    if (settings.closed_dates?.includes(appointment_date)) {
      return NextResponse.json(
        { error: 'This date is closed for bookings' },
        { status: 403 }
      )
    }

    // Check for conflicting appointments
    const { data: conflicts } = await supabase
      .from('appointments')
      .select('*')
      .eq('appointment_date', appointment_date)
      .eq('appointment_time', appointment_time)
      .eq('status', 'confirmed')

    if (conflicts && conflicts.length > 0) {
      return NextResponse.json(
        { error: 'This time slot is already booked' },
        { status: 409 }
      )
    }

    // Create appointment
    const { data, error } = await supabase
      .from('appointments')
      .insert([
        {
          user_id,
          user_name,
          user_email,
          user_phone,
          service_ids,
          appointment_date,
          appointment_time,
          duration_minutes,
          notes,
          status: 'confirmed',
        },
      ])
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const date = searchParams.get('date')

    let query = supabase.from('appointments').select('*')

    if (status) {
      query = query.eq('status', status)
    }
    if (date) {
      query = query.eq('appointment_date', date)
    }

    const { data, error } = await query
      .order('appointment_date', { ascending: true })
      .order('appointment_time', { ascending: true })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status, notes } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Appointment ID is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('appointments')
      .update({
        status,
        notes,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating appointment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Appointment ID is required' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting appointment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
