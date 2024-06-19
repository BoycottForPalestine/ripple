import { Box } from "@mui/material";
import Link from "next/link";

export default function Logo() {
  return (
    <Box
      sx={{
        display: "flex",
        position: "fixed",
        top: "0",
        justifyContent: "start",
        width: "100%",
        backgroundColor: "white",
        zIndex: 1,
        paddingTop: "16px",
      }}
    >
      <Link href="/">
        <img
          style={{ height: "30px", width: "auto", margin: "12px 0 4px 16px" }}
          src={"/join-a-local-org.svg"}
          alt="Join a local org logo"
        />
      </Link>
    </Box>
  );
}
