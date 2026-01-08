// src/lib/mail/transporter.js
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify on server startup
transporter.verify((err) => {
  if (err) {
    console.error("❌ SMTP Error:", err.message);
  } else {
    console.log("✅ SMTP Server Ready");
  }
});
