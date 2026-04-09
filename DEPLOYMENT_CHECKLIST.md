# ✅ قائمة التحقق قبل النشر على Vercel

## المرحلة 1: التحضير المحلي

- [ ] تم اختبار التطبيق محلياً بـ `pnpm dev`
- [ ] لا توجد أخطاء في الـ console
- [ ] تم التحقق من `.env.development.local` يحتوي على جميع البيانات المطلوبة
- [ ] تم قراءة وثيقة `docs/DEPLOYMENT.md`
- [ ] تم قراءة وثيقة `docs/WHATSAPP_SETUP.md`

## المرحلة 2: إعداد Vercel

### حساب Vercel
- [ ] أنشأت حساب على https://vercel.com
- [ ] ربطت حساب GitHub الخاص بي

### إنشاء المشروع
- [ ] دفعت المشروع إلى GitHub (branch: master أو main)
- [ ] ذهبت إلى Vercel وضغطت "New Project"
- [ ] اختخرت المستودع `real-estate-ta`

## المرحلة 3: متغيرات البيئة

في Vercel Settings > Environment Variables أضفت:

### متطلب
- [ ] `DATABASE_URL` = URL قاعدة بيانات Neon
  - الحصول منها: https://console.neon.tech
  - الصيغة: `postgresql://user:password@host/database?sslmode=require`
  
- [ ] `SESSION_SECRET` = مفتاح عشوائي طويل
  - مثال: `openssl rand -base64 32`

### اختياري (إذا أردت تفعيل WhatsApp OTP)
- [ ] `WHATSAPP_BUSINESS_ACCOUNT_TOKEN` = توكن Meta
- [ ] `WHATSAPP_PHONE_NUMBER_ID` = معرف الرقم من WhatsApp

- [ ] `NODE_ENV` = `production`

## المرحلة 4: النشر

- [ ] تحققت من أن جميع المتغيرات صحيحة
- [ ] ضغطت زر "Deploy" في Vercel
- [ ] انتظرت 2-3 دقائق حتى يتم البناء
- [ ] شاهدت سجل البناء وتأكدت من النجاح

## المرحلة 5: التحقق الأولي

- [ ] فتحت URL الحي من Vercel
- [ ] جربت صفحة التسجيل
- [ ] جربت صفحة الدخول
- [ ] فحصت لوحة التحكم

## المرحلة 6: WhatsApp (اختياري)

إذا أردت تفعيل التحقق عبر WhatsApp:

- [ ] سجلت حساب في https://business.facebook.com/
- [ ] أنشأت تطبيق WhatsApp Business
- [ ] حصلت على `PHONE_NUMBER_ID`
- [ ] حصلت على `ACCESS_TOKEN`
- [ ] أضفت المتغيرات في Vercel
- [ ] أعدت نشر المشروع

## استكشاف الأخطاء

### خطأ: "Build failed"
1. افتح Logs من Vercel
2. تحقق من العقد المتصلة بـ package.json
3. تأكد من TypeScript valid

### خطأ: "Database connection error"
1. تحقق من `DATABASE_URL`
2. تأكد أن IP Vercel مضافة إلى Whitelist (إن لزم الأمر)

### خطأ: "Environment variables missing"
1. عد إلى Settings > Environment Variables
2. تأكد من إضافة جميع المتغيرات
3. أعد النشر

## روابط مهمة

- Vercel Project: https://vercel.com/dashboard
- Database (Neon): https://console.neon.tech
- WhatsApp Business: https://business.facebook.com/
- GitHub Repository: https://github.com/amr586/real-estate-ta

---

✅ بعد اتمام جميع الخطوات، المشروع سيكون جاهزاً للعمل الفعلي!
