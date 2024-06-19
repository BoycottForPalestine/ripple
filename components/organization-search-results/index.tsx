import {
  Organization,
  OrganizationWithSlug,
} from "@/lib/shared/types/organization";
import PageContainer from "../common/PageContainer";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OrganizationCard from "../OrganizationCard";
import Link from "next/link";

interface OrganizationSearchResultsProps {
  location: string;
  locationType: string;
  organizations: OrganizationWithSlug[] | null;
}

export default function OrganizationSearchResults({
  location,
  locationType,
  organizations,
}: OrganizationSearchResultsProps) {
  return (
    <PageContainer>
      <Box sx={{ m: "16px" }}>
        <Box>
          <Link href="/">
            <Button startIcon={<ArrowBackIcon />}>Back to Search</Button>
          </Link>
        </Box>
        <Typography variant="h6">
          Search Results for {locationType} of {location}
        </Typography>
      </Box>
      <Box>
        {organizations === null && (
          <Typography>No organizations found</Typography>
        )}
        {organizations !== null &&
          organizations.map((org) => (
            <Box key={org._id} sx={{ m: "16px" }}>
              <OrganizationCard organization={org} />
            </Box>
          ))}
      </Box>
    </PageContainer>
  );
}
