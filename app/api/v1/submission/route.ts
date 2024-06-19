import { BadRequestResponse } from "@/lib/server/error";
import {
  createSubmission,
  getAllSubmissions,
} from "@/lib/server/model/submission";
import Joi from "joi";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return Response.json(await getAllSubmissions());
}

const submissionPostSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  joinInstructions: Joi.string().required(),
  city: Joi.string().allow(""),
  state: Joi.string().allow(""),
  country: Joi.string().allow(""),
  linkToSocial: Joi.string().required(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    await submissionPostSchema.validateAsync(body);

    if (!body.city && !body.state && !body.country) {
      throw new Error("Must provide city, state, or country");
    }
  } catch (e: any) {
    return BadRequestResponse(e.message);
  }

  const newSubmission = {
    name: body.name,
    description: body.description,
    joinInstructions: body.joinInstructions,
    city: body.city,
    state: body.state,
    country: body.country,
    linkToSocial: body.linkToSocial,
  };
  await createSubmission(newSubmission);
  return Response.json({ success: true });
}
