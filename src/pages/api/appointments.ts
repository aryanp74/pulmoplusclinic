import type { APIRoute } from "astro";
import { isEmailConfigured } from "@lib/backend/config";
import { sendClinicEmail } from "@lib/backend/email";
import { json, methodNotAllowed } from "@lib/backend/http";
import { appointmentEmail } from "@lib/backend/templates";
import { ValidationError, validateAppointment } from "@lib/backend/validation";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get("content-type") || "";
    let formData: FormData;

    if (contentType.includes("application/json")) {
      const body = await request.json();
      formData = new FormData();

      const fields = [
        "form_name",
        "visit_type",
        "patient_name",
        "patient_age",
        "phone",
        "whatsapp",
        "email",
        "preferred_language",
        "concern_category",
        "message",
        "preferred_date",
        "preferred_time_window",
        "company"
      ];

      for (const field of fields) {
        const value = body?.[field];
        if (value !== undefined && value !== null && value !== "") {
          formData.set(field, String(value));
        }
      }

      if (body?.contact_consent) {
        formData.set("contact_consent", "on");
      }
    } else {
      formData = await request.formData();
    }

    const submission = validateAppointment(formData);

    if (!isEmailConfigured()) {
      return json(
        {
          ok: true,
          fallback: true,
          message:
            "Online appointment delivery is not configured on this preview. Use the prepared WhatsApp message to send your request to the clinic."
        },
        { status: 202 }
      );
    }

    await sendClinicEmail({
      subject: `PulmoPlus appointment: ${submission.patientName} · ${submission.visitType}`,
      replyTo: submission.email || undefined,
      html: appointmentEmail(submission)
    });

    return json({ ok: true, fallback: false });
  } catch (error) {
    if (error instanceof ValidationError) {
      return json({ ok: false, error: error.message }, { status: error.status });
    }

    if (error instanceof Error) {
      return json(
        {
          ok: true,
          fallback: true,
          message:
            "The request is prepared, but automatic email delivery is not available right now. Please use the WhatsApp and email actions below to send it to the clinic."
        },
        { status: 202 }
      );
    }

    return json(
      {
        ok: false,
        error: "Appointment request could not be submitted right now. Please use WhatsApp or call the clinic."
      },
      { status: 500 }
    );
  }
};

export const ALL: APIRoute = async () => methodNotAllowed(["POST"]);
