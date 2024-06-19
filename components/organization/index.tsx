import { Organization } from "@/lib/shared/types/organization";
import React from "react";

import { Box, Typography } from "@mui/material";
import Markdown from "react-markdown";

import OrgLogoImage from "@/components/OrgLogoImage";
import PageContainer from "../common/PageContainer";
import { buildLocation } from "@/lib/shared/organization";
import Link from "next/link";
import { getSlugForOrganization } from "@/lib/shared/slugs";

interface OrganizationProps {
  organizationData: Organization;
  umbrellaOrgData: Organization | null;
}

function LogoAndLocation({ organization }: { organization: Organization }) {
  const location = buildLocation(organization);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        m: "16px 16px 0",
      }}
    >
      <OrgLogoImage
        orgName={organization.name}
        logoUrl={organization.logoUrl || ""}
      />
      <Typography sx={{ color: "gray" }}>{location}</Typography>
    </Box>
  );
}

function NameAndTagline({ name, tagline }: { name: string; tagline: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        m: "16px 16px 0",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        {name}
      </Typography>
      <Typography sx={{ mt: "8px" }}>{tagline}</Typography>
    </Box>
  );
}

function Description({
  orgName,
  description,
}: {
  orgName: string;
  description: string;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        m: "16px 16px 0",
        alignItems: "flex-start",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {orgName}: What is it?
      </Typography>
      {description ? (
        <Markdown>{description}</Markdown>
      ) : (
        <>
          <Typography sx={{ color: "gray" }}>
            No description available
          </Typography>
        </>
      )}
    </Box>
  );
}

function Category({ category }: { category: string }) {
  return (
    <Box sx={{ m: "16px 16px 0" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Category
      </Typography>
      {category ? (
        <Typography>{category}</Typography>
      ) : (
        <Typography sx={{ color: "gray" }}>Uncategorized</Typography>
      )}
    </Box>
  );
}

function JoinInstructions({ joinInstructions }: { joinInstructions: string }) {
  return (
    <Box sx={{ m: "16px 16px 0" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        How do I join?
      </Typography>
      {joinInstructions ? (
        <Markdown>{joinInstructions}</Markdown>
      ) : (
        <Typography sx={{ color: "gray" }}>
          No instructions available
        </Typography>
      )}
    </Box>
  );
}

function UmbrellaSection({
  umbrellaOrg,
}: {
  umbrellaOrg: Organization | null;
}) {
  if (!umbrellaOrg) {
    return null;
  }

  return (
    <Box sx={{ m: "16px 16px 0" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Parent Organization
      </Typography>
      {umbrellaOrg ? (
        <Link href={`/organization/${getSlugForOrganization(umbrellaOrg)}`}>
          <Typography>{umbrellaOrg.name}</Typography>
        </Link>
      ) : (
        <Typography sx={{ color: "gray" }}>No parent organization</Typography>
      )}
    </Box>
  );
}

export default function Organization({
  organizationData,
  umbrellaOrgData,
}: OrganizationProps): React.ReactElement {
  const { name, tagline, description, joinInstructions } = organizationData;

  return (
    <PageContainer>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          paddingLeft: "10px",
          paddingRight: "10px",
          paddingTop: "10px",
          paddingBottom: "10px",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            width: "95%",
            display: "flex",
            justifyContent: "center",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.01)",
            borderRadius: "10px",
            border: "1px solid #e8e8e8",
          }}
        >
          <Box
            sx={{
              textAlign: "left",
              flexDirection: "column",
              m: "16px",
              width: "100%",
            }}
          >
            <LogoAndLocation organization={organizationData} />
            <NameAndTagline name={name} tagline={tagline} />
            {/* <Category category={category} /> */}
            <JoinInstructions joinInstructions={joinInstructions} />
            <Description orgName={name} description={description} />
            <UmbrellaSection umbrellaOrg={umbrellaOrgData} />
          </Box>
        </Box>
      </Box>
    </PageContainer>
  );
}
