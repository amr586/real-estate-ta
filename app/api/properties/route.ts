import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSessionCookie } from '@/lib/auth';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const sessionToken = await getSessionCookie();
    
    if (!sessionToken) {
      return NextResponse.json(
        { message: 'يجب تسجيل الدخول أولاً' },
        { status: 401 }
      );
    }

    // Get user from session
    const sessionResult = await query(
      'SELECT user_id FROM sessions WHERE token = $1 AND expires_at > NOW()',
      [sessionToken]
    );

    if (sessionResult.rows.length === 0) {
      return NextResponse.json(
        { message: 'جلسة منتهية الصلاحية' },
        { status: 401 }
      );
    }

    const userId = sessionResult.rows[0].user_id;

    // Check if user is owner
    const userResult = await query(
      'SELECT role FROM users WHERE id = $1',
      [userId]
    );

    if (userResult.rows.length === 0 || userResult.rows[0].role !== 'owner') {
      return NextResponse.json(
        { message: 'يجب أن تكون مالك عقار لإضافة عقارات' },
        { status: 403 }
      );
    }

    // Check subscription limit
    const subscriptionResult = await query(
      'SELECT used_listings, listing_limit FROM subscriptions WHERE owner_id = $1',
      [userId]
    );

    if (subscriptionResult.rows.length > 0) {
      const { used_listings, listing_limit } = subscriptionResult.rows[0];
      if (used_listings >= listing_limit) {
        return NextResponse.json(
          { message: 'لقد وصلت إلى حد الإدراجات المسموح بها في خطتك' },
          { status: 400 }
        );
      }
    }

    const body = await request.json();
    const {
      title,
      description,
      propertyType,
      listingType,
      price,
      location,
      areaSqm,
      bedrooms,
      bathrooms,
    } = body;

    // Validation
    if (!title || !description || !price || !location) {
      return NextResponse.json(
        { message: 'جميع الحقول المطلوبة يجب ملؤها' },
        { status: 400 }
      );
    }

    // Generate announcement code
    const announcementCode = `ANN-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

    // Create property
    const propertyResult = await query(
      `INSERT INTO properties (
        owner_id, title, description, property_type, listing_type,
        price, location, area_sqm, bedrooms, bathrooms, announcement_code, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING id, announcement_code`,
      [
        userId,
        title,
        description,
        propertyType,
        listingType,
        price,
        location,
        areaSqm || null,
        bedrooms || null,
        bathrooms || null,
        announcementCode,
        'active',
      ]
    );

    const propertyId = propertyResult.rows[0].id;

    // Update subscription usage
    if (subscriptionResult.rows.length > 0) {
      await query(
        'UPDATE subscriptions SET used_listings = used_listings + 1 WHERE owner_id = $1',
        [userId]
      );
    }

    // Log analytics
    await query(
      'INSERT INTO analytics (property_id, user_id, action_type) VALUES ($1, $2, $3)',
      [propertyId, userId, 'property_created']
    );

    return NextResponse.json(
      {
        message: 'تمت إضافة العقار بنجاح',
        property: {
          id: propertyId,
          announcementCode: announcementCode,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[Properties API] Error:', error);
    return NextResponse.json(
      { message: 'حدث خطأ في الخادم' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const listingType = searchParams.get('listingType');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const location = searchParams.get('location');

    let queryStr = 'SELECT * FROM properties WHERE status = $1';
    const params: any[] = ['active'];

    if (type) {
      queryStr += ` AND property_type = $${params.length + 1}`;
      params.push(type);
    }

    if (listingType) {
      queryStr += ` AND listing_type = $${params.length + 1}`;
      params.push(listingType);
    }

    if (minPrice) {
      queryStr += ` AND price >= $${params.length + 1}`;
      params.push(parseFloat(minPrice));
    }

    if (maxPrice) {
      queryStr += ` AND price <= $${params.length + 1}`;
      params.push(parseFloat(maxPrice));
    }

    if (location) {
      queryStr += ` AND location ILIKE $${params.length + 1}`;
      params.push(`%${location}%`);
    }

    queryStr += ' ORDER BY created_at DESC LIMIT 50';

    const result = await query(queryStr, params);

    return NextResponse.json(
      { properties: result.rows },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Properties API GET] Error:', error);
    return NextResponse.json(
      { message: 'حدث خطأ في الخادم' },
      { status: 500 }
    );
  }
}
