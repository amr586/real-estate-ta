import { NextRequest, NextResponse } from 'next/server';
import { clearSessionCookie, getSessionCookie } from '@/lib/auth';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const sessionToken = await getSessionCookie();

    if (sessionToken) {
      // Delete session from database
      await query('DELETE FROM sessions WHERE token = $1', [sessionToken]);
    }

    const response = NextResponse.json(
      { message: 'تم تسجيل الخروج بنجاح' },
      { status: 200 }
    );

    response.cookies.set('session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('[Logout API] Error:', error);
    return NextResponse.json(
      { message: 'حدث خطأ في الخادم' },
      { status: 500 }
    );
  }
}
