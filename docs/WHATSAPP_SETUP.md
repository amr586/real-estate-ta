# إعداد التحقق عبر WhatsApp

## نظرة عامة
يستخدم التطبيق Meta WhatsApp Business API لإرسال أكواد التحقق (OTP) عبر WhatsApp بعد التسجيل والدخول.

## المتطلبات
1. حساب Meta Business
2. تطبيق Facebook معتمد
3. رقم هاتف WhatsApp Business مسجل
4. توكن الوصول (Access Token)

## خطوات الإعداد

### 1. الحصول على بيانات Meta WhatsApp Business

#### أ. الدخول إلى Meta Business Manager
- انتقل إلى: https://business.facebook.com/
- سجل الدخول باستخدام حسابك

#### ب. إنشاء تطبيق WhatsApp
- اذهب إلى "My Apps" > "Create App"
- اختر "Business" كنوع التطبيق
- ملأ البيانات الأساسية

#### ج. الحصول على Phone Number ID و Access Token
في قسم WhatsApp:
1. اختر "Get Started"
2. حدد رقم هاتف WhatsApp Business الخاص بك
3. انسخ **Phone Number ID** من الواجهة
4. قم بإنشاء توكن الوصول:
   - اذهب إلى Settings > User Tokens
   - اختر الأذونات التالية: `whatsapp_business_messaging`, `whatsapp_business_management`
   - انسخ **Access Token**

### 2. إضافة متغيرات البيئة في Vercel

في لوحة التحكم Vercel:
1. اذهب إلى Project Settings > Environment Variables
2. أضف المتغيرات:

```
WHATSAPP_BUSINESS_ACCOUNT_TOKEN=your_access_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
```

### 3. اختبار الميزة

```bash
# التسجيل
POST /api/auth/register
Body: {
  "email": "user@example.com",
  "password": "password123",
  "first_name": "أحمد",
  "last_name": "محمد",
  "phone": "+966501234567"
}

# سيتم إرسال رسالة WhatsApp بكود التحقق (6 أرقام)

# التحقق من الكود
POST /api/auth/verify-otp
Body: {
  "phone": "+966501234567",
  "otp_code": "123456"
}
```

## API Endpoints

### 1. إرسال OTP
- **URL**: `/api/auth/send-otp`
- **Method**: POST
- **Body**:
```json
{
  "phone": "+966501234567"
}
```

### 2. التحقق من OTP
- **URL**: `/api/auth/verify-otp`
- **Method**: POST
- **Body**:
```json
{
  "phone": "+966501234567",
  "otp_code": "123456"
}
```

## معلومات إضافية

### صيغة رقم الهاتف
- يجب أن يكون الرقم بصيغة دولية: `+[country_code][number]`
- مثال السعودية: `+966501234567`

### مدة صلاحية الكود
- الكود صالح لمدة **15 دقيقة**
- يمكن محاولة **5 مرات** قبل انتهاء الصلاحية

### رسالة WhatsApp
```
رمز التحقق الخاص بك: 123456
الرمز صالح لمدة 15 دقيقة
```

## استكشاف الأخطاء

### خطأ: "Invalid Access Token"
- تحقق من صحة التوكن في Vercel Settings
- تأكد من عدم انتهاء صلاحية التوكن

### خطأ: "Invalid Phone Number ID"
- تحقق من صحة Phone Number ID
- تأكد من تفعيل الرقم في WhatsApp Business

### لم تستقبل الرسالة؟
- تأكد من إدراج رقم المرسل (البوت) في جهات الاتصال
- تحقق من سجل الرسائل المجمعة (Spam)

## الأمان

- أكواد OTP تُخزّن بشكل آمن في قاعدة البيانات
- كل محاولة فاشلة تُحفظ للتحقق من محاولات الهجوم
- الأكواد تنتهي تلقائياً بعد 15 دقيقة
