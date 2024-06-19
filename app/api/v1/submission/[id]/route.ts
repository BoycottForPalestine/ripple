import {
  deleteOrganization,
  getOrganizationById,
  updateOrganization,
} from "@/lib/server/model/organization";

import {
  BadRequestResponse,
  NotFoundResponse,
  UnauthorizedResponse,
} from "@/lib/server/error";
import { NextRequest } from "next/server";
import { getSubmissions } from "@/lib/frontend/api/submissions";
import {
  deleteSubmission,
  getSubmissionById,
} from "@/lib/server/model/submission";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url);
  const query = searchParams;

  const passkey = query.get("passkey");
  if (passkey !== process.env.ADMIN_PASSKEY) {
    return UnauthorizedResponse();
  }

  const result = await getSubmissionById(params.id);

  if (!result) {
    return NotFoundResponse("Submission not found.");
  }

  await deleteSubmission(params.id);

  return Response.json({ success: true });
}
