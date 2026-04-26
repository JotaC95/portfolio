# Portfolio Setup Guide

## Backend Configuration (Contact Form)

The portfolio now includes a functional contact form that sends emails directly from your portfolio. Follow these steps to set it up:

### 1. Gmail Configuration

You need to create an **App Password** for your Gmail account:

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if not already enabled
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Select "Mail" and "Windows Computer" (or your device)
5. Copy the 16-character password provided by Google

### 2. Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
PORT=5000
VITE_API_URL=http://localhost:5000
```

**⚠️ Important:** Never commit your `.env` file to git. It's already in `.gitignore`.

### 3. Running the Server

#### Development (Both Frontend + Backend)
```bash
npm run dev:all
```

This starts:
- Backend server on `http://localhost:5000`
- Frontend on `http://localhost:5173`

#### Backend Only
```bash
npm run dev:server
```

#### Frontend Only
```bash
npm run dev
```

### 4. Testing the Contact Form

1. Start the server with `npm run dev:all`
2. Navigate to the contact section
3. Fill out the form and submit
4. You should receive an email at your configured email address

## Features Added

✅ **Functional Contact Form** - Send emails directly from your portfolio
✅ **Scroll Animations** - Using AOS library for smooth on-scroll effects
✅ **Improved Accessibility** - Theme toggle buttons have proper aria-labels
✅ **Blog Section Removed** - Cleaner, more focused portfolio

## Deployment Notes

For production deployment:

1. Use environment variables from your hosting provider (Vercel, Netlify, etc.)
2. Update `VITE_API_URL` to point to your production backend URL
3. Deploy backend and frontend separately:
   - Backend: Traditional Node.js hosting (Heroku, Railway, etc.)
   - Frontend: Static hosting (Vercel, Netlify, etc.)

### Alternative Email Services

If you want to use a different email service:

1. **SendGrid**: Replace nodemailer transport in `server.js`
2. **Mailgun**: Similar configuration change
3. **Brevo/Sendinblue**: Update transporter settings

See Nodemailer docs for configuration examples.
