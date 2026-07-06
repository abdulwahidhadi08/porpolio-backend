# Portfolio Backend

This is the backend API server for the Professional Portfolio, built with Node.js, Express, and MongoDB.

## Features

- **Dynamic Projects & Skills**: Serves project logs and skill categories stored in database.
- **Robust Fallback Engine**: If MongoDB is offline, it automatically saves/reads from local JSON files (`data/projects.json`, `data/skills.json`, `data/messages.json`), guaranteeing zero-downtime during preview.
- **Nodemailer Alerts**: Sends real-time email notifications on new contact form submissions.
- **Input Validation**: Uses `express-validator` to sanitize and validate incoming form submissions.
- **Security Protections**: Configured with `helmet` for secure HTTP headers, `cors` for cross-origin access control, and `express-rate-limit` to prevent spam form submissions.

## Getting Started

### 1. Environment Configuration

Copy the example environment file and edit the variables with your configurations:

```bash
cp .env.example .env
```

To enable email notifications, configure the SMTP settings:
- **SMTP_HOST**: SMTP host provider (e.g. `smtp.gmail.com`)
- **SMTP_PORT**: SMTP port (e.g. `587` or `465`)
- **SMTP_USER**: Your sending email address (e.g. your Gmail)
- **SMTP_PASS**: Your email's App Password (Google App Passwords for Gmail)
- **EMAIL_TO**: The destination email address where you want to receive messages

### 2. Install Dependencies

Install packages:

```bash
npm install
```

### 3. Database Seeding

To seed your database or local fallback files with default projects and skills, run a POST request to the `/api/seed` route. You can do this by running:

```bash
curl -X POST http://localhost:5000/api/seed
```

Or you can let the application seed itself automatically on its first API request.

### 4. Running the Server

#### Development Mode (with hot-reloading)
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```
