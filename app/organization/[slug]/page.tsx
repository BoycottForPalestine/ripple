import React from "react";

import { notFound, permanentRedirect } from "next/navigation";
import { parseId } from "@/lib/shared/slugs";

import Organization from "@/components/organization";

import { cache } from "react";
import { getOrganizationById } from "@/lib/server/model/organization";

type Params = {
  params: {
    slug: string;
  };
};

const getOrganizationData = cache(async (slug: string) => {
  const orgId = parseId(slug);
  try {
    const result = await getOrganizationById(orgId);
    return result;
  } catch (e) {
    return null;
  }
});

export async function generateMetadata({ params }: Params) {
  const organization = await getOrganizationData(params.slug);
  return {
    title: `${organization?.name} - Join a Local Org`,
    description: organization?.tagline,
  };
}

export default async function OrganizationView({ params }: Params) {
  const orgData = await getOrganizationData(params.slug);
  let umbrellaOrg = null;

  if (orgData === null) {
    return notFound();
  }
  // Redirect to canonical URL if slug is outdated, e.g. due to a name change
  if (!orgData.slug) {
    return notFound();
  }

  if (orgData.umbrellaOrgId) {
    umbrellaOrg = await getOrganizationById(orgData.umbrellaOrgId);
  }

  if (encodeURIComponent(orgData.slug) !== params.slug) {
    return permanentRedirect(`/organization/${orgData.slug}`);
  }
  const organization = {
    ...orgData,
    _id: orgData._id.toString(),
  };
  return (
    <Organization
      organizationData={organization}
      umbrellaOrgData={umbrellaOrg}
    />
  );
}
