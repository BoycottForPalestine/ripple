import React from "react";

import { cache } from "react";
import {
  getOrganizationsByCity,
  getOrganizationsByCountry,
  getOrganizationsByState,
} from "@/lib/server/model/organization";
import OrganizationSearchResults from "@/components/organization-search-results";
import { OrganizationWithSlug } from "@/lib/shared/types/organization";

type Params = {
  params: {
    locationType: string;
    location: string;
  };
};

const getSearchResults = cache(
  async (location: string, locationType: string) => {
    try {
      let searchResults = null;
      if (locationType === "city") {
        searchResults = await getOrganizationsByCity(location);
      } else if (locationType === "state") {
        searchResults = await getOrganizationsByState(location);
      } else if (locationType === "country") {
        searchResults = await getOrganizationsByCountry(location);
      } else {
        return [];
      }
      return searchResults;
    } catch (e) {
      return null;
    }
  }
);

export async function generateMetadata({ params }: Params) {
  const { locationType, location } = params;
  return {
    title: ` Search results in ${locationType} of ${location} - Join a Local Org`,
  };
}

export default async function OrganizationSearchResultsView({
  params,
}: Params) {
  const decodedLocation = decodeURIComponent(params.location);
  const decodedLocationType = decodeURIComponent(params.locationType);

  const organizations = (await getSearchResults(
    decodedLocation,
    decodedLocationType
  )) as OrganizationWithSlug[] | null;

  return (
    <OrganizationSearchResults
      location={decodedLocation}
      locationType={decodedLocationType}
      organizations={organizations}
    />
  );
}
