import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

// Generate random 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    // Validate phone number
    if (!phone || !/^\+?[1-9]\d{1,14}$/.test(phone)) {
      return NextResponse.json(
        { error: 'رقم هاتف غير صحيح' },
        { status: 400 }
      );
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save OTP to database
    await db.query(
      `INSERT INTO phone_verification_otp (phone, otp, expires_at) 
       VALUES ($1, $2, $3)
       ON CONFLICT (phone) DO UPDATE SET otp = $2, expires_at = $3`,
      [phone, otp, expiresAt]
    );

    // Send OTP via WhatsApp using Meta Business API
    const whatsappToken = process.env.WHATSAPP_BUSINESS_ACCOUNT_TOKEN;
    const whatsappPhoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

    if (!whatsappToken || !whatsappPhoneId) {
      console.error('WhatsApp credentials missing');
      return NextResponse.json(
        { error: 'خدمة التحقق غير متوفرة حالياً' },
        { status: 500 }
      );
    }

    // Format phone number for WhatsApp (remove + if exists, ensure E.164 format)
    const formattedPhone = phone.replace(/\D/g, '');

    const response = await fetch(
      `https://graph.instagram.com/v18.0/${whatsappPhoneId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${whatsappToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: formattedPhone,
          type: 'template',
          template: {
            name: 'verify_code',
            language: {
              code: 'ar',
            },
            components: [
              {
                type: 'body',
                parameters: [
                  {
                    type: 'text',
                    text: otp,
                  },
                ],
              },
            ],
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('WhatsApp API error:', errorData);
      return NextResponse.json(
        { error: 'فشل إرسال الكود. حاول لاحقاً' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'تم إرسال الكود على WhatsApp', phone },
      { status: 200 }
    );
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم' },
      { status: 500 }
    );
  }
}
