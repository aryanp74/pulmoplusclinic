import { clinic } from "@data/site";

const PHONE_REGEX = /^[0-9 +()-]{10,20}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class ValidationError extends Error {
  status = 422;
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new ValidationError(message);
}

function getString(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

export function validateAppointment(formData: FormData) {
  const submission = {
    formName: getString(formData, "form_name"),
    visitType: getString(formData, "visit_type"),
    patientName: getString(formData, "patient_name"),
    patientAge: getString(formData, "patient_age"),
    phone: getString(formData, "phone"),
    whatsapp: getString(formData, "whatsapp"),
    email: getString(formData, "email"),
    preferredLanguage: getString(formData, "preferred_language"),
    concernCategory: getString(formData, "concern_category"),
    message: getString(formData, "message"),
    preferredDate: getString(formData, "preferred_date"),
    preferredTimeWindow: getString(formData, "preferred_time_window"),
    consent: formData.get("contact_consent"),
    honeypot: getString(formData, "company")
  };

  assert(!submission.honeypot, "Invalid request.");
  assert(submission.formName, "Form name missing.");
  assert(submission.visitType, "Visit type is required.");
  assert(submission.patientName.length >= 2 && submission.patientName.length <= 80, "Patient name is invalid.");
  assert(Number(submission.patientAge) >= 0 && Number(submission.patientAge) <= 120, "Patient age is invalid.");
  assert(PHONE_REGEX.test(submission.phone), "Phone number is invalid.");
  assert(!submission.whatsapp || PHONE_REGEX.test(submission.whatsapp), "WhatsApp number is invalid.");
  assert(!submission.email || EMAIL_REGEX.test(submission.email), "Email address is invalid.");
  assert(submission.preferredLanguage, "Preferred language is required.");
  assert(submission.concernCategory, "Main concern is required.");
  assert(submission.preferredDate, "Preferred date is required.");
  assert(submission.preferredTimeWindow, "Preferred time window is required.");
  assert(
    submission.preferredTimeWindow === clinic.dailyConsultationSlot,
    "Consultation slot is invalid."
  );
  assert(submission.message.length <= 1000, "Message is too long.");
  assert(submission.consent, "Consent is required.");

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const preferredDate = new Date(`${submission.preferredDate}T00:00:00`);
  assert(!Number.isNaN(preferredDate.valueOf()) && preferredDate >= today, "Preferred date must be today or later.");

  return {
    ...submission,
    normalizedPhone: submission.phone.replace(/[^\d+]/g, ""),
    normalizedWhatsapp: submission.whatsapp.replace(/[^\d+]/g, "")
  };
}

export function validateReportUpload(formData: FormData) {
  const submission = {
    formName: getString(formData, "form_name"),
    patientName: getString(formData, "patient_name"),
    phone: getString(formData, "phone"),
    email: getString(formData, "email"),
    appointmentDate: getString(formData, "appointment_date"),
    reportType: getString(formData, "report_type"),
    message: getString(formData, "message"),
    consent: formData.get("report_consent"),
    honeypot: getString(formData, "company"),
    files: formData.getAll("reports").filter((value): value is File => value instanceof File && value.size > 0)
  };

  assert(!submission.honeypot, "Invalid request.");
  assert(submission.formName, "Form name missing.");
  assert(submission.patientName.length >= 2 && submission.patientName.length <= 80, "Patient name is invalid.");
  assert(PHONE_REGEX.test(submission.phone), "Phone number is invalid.");
  assert(!submission.email || EMAIL_REGEX.test(submission.email), "Email address is invalid.");
  assert(submission.reportType, "Report type is required.");
  assert(submission.message.length <= 1000, "Message is too long.");
  assert(submission.consent, "Consent is required.");
  assert(submission.files.length > 0, "At least one file is required.");
  assert(submission.files.length <= 5, "Upload up to 5 files per request.");

  const allowedTypes = new Set(["application/pdf", "image/jpeg", "image/png"]);
  const maxFileSize = 10 * 1024 * 1024;

  for (const file of submission.files) {
    assert(allowedTypes.has(file.type), "Only PDF, JPG and PNG files are allowed.");
    assert(file.size <= maxFileSize, "Files must be 10 MB or smaller.");
  }

  return {
    ...submission,
    normalizedPhone: submission.phone.replace(/[^\d+]/g, "")
  };
}
