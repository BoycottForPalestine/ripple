import db from "@/lib/server/db/mongo";
import { slugifyString } from "@/lib/shared/slugs";
import { OrgCategory, Organization } from "@/lib/shared/types/organization";
import { ObjectId } from "mongodb";

// - Organization
//   - Name
//   - Description
//   - Category (broad category)
//     - Organization
//     - Union
//     - Mutual Aid
//   - Tags
//     - "Revolutionary"
//     - "Communist"
//     - "Palestine"
//     - "Abolition/Reimagining Police"
//     - "Mutual Aid"
//   - National Affiliate (id that links to national tag)
//   - isUmbrella
//   - joinInstructions (markdown)
//   - city (for local orgs, or "online")
//   - state
//   - country

function getOrganizationSlug(organization: Organization) {
  if (!organization) return null;
  return `${slugifyString(organization.name)}-${organization._id.toString()}`;
}

function withSlug(organization: Organization) {
  return {
    ...organization,
    slug: getOrganizationSlug(organization),
  };
}

async function createOrganization(organization: Omit<Organization, "_id">) {
  const orgsCollection = db.collection("organizations");
  await orgsCollection.insertOne({ ...organization });
}

async function getOrganizationById(orgId: string) {
  const orgsCollection = db.collection("organizations");

  const result = (await orgsCollection.findOne({
    _id: new ObjectId(orgId),
  })) as unknown as Organization | null;

  if (!result) return null;

  return withSlug(result);
}

async function getOrganizationsByCity(city: string) {
  const orgsCollection = db.collection("organizations");

  const results = (await orgsCollection
    .find({ city })
    .toArray()) as unknown as Organization[];

  return results.map(withSlug);
}

async function getOrganizationsByState(state: string) {
  const orgsCollection = db.collection("organizations");

  const results = (await orgsCollection
    .find({ state })
    .toArray()) as unknown as Organization[];

  return results.map(withSlug);
}

async function getOrganizationsByCountry(country: string) {
  const orgsCollection = db.collection("organizations");

  const results = (await orgsCollection
    .find({ country })
    .sort({ isUmbrella: -1 })
    .toArray()) as unknown as Organization[];

  return results.map(withSlug);
}

async function updateOrganization(
  orgId: string,
  organization: Omit<Organization, "_id">
) {
  const orgsCollection = db.collection("organizations");

  await orgsCollection.updateOne(
    { _id: new ObjectId(orgId) },
    { $set: organization }
  );
}

async function getAllOrganizations() {
  const orgsCollection = db.collection("organizations");

  const results = (await orgsCollection
    .find()
    .toArray()) as unknown as Organization[];

  return results.map(withSlug);
}

async function getAllUmbrellaOrganizations() {
  const orgsCollection = db.collection("organizations");

  const results = (await orgsCollection
    .find({ isUmbrella: true })
    .toArray()) as unknown as Organization[];

  return results.map(withSlug);
}

async function deleteOrganization(orgId: string) {
  const orgsCollection = db.collection("organizations");

  await orgsCollection.deleteOne({ _id: new ObjectId(orgId) });
}

export {
  createOrganization,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
  getAllOrganizations,
  getAllUmbrellaOrganizations,
  getOrganizationsByCity,
  getOrganizationsByState,
  getOrganizationsByCountry,
};
