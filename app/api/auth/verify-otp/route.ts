import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { phone, otp } = await request.json();

    if (!phone || !otp) {
      return NextResponse.json(
        { error: 'رقم الهاتف والكود مطلوبان' },
        { status: 400 }
      );
    }

    // Check if OTP is valid and not expired
    const result = await db.query(
      `SELECT * FROM otp_verifications 
       WHERE phone = $1 AND otp_code = $2 AND expires_at > NOW() AND verified = false`,
      [phone, otp]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'الكود غير صحيح أو انتهت صلاحيته' },
        { status: 400 }
      );
    }

    // Mark OTP as verified
    await db.query(
      `UPDATE otp_verifications SET verified = true, verified_at = NOW() WHERE phone = $1`,
      [phone]
    );

    // Update user's phone number as verified
    await db.query(
      `UPDATE users SET phone_verified = true, phone_verified_at = NOW() WHERE phone = $1`,
      [phone]
    );

    return NextResponse.json(
      { message: 'تم التحقق من الهاتف بنجاح', verified: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم' },
      { status: 500 }
    );
  }
}
