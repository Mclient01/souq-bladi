# سوق بلادي - Souq Bladi - CHANGELOG

## [2.0.0] - 2025-06-12

### 🚀 Security Refactor - Major Update

### 🔒 Security Improvements
- **Removed client-side admin password authentication** - Replaced with Supabase Auth
- **Created dedicated admin login page** (`admin-login.html`) with email/password authentication
- **Added admins table** in Supabase for role-based access control
- **Implemented proper authentication checks** on admin panel load
- **Removed Facebook authentication** - Kept only Google OAuth and Email/Password
- **Improved error handling** for all Supabase requests

### 📝 Changes

#### Configuration
- Removed `ADMIN_PASSWORD` from `js/config.js`
- Removed hardcoded password from `js/admin.js`
- Removed `sessionStorage` and `localStorage` admin authentication
- Configuration now only contains Supabase URL and anon key

#### Authentication
- **New**: `admin-login.html` - Dedicated admin login page
- **Updated**: `admin.js` - Uses Supabase Auth for authentication
- **Updated**: `admin.js` - Checks `admins` table for role verification
- **Removed**: `loginFacebook()` function from `auth.js`
- **Updated**: `auth.js` - Improved error handling

#### Database
- **New**: `admins` table in Supabase for admin role management
- **Updated**: `Supabase_setup.sql` - Added admins table creation

#### Error Handling
- **Improved**: All Supabase requests now have proper try-catch blocks
- **Improved**: User-friendly error messages in admin panel
- **Improved**: Console error logging for debugging

### 🎯 Features Preserved
- ✅ Products management
- ✅ Orders management
- ✅ Real-time order updates
- ✅ Dashboard statistics
- ✅ Google OAuth authentication
- ✅ Email/Password authentication
- ✅ Shopping cart functionality
- ✅ Wishlist functionality
- ✅ Multi-language support
- ✅ Multi-currency support

### 📋 Breaking Changes
- **Admin login now requires Supabase Auth** - Old password-based login removed
- **Admin users must be added to `admins` table** - See `Supabase_setup.sql`
- **Facebook authentication removed** - Users must use Google OAuth or Email/Password

### 🔧 Migration Instructions

1. **Update Supabase Database**
   ```sql
   -- Run the updated Supabase_setup.sql
   -- This creates the admins table
   ```

2. **Add Admin Users**
   ```sql
   -- Add your admin email to the admins table
   INSERT INTO admins (email) VALUES ('your-email@example.com');
   ```

3. **Update Admin Login**
   - Access admin panel via `admin-login.html`
   - Use your Supabase email and password
   - Your email must be in the `admins` table

### 🛡️ Security Notes
- No secrets stored in frontend JavaScript (except Supabase anon key)
- Admin authentication now uses Supabase Auth with proper session management
- Role-based access control via `admins` table
- All admin actions require authenticated session with admin role

---

## [1.0.0] - 2025-06-01

### 🎉 Initial Release
- E-commerce platform for Tunisia
- Multi-language support (Arabic, French, English, German, Spanish, Turkish, Russian, Chinese)
- Multi-currency support with real-time conversion
- Product catalog with categories
- Shopping cart functionality
- Wishlist functionality
- Order tracking
- Admin panel for orders and products management
- Real-time order updates
- Dashboard statistics
- Multiple payment methods (D17, Flouci, PayPal, USDT, etc.)
