import { Organization } from "./types/organization";
import { Submission } from "./types/submission";

export function buildLocation(organization: Organization | Submission) {
  if (organization.city && organization.state) {
    return `${organization.city}, ${organization.state}`;
  } else if (organization.city) {
    return organization.city;
  } else if (organization.state) {
    return organization.state;
  } else {
    return organization.country;
  }
}
