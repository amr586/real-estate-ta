import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { hashPassword, generateSessionToken, setSessionCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, phone, password, firstName, lastName, role } = body;

    // Validation
    if (!email || !phone || !password || !firstName || !lastName) {
      return NextResponse.json(
        { message: 'جميع الحقول مطلوبة' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await query(
      'SELECT id FROM users WHERE email = $1 OR phone = $2',
      [email, phone]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { message: 'البريد الإلكتروني أو رقم الهاتف موجود بالفعل' },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const userResult = await query(
      `INSERT INTO users (email, phone, password_hash, first_name, last_name, role)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, email, role, first_name, last_name`,
      [email, phone, passwordHash, firstName, lastName, role || 'user']
    );

    const user = userResult.rows[0];

    // If user is owner, create subscription
    if (user.role === 'owner') {
      await query(
        `INSERT INTO subscriptions (owner_id, plan_type, listing_limit)
         VALUES ($1, $2, $3)`,
        [user.id, 'free', 5]
      );
    }

    // Create session
    const sessionToken = await generateSessionToken();
    await query(
      `INSERT INTO sessions (user_id, token, expires_at)
       VALUES ($1, $2, NOW() + INTERVAL '7 days')`,
      [user.id, sessionToken]
    );

    // Set session cookie
    const response = NextResponse.json(
      { message: 'تم التسجيل بنجاح', user },
      { status: 201 }
    );

    response.cookies.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('[Register API] Error:', error);
    return NextResponse.json(
      { message: 'حدث خطأ في الخادم' },
      { status: 500 }
    );
  }
}
