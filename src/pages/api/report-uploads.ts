import type { APIRoute } from "astro";
import { isEmailConfigured, isStorageConfigured } from "@lib/backend/config";
import { sendClinicEmail } from "@lib/backend/email";
import { json, methodNotAllowed } from "@lib/backend/http";
import { uploadFiles } from "@lib/backend/storage";
import { reportEmail } from "@lib/backend/templates";
import { ValidationError, validateReportUpload } from "@lib/backend/validation";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const submission = validateReportUpload(formData);

    if (!isEmailConfigured() || !isStorageConfigured()) {
      return json(
        {
          ok: true,
          fallback: true,
          message:
            "Online report delivery is not configured on this preview. Use the WhatsApp and email actions below after confirming with the clinic."
        },
        { status: 202 }
      );
    }

    const uploads = await uploadFiles(submission.files, `reports-${Date.now()}`);

    await sendClinicEmail({
      subject: `PulmoPlus reports: ${submission.patientName} · ${submission.reportType}`,
      replyTo: submission.email || undefined,
      html: reportEmail(submission, uploads)
    });

    return json({ ok: true, fallback: false, uploads });
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
            "The request is prepared, but automatic upload or email delivery is not available right now. Please use the WhatsApp and email actions below."
        },
        { status: 202 }
      );
    }

    return json(
      {
        ok: false,
        error: "Report upload could not be completed right now. Please confirm with the clinic and use WhatsApp as fallback."
      },
      { status: 500 }
    );
  }
};

export const ALL: APIRoute = async () => methodNotAllowed(["POST"]);
