import slugify from "slugify";
import { Organization } from "./types/organization";

/**
 * Parses the database ID from the raw [id] from the URL
 *
 * @param raw_id
 * @returns {string}
 */
export function parseId(raw_id: string): string {
  // Ignore everything before the last -
  return raw_id.substring(raw_id.lastIndexOf("-") + 1);
}

/**
 * Generates the slug from a name.
 * @param name
 * @returns {string}
 */
export function slugifyString(name: string): string {
  return slugify(name, {
    lower: true,
    remove: /[*+~.()'"!:@\/\?#=]/g,
  });
}

/**
 * Generates slug for an organization
 * @param organization
 * @returns {string}
 */
export function getSlugForOrganization(organization: Organization): string {
  return slugifyString(organization.name) + "-" + organization._id.toString();
}
