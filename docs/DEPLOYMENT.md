# نشر التطبيق على Vercel

## نظرة عامة
هذا التطبيق جاهز للنشر على Vercel مع جميع الميزات المتكاملة.

## ما يتم نشره
- ✅ تطبيق Next.js 16 مع TypeScript
- ✅ قاعدة بيانات PostgreSQL (Neon)
- ✅ نظام مصادقة آمن بكلمات المرور المشفرة
- ✅ تحقق OTP عبر WhatsApp
- ✅ لوحة تحكم للمسؤولين
- ✅ نظام إدارة العقارات
- ✅ معالجة الدفع

## خطوات النشر على Vercel

### 1. دخول Vercel
- اذهب إلى https://vercel.com
- سجل الدخول أو أنشئ حساب

### 2. استيراد المشروع
```bash
# إذا كان لديك المشروع على GitHub
1. اضغط "New Project"
2. اختر "Import Git Repository"
3. اختر مستودع "real-estate-ta"
4. اضغط "Import"
```

### 3. إعداد متغيرات البيئة
في صفحة Vercel > Settings > Environment Variables أضف:

```
DATABASE_URL=your_neon_database_url
SESSION_SECRET=your_secret_key_change_in_production
WHATSAPP_BUSINESS_ACCOUNT_TOKEN=your_meta_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
NODE_ENV=production
```

### 4. النشر
- اضغط "Deploy"
- انتظر حتى يتم بناء المشروع (~2-3 دقائق)
- سيحصل على URL للمشروع الحي

## متغيرات البيئة المطلوبة

### 1. DATABASE_URL
- الحصول منها من: https://console.neon.tech
- صيغة: `postgresql://user:password@host/database?sslmode=require`

### 2. SESSION_SECRET
- استخدم أي مفتاح طويل وعشوائي
- يمكن توليده بـ: `openssl rand -base64 32`

### 3. WHATSAPP_BUSINESS_ACCOUNT_TOKEN
- اطلب من Meta Business Manager
- الخطوات في: `docs/WHATSAPP_SETUP.md`

### 4. WHATSAPP_PHONE_NUMBER_ID
- معرف رقم WhatsApp من Meta Business

## النشر المستمر (CI/CD)

يتم بشكل تلقائي عند:
- دفع التغييرات إلى GitHub
- تحديث الفروع الرئيسية

## مراقبة التطبيق

### في لوحة Vercel
- اذهب إلى Project > Deployments
- شاهد سجل البناء والأخطاء

### السجلات (Logs)
- اضغط على أي نشر لرؤية تفاصيل البناء
- استخدم Functions لرؤية سجلات التطبيق

## الأداء والتحسينات

### تم الاعتناء به بالفعل:
- ✅ Automatic Image Optimization
- ✅ Code Splitting
- ✅ Static Generation where possible
- ✅ Edge Caching

### نصائح إضافية:
- استخدم Web Analytics من Vercel
- فعّل Security Headers
- استخدم Database Connections Pool

## استكشاف الأخطاء

### خطأ: "Build failed"
1. تحقق من سجل البناء في Vercel
2. تأكد من أن جميع المتغيرات محددة
3. تأكد من توافق Node.js version

### خطأ: "Database Connection Error"
1. تحقق من DATABASE_URL
2. تأكد من إضافة IP Vercel إلى Whitelist (إن لزم)

### خطأ: "Environment variables missing"
1. تحقق من Settings > Environment Variables
2. أعد النشر بعد إضافة المتغيرات

## الدعم والمساعدة

- مستندات Vercel: https://vercel.com/docs
- مستندات Next.js: https://nextjs.org/docs
- مستندات Neon: https://neon.tech/docs
