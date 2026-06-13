# سوق بلادي - Souq Bladi - Security Documentation

## 🔒 Overview

This document outlines the security architecture and best practices for the Souq Bladi e-commerce platform.

## 🛡️ Authentication & Authorization

### User Authentication
- **Provider**: Supabase Auth
- **Methods**:
  - Email/Password
  - Google OAuth
- **Session Management**: Supabase handles session tokens securely
- **Password Requirements**: Enforced by Supabase Auth (minimum 6 characters)

### Admin Authentication
- **Provider**: Supabase Auth
- **Methods**: Email/Password only
- **Role-Based Access Control**: Admin users must be in the `admins` table
- **Session Verification**: Every admin action verifies user session and admin role

### Authentication Flow

#### Admin Login
1. User enters email and password on `admin-login.html`
2. Supabase Auth validates credentials
3. System checks if user email exists in `admins` table
4. If valid, user is redirected to `admin.html`
5. Admin panel verifies session on every page load

#### User Login
1. User enters email and password or uses Google OAuth
2. Supabase Auth validates credentials
3. Session is established
4. User can access shopping features

## 🔐 Database Security

### Supabase Row Level Security (RLS)
- **Orders Table**: Public read/write (for demo purposes)
- **Products Table**: Public read/write (for demo purposes)
- **Admins Table**: Public read/write (for demo purposes)

### ⚠️ Production Recommendations
For production deployment, implement proper RLS policies:

```sql
-- Example: Restrict orders to user's own orders
CREATE POLICY "users_can_view_own_orders" ON orders
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Example: Only admins can modify orders
CREATE POLICY "admins_can_modify_orders" ON orders
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.email = auth.email()
    )
  );
```

## 🚫 Removed Security Risks

### Client-Side Password Authentication
- **Removed**: Hardcoded admin password in JavaScript
- **Removed**: `sessionStorage` based admin authentication
- **Removed**: `localStorage` based admin authentication
- **Replaced With**: Supabase Auth with proper session management

### Facebook Authentication
- **Removed**: Facebook OAuth provider
- **Reason**: Simplified authentication, reduced attack surface
- **Remaining**: Google OAuth and Email/Password

## 🔑 Secrets Management

### Frontend Secrets
- **Supabase URL**: Public (safe to expose)
- **Supabase Anon Key**: Public (safe to expose)
- **No Other Secrets**: All sensitive data handled by Supabase

### Backend Secrets
- **Supabase Service Role Key**: Never exposed to frontend
- **Database Password**: Managed by Supabase
- **Admin Passwords**: Hashed by Supabase Auth

## 📋 Security Best Practices

### For Deployment
1. **Enable RLS**: Implement proper Row Level Security policies
2. **Use Environment Variables**: Store Supabase keys in environment variables
3. **HTTPS Only**: Always deploy over HTTPS
4. **CORS Configuration**: Configure proper CORS settings in Supabase
5. **Rate Limiting**: Implement rate limiting on API endpoints

### For Admin Users
1. **Strong Passwords**: Use complex passwords for admin accounts
2. **2FA**: Enable Two-Factor Authentication (if available)
3. **Limited Access**: Only add trusted emails to `admins` table
4. **Regular Audits**: Review admin access logs regularly

### For Development
1. **Never Commit Secrets**: Do not commit service role keys or passwords
2. **Use .gitignore**: Exclude sensitive files from version control
3. **Test Authentication**: Test all authentication flows before deployment
4. **Security Audits**: Regular security audits of dependencies

## 🔍 Current Security Features

### Implemented
- ✅ Supabase Auth for user authentication
- ✅ Supabase Auth for admin authentication
- ✅ Role-based access control via `admins` table
- ✅ Session verification on admin panel load
- ✅ Error handling for authentication failures
- ✅ No hardcoded passwords in frontend code
- ✅ No client-side admin password authentication

### Recommended for Production
- ⚠️ Implement proper RLS policies
- ⚠️ Add rate limiting
- ⚠️ Enable 2FA for admin accounts
- ⚠️ Implement audit logging
- ⚠️ Add CSRF protection
- ⚠️ Implement content security policy (CSP)

## 🚨 Known Limitations

### Current Implementation
- RLS policies are permissive (allow all) for demo purposes
- No rate limiting implemented
- No audit logging
- No CSRF protection beyond Supabase defaults
- No Content Security Policy (CSP) headers

### Mitigation
- These limitations are acceptable for demo/development
- Must be addressed before production deployment
- See "Recommended for Production" section above

## 📞 Security Incident Response

### If You Suspect a Security Issue
1. **Immediate Action**: Disable affected admin accounts in Supabase
2. **Investigation**: Review access logs in Supabase dashboard
3. **Remediation**: Update passwords and review RLS policies
4. **Notification**: Inform stakeholders if data was compromised

### Reporting Security Vulnerabilities
- Report vulnerabilities through Supabase security channels
- Do not disclose publicly until fixed
- Follow responsible disclosure practices

## 🔄 Security Updates

### Version 2.0.0 (Current)
- Major security refactor
- Removed client-side password authentication
- Implemented Supabase Auth
- Added role-based access control

### Future Improvements
- Implement proper RLS policies
- Add audit logging
- Enable 2FA
- Add rate limiting
- Implement CSP headers

## 📚 Additional Resources

- [Supabase Security Best Practices](https://supabase.com/docs/guides/platform/security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Web Security Guidelines](https://cheatsheetseries.owasp.org/)

---

**Last Updated**: 2025-06-12  
**Version**: 2.0.0
