import { useEffect, useState } from "react";
import {
  deleteOrganization,
  editOrganization,
  getAllOrganizations,
} from "../api/organization";
import {
  Organization,
  OrganizationWithSlug,
} from "@/lib/shared/types/organization";
import seedrandom from "seedrandom";

function getMultipleRandom<T>(arr: T[], num: number, seed: string) {
  // Make it so the daily rotation
  var rng = seedrandom(seed);
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

export function useOrganizations() {
  const [loading, setLoading] = useState(true);
  const [organizations, setOrganizations] = useState<OrganizationWithSlug[]>(
    []
  );
  const [umbrellaOrganizations, setUmbrellaOrganizations] = useState<
    OrganizationWithSlug[]
  >([]);
  const [organizationMap, setOrganizationMap] = useState<
    Record<string, OrganizationWithSlug>
  >({});

  const refreshOrgsList = () => {
    getAllOrganizations()
      .then((response) => {
        const returnedOrgs = response.data;
        setOrganizations(returnedOrgs);

        const umbrellaOrgs = returnedOrgs.filter(
          (org: OrganizationWithSlug) => {
            return org.isUmbrella;
          }
        );
        setUmbrellaOrganizations(umbrellaOrgs);

        const map: Record<string, OrganizationWithSlug> = {};
        returnedOrgs.forEach((org: OrganizationWithSlug) => {
          map[org._id] = org;
        });

        setOrganizationMap(map);
        setLoading(false);
      })
      .catch((e) => {
        setOrganizations([]);
      });
  };

  useEffect(() => {
    refreshOrgsList();
  }, []);

  const editOrg = async (organization: Organization, passkey: string) => {
    await editOrganization(organization, passkey);
    refreshOrgsList();
  };

  const deleteOrg = async (orgId: string, passkey: string) => {
    await deleteOrganization(orgId, passkey);
    refreshOrgsList();
  };

  // Use the current date so that the featured organizations rotate daily
  const dateString = `${new Date().getDate()}.${new Date().getMonth()}`;
  const featuredOrganizations = getMultipleRandom(
    umbrellaOrganizations,
    4,
    dateString
  );

  return {
    loading,
    organizations,
    umbrellaOrganizations,
    featuredOrganizations,
    organizationMap,
    editOrg,
    deleteOrg,
  };
}
