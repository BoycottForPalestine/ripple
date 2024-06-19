import { OrganizationWithSlug } from "@/lib/shared/types/organization";
import { Box, Card, CardContent, Typography } from "@mui/material";
import OrgLogoImage from "./OrgLogoImage";
import Link from "next/link";
import { buildLocation } from "@/lib/shared/organization";

interface OrganizationCardProps {
  organization: OrganizationWithSlug;
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({
  organization,
}) => {
  return (
    <Link
      style={{ textDecoration: "none" }}
      href={`/organization/${organization.slug}`}
    >
      <Card variant="outlined">
        <CardContent>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ mr: "16px" }}>
              <OrgLogoImage
                orgName={organization.name}
                logoUrl={organization.logoUrl || ""}
              />
            </Box>
            <Box>
              <Typography
                sx={{ textDecoration: "none" }}
                variant="h6"
                component="div"
              >
                {organization.name}
              </Typography>
              <Typography sx={{ color: "gray", fontSize: "12px", mb: "8px" }}>
                {buildLocation(organization)}
              </Typography>
              <Typography variant="body2">
                {organization.tagline ??
                  "No description available but this is a longer description fjiodsajf dsaiofj diosaj fiod sjaofj asdoj oifdjsaio fjdsioajf diosaj fdioas fjiodsa jfiodj safio;dj saifoj dios;ajf idsaj ;ofj asd io;j"}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default OrganizationCard;
