import nodemailer from "nodemailer";
import { backendConfig, isEmailConfigured } from "./config";

type EmailPayload = {
  to?: string | string[];
  html: string;
  subject: string;
  replyTo?: string;
};

export async function sendEmail(payload: EmailPayload) {
  if (!isEmailConfigured()) {
    throw new Error("Email provider is not configured.");
  }

  const recipients = payload.to || backendConfig.clinicEmail;

  if (backendConfig.smtpHost && backendConfig.smtpUser && backendConfig.smtpPass) {
    const transporter = nodemailer.createTransport({
      host: backendConfig.smtpHost,
      port: backendConfig.smtpPort,
      secure: backendConfig.smtpSecure,
      auth: {
        user: backendConfig.smtpUser,
        pass: backendConfig.smtpPass
      }
    });

    await transporter.sendMail({
      from: backendConfig.smtpUser,
      to: recipients,
      subject: payload.subject,
      html: payload.html,
      replyTo: payload.replyTo
    });

    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${backendConfig.resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: backendConfig.resendFromEmail,
      to: Array.isArray(recipients) ? recipients : [recipients],
      subject: payload.subject,
      html: payload.html,
      reply_to: payload.replyTo
    })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend request failed: ${body}`);
  }
}

export async function sendClinicEmail(payload: EmailPayload) {
  return sendEmail({
    ...payload,
    to: backendConfig.clinicEmail
  });
}
