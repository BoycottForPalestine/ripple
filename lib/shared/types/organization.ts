export enum OrgCategory {
  Organization = "Organization",
  Union = "Union",
  MutualAid = "Mutual Aid",
}

export type Organization = {
  _id: string;
  name: string;
  tagline: string;
  description: string;
  category: OrgCategory;
  umbrellaOrgId: string | null;
  isUmbrella: boolean;
  logoUrl: string | null;
  joinInstructions: string;
  city: string;
  state: string;
  country: string;
};

export type OrganizationWithSlug = Organization & { slug: string };
