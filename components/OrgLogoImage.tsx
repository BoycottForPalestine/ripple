"use client";

import { SyntheticEvent, useState } from "react";
import { Box } from "@mui/material";
import { log } from "console";

interface OrgLogoImageProps {
  orgName: string;
  logoUrl: string;
  width?: string;
  height?: string;
}

export default function OrgLogoImage({
  orgName,
  logoUrl,
  width = "48px",
  height = "48px",
}: OrgLogoImageProps) {
  const [imgSrc, setImgSrc] = useState("");

  const handleError = (e: SyntheticEvent) => {
    e.stopPropagation();
    setImgSrc("/organization-fallback.png");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: width,
        height: height,
        borderRadius: "50%",
        overflow: "hidden",
      }}
    >
      <img
        style={{ height: "100%", width: "100%", objectFit: "cover" }}
        src={imgSrc || logoUrl || "/organization-fallback.png"}
        alt={orgName + " logo"}
        onError={handleError}
      />
    </Box>
  );
}
