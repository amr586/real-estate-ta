import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSessionCookie } from '@/lib/auth';

const planPrices: { [key: string]: number } = {
  advanced: 199,
  professional: 499,
};

const planListingLimits: { [key: string]: number } = {
  advanced: 50,
  professional: 9999,
};

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

    // Parse form data
    const formData = await request.formData();
    const plan = formData.get('plan') as string;
    const amount = parseFloat(formData.get('amount') as string);
    const paymentMethod = formData.get('paymentMethod') as string;
    const screenshot = formData.get('screenshot') as File | null;
    const bankName = formData.get('bankName') as string | null;
    const accountNumber = formData.get('accountNumber') as string | null;
    const referenceNumber = formData.get('referenceNumber') as string | null;

    // Validation
    if (!plan || !amount || !paymentMethod) {
      return NextResponse.json(
        { message: 'بيانات الدفع غير مكتملة' },
        { status: 400 }
      );
    }

    if (amount !== planPrices[plan]) {
      return NextResponse.json(
        { message: 'المبلغ غير صحيح' },
        { status: 400 }
      );
    }

    // Simulate screenshot upload (in production, use Vercel Blob Storage)
    let screenshotUrl = null;
    if (screenshot) {
      const fileName = `payments/${userId}-${Date.now()}.jpg`;
      screenshotUrl = `/uploads/${fileName}`;
    }

    // Create payment record
    const paymentResult = await query(
      `INSERT INTO payments (
        user_id, amount, type, status, payment_method, screenshot_url, transaction_reference
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id`,
      [
        userId,
        amount,
        'subscription',
        'pending',
        paymentMethod,
        screenshotUrl,
        referenceNumber || `${paymentMethod}-${Date.now()}`,
      ]
    );

    // Update subscription
    const planType = plan === 'professional' ? 'professional' : 'premium';
    const listingLimit = planListingLimits[plan];

    const subscriptionResult = await query(
      `UPDATE subscriptions 
       SET plan_type = $1, listing_limit = $2, status = $3, started_at = NOW(), expires_at = NOW() + INTERVAL '1 month'
       WHERE owner_id = $4
       RETURNING id`,
      [planType, listingLimit, 'active', userId]
    );

    if (subscriptionResult.rows.length === 0) {
      // Create new subscription if doesn't exist
      await query(
        `INSERT INTO subscriptions (owner_id, plan_type, listing_limit, status, started_at, expires_at)
         VALUES ($1, $2, $3, $4, NOW(), NOW() + INTERVAL '1 month')`,
        [userId, planType, listingLimit, 'active']
      );
    }

    // Log analytics
    await query(
      'INSERT INTO analytics (user_id, action_type) VALUES ($1, $2)',
      [userId, 'subscription_payment']
    );

    return NextResponse.json(
      {
        message: 'تم استقبال طلب الدفع بنجاح',
        paymentId: paymentResult.rows[0].id,
        status: 'pending',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[Payments API] Error:', error);
    return NextResponse.json(
      { message: 'حدث خطأ في الخادم' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
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

    // Get user's payments
    const paymentsResult = await query(
      'SELECT * FROM payments WHERE user_id = $1 ORDER BY created_at DESC LIMIT 20',
      [userId]
    );

    return NextResponse.json(
      { payments: paymentsResult.rows },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Payments API GET] Error:', error);
    return NextResponse.json(
      { message: 'حدث خطأ في الخادم' },
      { status: 500 }
    );
  }
}
