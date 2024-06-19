import { BadRequestResponse, UnauthorizedResponse } from "@/lib/server/error";
import {
  createOrganization,
  getAllOrganizations,
  getAllUmbrellaOrganizations,
  getOrganizationsByState,
  getOrganizationsByCity,
  getOrganizationsByCountry,
} from "@/lib/server/model/organization";
import { OrgCategory } from "@/lib/shared/types/organization";
import Joi from "joi";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams;

  const city = query.get("city");
  const state = query.get("state");
  const country = query.get("country");
  const isUmbrella = query.get("isUmbrella") === "true";

  if (city) {
    return Response.json(await getOrganizationsByCity(city));
  }
  if (state) {
    return Response.json(await getOrganizationsByState(state));
  }
  if (country) {
    return Response.json(await getOrganizationsByCountry(country));
  }

  if (isUmbrella) {
    return Response.json(await getAllUmbrellaOrganizations());
  }

  return Response.json(await getAllOrganizations());
}

const organizationPostSchema = Joi.object({
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

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (body.passkey !== process.env.ADMIN_PASSKEY) {
    return UnauthorizedResponse();
  }

  try {
    await organizationPostSchema.validateAsync(body);

    if (!body.city && !body.state && !body.country) {
      throw new Error("Must provide city, state, or country");
    }
  } catch (e: any) {
    return BadRequestResponse(e.message);
  }

  const newOrganization = {
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
  await createOrganization(newOrganization);
  return Response.json({ success: true });
}
