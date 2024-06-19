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
import Joi from "joi";
import { OrgCategory } from "@/lib/shared/types/organization";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const result = await getOrganizationById(params.id);

  if (!result) {
    return NotFoundResponse("Organization not found.");
  }
  return Response.json(result);
}

const organizationPatchSchema = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  tagline: Joi.string().required(),
  category: Joi.string()
    .valid(OrgCategory.Organization, OrgCategory.Union, OrgCategory.MutualAid)
    .required(),
  umbrellaOrgId: Joi.string().allow(null),
  isUmbrella: Joi.boolean().required(),
  logoUrl: Joi.string().allow(""),
  joinInstructions: Joi.string().required(),
  city: Joi.string().allow(""),
  state: Joi.string().allow(""),
  country: Joi.string().allow(""),
  passkey: Joi.string().required(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  if (body.passkey !== process.env.ADMIN_PASSKEY) {
    return UnauthorizedResponse();
  }

  const result = await getOrganizationById(params.id);

  if (!result) {
    return NotFoundResponse("Organization not found.");
  }

  try {
    await organizationPatchSchema.validateAsync(body);

    if (!body.city && !body.state && !body.country) {
      throw new Error("Must provide city, state, or country");
    }
  } catch (e: any) {
    return BadRequestResponse(e.message);
  }

  const updatedOrganization = {
    name: body.name,
    tagline: body.tagline,
    description: body.description,
    category: body.category,
    umbrellaOrgId: body.umbrellaOrgId,
    isUmbrella: body.isUmbrella,
    joinInstructions: body.joinInstructions,
    logoUrl: body.logoUrl,
    city: body.city,
    state: body.state,
    country: body.country,
  };

  await updateOrganization(params.id, updatedOrganization);

  return Response.json({ success: true });
}

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

  const result = await getOrganizationById(params.id);

  if (!result) {
    return NotFoundResponse("Organization not found.");
  }

  await deleteOrganization(params.id);

  return Response.json({ success: true });
}
