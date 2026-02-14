import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('admin_settings')
      .select('*')
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching admin settings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { is_booking_open, business_hours_start, business_hours_end, closed_dates } = body

    const updates: Record<string, unknown> = {}
    if (is_booking_open !== undefined) updates.is_booking_open = is_booking_open
    if (business_hours_start !== undefined) updates.business_hours_start = business_hours_start
    if (business_hours_end !== undefined) updates.business_hours_end = business_hours_end
    if (closed_dates !== undefined) updates.closed_dates = closed_dates
    updates.updated_at = new Date().toISOString()

    const { data: currentSettings } = await supabase
      .from('admin_settings')
      .select('id')
      .single()

    if (!currentSettings) {
      return NextResponse.json(
        { error: 'Admin settings not found' },
        { status: 404 }
      )
    }

    const { data, error } = await supabase
      .from('admin_settings')
      .update(updates)
      .eq('id', currentSettings.id)
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
    console.error('Error updating admin settings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
