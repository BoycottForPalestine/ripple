"use client";

import OrganizationCard from "@/components/OrganizationCard";
import PageContainer from "@/components/common/PageContainer";
import { searchOptions } from "@/lib/frontend/data/search-options";
import { useOrganizations } from "@/lib/frontend/hooks/useOrganizations";
import { Box, Button, Divider, Typography } from "@mui/material";

import { Autocomplete, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

// This is what's stored in the combobox
type AutocompleteResult = {
  label: string;
  locationType: "city" | "state" | "country";
};

interface SearchBoxProps {
  onSelect: (selection: AutocompleteResult) => void;
}

function SearchBox({ onSelect }: SearchBoxProps) {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={searchOptions}
      onChange={(_, value) => {
        // redirect to search results page
        onSelect(value as AutocompleteResult);
      }}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Location" />}
    />
  );
}

export default function HomePage() {
  const router = useRouter();

  const { featuredOrganizations } = useOrganizations();

  return (
    <PageContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            mt: "40px",
          }}
        >
          <Typography variant="h6" sx={{ mb: "16px" }}>
            Find an organization near you
          </Typography>
        </Box>
        <SearchBox
          onSelect={(selection) => {
            router.push(`/search/${selection.locationType}/${selection.label}`);
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#e7f5e9",
            borderRadius: "10px",
            border: "1px solid #c8e6c9",
            padding: "20px",
            width: "300px",
            mt: "16px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              sx={{ fontSize: "14px", textAlign: "center", color: "#555555" }}
            >
              Have an organization that you want to submit?{" "}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: "8px" }}>
            <Typography sx={{ fontSize: "14px" }}>
              <Link href="/submit-organization">
                <Button variant="outlined" color="success">
                  Submit organization
                </Button>
              </Link>
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: "16px",
          }}
        >
          <Typography>Can't find your city?</Typography>
          <Link href="/search/country/United States">
            <Typography>Browse the whole list of organizations here</Typography>
          </Link>
        </Box>

        <Divider sx={{ mt: "16px", width: "90%" }} />
        <Box sx={{ mt: "16px" }}>
          <Typography variant="h5">Featured Organizations</Typography>
        </Box>
        <Box>
          {featuredOrganizations.map((org) => (
            <Box key={org._id} sx={{ m: "16px" }}>
              <OrganizationCard organization={org} />
            </Box>
          ))}
        </Box>
      </Box>
    </PageContainer>
  );
}
