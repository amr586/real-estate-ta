import { NextRequest, NextResponse } from 'next/server';
import { query as dbQuery } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Get user ID from session (simplified - you should implement proper session)
    const userId = 1; // This should come from actual session

    const queryText = `
      INSERT INTO property_requests (
        user_id,
        title,
        description,
        property_type,
        listing_type,
        location,
        budget_min,
        budget_max,
        area_min,
        area_max,
        bedrooms,
        status
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
      )
      RETURNING id, created_at, status;
    `;

    const result = await dbQuery(queryText, [
      userId,
      data.title,
      data.description,
      data.propertyType,
      data.listingType,
      data.location,
      data.budgetMin || null,
      data.budgetMax || null,
      data.areaMin || null,
      data.areaMax || null,
      data.bedrooms || null,
      'pending',
    ]);

    return NextResponse.json(
      {
        success: true,
        request: result.rows[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Property request error:', error);
    return NextResponse.json(
      { error: 'فشل في إنشاء الطلب' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const queryText = `
      SELECT 
        pr.*,
        u.email,
        u.phone,
        ar.action as latest_action,
        ar.notes as admin_notes
      FROM property_requests pr
      LEFT JOIN users u ON pr.user_id = u.id
      LEFT JOIN admin_reviews ar ON pr.id = ar.request_id
      ORDER BY pr.created_at DESC
    `;

    const result = await dbQuery(queryText);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Fetch requests error:', error);
    return NextResponse.json(
      { error: 'فشل في جلب الطلبات' },
      { status: 500 }
    );
  }
}
