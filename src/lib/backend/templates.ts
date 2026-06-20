type AppointmentPayload = {
  concernCategory: string;
  email: string;
  message: string;
  normalizedPhone: string;
  normalizedWhatsapp: string;
  patientAge: string;
  patientName: string;
  preferredDate: string;
  preferredLanguage: string;
  preferredTimeWindow: string;
  visitType: string;
};

type ReportPayload = {
  appointmentDate: string;
  email: string;
  message: string;
  normalizedPhone: string;
  patientName: string;
  reportType: string;
};

export function appointmentEmail(payload: AppointmentPayload) {
  return `
    <h1>New appointment request</h1>
    <p><strong>Name:</strong> ${payload.patientName}</p>
    <p><strong>Age:</strong> ${payload.patientAge}</p>
    <p><strong>Phone:</strong> ${payload.normalizedPhone}</p>
    <p><strong>WhatsApp:</strong> ${payload.normalizedWhatsapp || "Same as phone"}</p>
    <p><strong>Email:</strong> ${payload.email || "Not provided"}</p>
    <p><strong>Visit type:</strong> ${payload.visitType}</p>
    <p><strong>Main concern:</strong> ${payload.concernCategory}</p>
    <p><strong>Preferred language:</strong> ${payload.preferredLanguage}</p>
    <p><strong>Check availability from:</strong> ${payload.preferredDate}</p>
    <p><strong>Consultation slot:</strong> ${payload.preferredTimeWindow}</p>
    <p><strong>Message:</strong><br/>${payload.message || "None"}</p>
  `;
}

export function reportEmail(payload: ReportPayload, uploads: Array<{ name: string; url: string }>) {
  const files = uploads
    .map((file) => `<li><a href="${file.url}">${file.name}</a></li>`)
    .join("");

  return `
    <h1>New report upload request</h1>
    <p><strong>Name:</strong> ${payload.patientName}</p>
    <p><strong>Phone:</strong> ${payload.normalizedPhone}</p>
    <p><strong>Email:</strong> ${payload.email || "Not provided"}</p>
    <p><strong>Appointment date:</strong> ${payload.appointmentDate || "Not provided"}</p>
    <p><strong>Report type:</strong> ${payload.reportType}</p>
    <p><strong>Message:</strong><br/>${payload.message || "None"}</p>
    <p><strong>Uploaded files:</strong></p>
    <ul>${files}</ul>
  `;
}
