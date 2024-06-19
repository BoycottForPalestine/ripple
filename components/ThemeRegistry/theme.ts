import { createTheme } from "@mui/material/styles";
import { Mulish, Merriweather } from "next/font/google";
const mulish = Mulish({
  weight: "400",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  weight: "400",
  subsets: ["latin"],
});

const theme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    h1: {
      fontFamily: merriweather.style.fontFamily,
    },
    h2: {
      fontFamily: merriweather.style.fontFamily,
    },
    h3: {
      fontFamily: merriweather.style.fontFamily,
    },
    h4: {
      fontFamily: merriweather.style.fontFamily,
    },
    h5: {
      fontFamily: merriweather.style.fontFamily,
    },
    h6: {
      fontFamily: merriweather.style.fontFamily,
    },
    fontFamily: mulish.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
  },
});

export default theme;
