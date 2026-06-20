export const backendConfig = {
  clinicEmail: import.meta.env.CLINIC_NOTIFICATION_EMAIL || import.meta.env.RESEND_TO_EMAIL || "",
  smtpHost: import.meta.env.SMTP_HOST || "",
  smtpPort: Number(import.meta.env.SMTP_PORT || 465),
  smtpSecure: String(import.meta.env.SMTP_SECURE || "true") === "true",
  smtpUser: import.meta.env.SMTP_USER || "",
  smtpPass: import.meta.env.SMTP_PASS || "",
  resendApiKey: import.meta.env.RESEND_API_KEY || "",
  resendFromEmail: import.meta.env.RESEND_FROM_EMAIL || "",
  cloudinaryCloudName: import.meta.env.CLOUDINARY_CLOUD_NAME || "",
  cloudinaryApiKey: import.meta.env.CLOUDINARY_API_KEY || "",
  cloudinaryApiSecret: import.meta.env.CLOUDINARY_API_SECRET || "",
  cloudinaryFolder: import.meta.env.CLOUDINARY_FOLDER || "pulmoplus"
};

export function isEmailConfigured() {
  return Boolean(
    backendConfig.clinicEmail &&
      (
        (backendConfig.smtpHost &&
          backendConfig.smtpUser &&
          backendConfig.smtpPass) ||
        (backendConfig.resendApiKey && backendConfig.resendFromEmail)
      )
  );
}

export function isStorageConfigured() {
  return Boolean(
    backendConfig.cloudinaryCloudName &&
      backendConfig.cloudinaryApiKey &&
      backendConfig.cloudinaryApiSecret
  );
}
