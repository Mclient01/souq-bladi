# 🛍️ سوق بلادي - Souq Bladi

منصة تجارة إلكترونية حديثة متعددة اللغات مع لوحة تحكم إدارية متكاملة.

A modern multilingual e-commerce platform with a complete admin dashboard.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Languages](https://img.shields.io/badge/languages-8-purple.svg)

## ✨ المميزات / Features

### للمستخدمين / For Users
- 🌍 **دعم 8 لغات**: العربية، الإنجليزية، الفرنسية، الألمانية، الإسبانية، التركية، الروسية، الصينية
- 🔐 **تسجيل الدخول الآمن**: عبر Google أو البريد الإلكتروني
- 🛒 **سلة مشتريات ذكية**: إضافة وإزالة المنتجات بسهولة
- ❤️ **قائمة المفضلة**: حفظ المنتجات المفضلة
- 📦 **تتبع الطلبات**: متابعة حالة الطلب في الوقت الفعلي
- 💳 **طرق دفع متعددة**: الدفع عند الاستلام، D17، وغيرها
- 📱 **تصميم متجاوب**: يعمل على جميع الأجهزة (موبايل، تابلت، ديسكتوب)
- 🔔 **إشعارات فورية**: تحديثات حالة الطلب

### للمشرفين / For Admins
- 🎛️ **لوحة تحكم متكاملة**: إدارة الطلبات والمنتجات
- 📊 **إحصائيات مفصلة**: الإيرادات، الطلبات، المنتجات، طرق الدفع
- 📦 **إدارة الطلبات**: تأكيد، شحن، تسليم، إلغاء الطلبات
- 🛍️ **إدارة المنتجات**: إضافة وتعديل وحذف المنتجات
- 🔔 **إشعارات فورية**: تنبيهات الطلبات الجديدة
- 🌍 **دعم متعدد اللغات**: لوحة التحكم تدعم جميع اللغات
- 🔐 **حماية Supabase Auth**: مصادقة آمنة للمشرفين

## 🚀 طريقة التثبيت / Installation

### المتطلبات / Prerequisites
- Node.js (اختياري - للتطوير)
- حساب Supabase (مطلوب)
- متصفح حديث (Chrome, Firefox, Safari, Edge)

### الخطوات / Steps

1. **استنساخ المشروع / Clone the repository**
   ```bash
   git clone https://github.com/yourusername/souq-bladi.git
   cd souq-bladi
   ```

2. **إعداد Supabase / Setup Supabase**
   - أنشئ مشروع جديد في [Supabase](https://supabase.com)
   - انسخ `SUPABASE_URL` و `SUPABASE_KEY` من إعدادات المشروع
   - قم بتنفيذ ملف `Supabase_setup.sql` في SQL Editor لإنشاء الجداول المطلوبة

3. **تكوين المشروع / Configure the project**
   - افتح ملف `js/config.js`
   - استبدل `SUPABASE_URL` و `SUPABASE_KEY` بقيمك الخاصة

4. **تشغيل المشروع / Run the project**
   - افتح `index.html` في المتصفح
   - أو استخدم خادم محلي:
     ```bash
     # باستخدام Python
     python -m http.server 8000
     
     # باستخدام Node.js
     npx serve
     ```

## ⚙️ إعداد Supabase / Supabase Setup

### 1. إنشاء المشروع / Create Project
1. سجل الدخول إلى [Supabase](https://supabase.com)
2. أنشئ مشروع جديد
3. انتظر حتى يتم إنشاء المشروع (قد يستغرق دقيقتين)

### 2. تنفيذ SQL / Execute SQL
1. افتح SQL Editor في Supabase
2. انسخ محتوى ملف `Supabase_setup.sql`
3. الصقه في SQL Editor
4. اضغط على "Run" لتنفيذ الاستعلامات

### 3. الحصول على المفاتيح / Get Keys
1. اذهب إلى Project Settings > API
2. انسخ `Project URL` و `anon public key`
3. الصقها في ملف `js/config.js`

### 4. إنشاء حساب مشرف / Create Admin Account
1. افتح SQL Editor في Supabase
2. نفذ الاستعلام التالي:
   ```sql
   INSERT INTO admins (email, created_at)
   VALUES ('your-email@example.com', NOW());
   ```
3. استبدل `your-email@example.com` ببريدك الإلكتروني
4. سجل الدخول في [Supabase Auth](https://supabase.com/dashboard/project/_/auth/users)
5. أنشئ حساب للمستخدم باستخدام نفس البريد الإلكتروني
6. اضبط كلمة المرور

## 🎨 طريقة تغيير الشعار / How to Change Logo

### 1. تغيير شعار المتجر / Change Store Logo
1. افتح ملف `index.html`
2. ابحث عن `<div class="logo">`
3. استبدل النص أو الصورة بشعارك الخاص:
   ```html
   <div class="logo">
     <img src="your-logo.png" alt="Your Store Name">
   </div>
   ```

### 2. تغيير شعار لوحة التحكم / Change Admin Logo
1. افتح ملف `admin.html`
2. ابحث عن `<div class="sb-logo">`
3. استبدل النص:
   ```html
   <div class="sb-logo">
     <h1>🇹🇳 Your Store Name</h1>
   </div>
   ```

### 3. تغيير Favicon / Change Favicon
1. ضع ملف `favicon.ico` في المجلد الرئيسي
2. افتح ملف `index.html` و `admin.html`
3. أضف السطر التالي في `<head>`:
   ```html
   <link rel="icon" href="favicon.ico" type="image/x-icon">
   ```

## 🛍️ طريقة إضافة المنتجات / How to Add Products

### عبر لوحة التحكم / Via Admin Dashboard

1. **تسجيل الدخول / Login**
   - افتح `admin.html`
   - أدخل كلمة المرور
   - اضغط على "دخول"

2. **إضافة منتج جديد / Add New Product**
   - اضغط على "➕ إضافة منتج" في القائمة الجانبية
   - املأ النموذج:
     - **اسم المنتج بالعربية**: اسم المنتج
     - **وصف المنتج**: وصف مختصر
     - **السعر الحالي (د.ت)**: السعر
     - **السعر القديم (د.ت)**: السعر الأصلي (اختياري)
     - **الفئة**: اختر الفئة المناسبة
     - **الكمية**: عدد الوحدات المتاحة
     - **رابط الصورة**: رابط صورة المنتج (اختياري)
   - اضغط على "➕ حفظ المنتج"

### عبر Supabase / Via Supabase

1. افتح Table Editor في Supabase
2. اختر جدول `products`
3. اضغط على "Insert row"
4. املأ البيانات:
   - `name_ar`: اسم المنتج بالعربية
   - `description_ar`: وصف المنتج
   - `price_tnd`: السعر بالدينار التونسي
   - `old_price_tnd`: السعر القديم (اختياري)
   - `category`: الفئة (electronics, fashion, home, beauty, sports, kids)
   - `stock`: الكمية المتاحة
   - `image_url`: رابط الصورة (اختياري)
   - `active`: اضبطه على `true`
5. اضغط على "Save"

## 👨‍💼 طريقة إنشاء حساب مشرف / How to Create Admin Account

### الطريقة 1: عبر SQL / Via SQL

1. افتح SQL Editor في Supabase
2. نفذ الاستعلام التالي:
   ```sql
   INSERT INTO admins (email, created_at)
   VALUES ('admin@example.com', NOW());
   ```

3. افتح Authentication > Users في Supabase
4. اضغط على "Add user"
5. أدخل البريد الإلكتروني نفسه
6. اضبط كلمة المرور
7. اضغط على "Create user"

### الطريقة 2: عبر لوحة تحكم Supabase / Via Supabase Dashboard

1. افتح Table Editor في Supabase
2. اختر جدول `admins`
3. اضغط على "Insert row"
4. أدخل البريد الإلكتروني
5. اضغط على "Save"

6. افتح Authentication > Users
7. اضغط على "Add user"
8. أدخل نفس البريد الإلكتروني
9. اضبط كلمة المرور
10. اضغط على "Create user"

## 📁 هيكل المشروع / Project Structure

```
souq-bladi/
├── index.html              # الصفحة الرئيسية
├── admin.html              # لوحة التحكم
├── admin-login.html        # صفحة تسجيل دخول المشرف
├── css/
│   └── style.css           # الأنماط
├── js/
│   ├── config.js           # إعدادات Supabase
│   ├── app.js              # وظائف التطبيق الرئيسية
│   ├── auth.js             # وظائف المصادقة
│   └── admin.js            # وظائف لوحة التحكم
├── Supabase_setup.sql      # إعداد قاعدة البيانات
├── README.md               # هذا الملف
├── LICENSE                 # رخصة المشروع
├── CHANGELOG.md            # سجل التغييرات
└── SECURITY.md             # سياسة الأمان
```

## 🌍 اللغات المدعومة / Supported Languages

- 🇹🇳 العربية (Arabic)
- 🇬🇧 English
- 🇫🇷 Français (French)
- 🇩🇪 Deutsch (German)
- 🇪🇸 Español (Spanish)
- 🇹🇷 Türkçe (Turkish)
- 🇷🇺 Русский (Russian)
- 🇨🇳 中文 (Chinese)

## 📊 التقنيات المستخدمة / Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Supabase (PostgreSQL, Auth, Realtime)
- **Authentication**: Supabase Auth + Google OAuth
- **Database**: PostgreSQL via Supabase
- **Real-time**: Supabase Realtime Subscriptions
- **Styling**: Custom CSS with Responsive Design

## 🔒 الأمان / Security

- مصادقة Supabase Auth آمنة
- حماية لوحة التحكم عبر التحقق من صلاحيات المشرف
- تشفير كلمات المرور
- حماية CSRF
- راجع ملف `SECURITY.md` للمزيد من التفاصيل

## 📝 الترخيص / License

هذا المشروع مرخص تحت رخصة MIT. راجع ملف `LICENSE` للمزيد من التفاصيل.

This project is licensed under the MIT License. See the `LICENSE` file for details.

## 🤝 المساهمة / Contributing

نرحب بالمساهمات! يرجى اتباع الخطوات التالية:

1. Fork المشروع
2. أنشئ فرع للميزة (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push إلى الفرع (`git push origin feature/AmazingFeature`)
5. افتح Pull Request

## 📞 الدعم / Support

إذا واجهت أي مشاكل أو كان لديك أسئلة:
- افتح Issue في GitHub
- أو تواصل معنا عبر البريد الإلكتروني: support@souqbladi.tn

## 🙏 شكر وتقدير / Acknowledgments

- [Supabase](https://supabase.com) - Backend as a Service
- [Google Fonts](https://fonts.google.com) - Cairo Font
- جميع المساهمين في المشروع

---

**صنع بـ ❤️ في تونس / Made with ❤️ in Tunisia**
