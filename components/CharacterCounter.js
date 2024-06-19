import { Box, Typography } from "@mui/material";

export default function CharacterCounter({ currentLength, max }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Typography
        sx={{ color: "gray", fontSize: "12px" }}
      >{`${currentLength} / ${max}`}</Typography>
    </Box>
  );
}
