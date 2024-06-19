import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import Logo from "@/components/Logo";

import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";

import reportWebVitals from "./reportWebVitals";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "Join a Local Org",
  description:
    "We provide a platform for people to connect to their local organizations to fight injustice perpetrated by governments, corporations, and capitalism.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta name="emotion-insertion-point" content="" />
      {process.env.NEXT_PUBLIC_GA_ID && (
        <>
          <Script
            id="google-analytics-tag"
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          ></Script>
          <Script id="google-analytics-script">
            {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
      `}
          </Script>
        </>
      )}
      <Script id="gtag-click-tracker">
        {`
           var links = [...document.getElementsByTagName("a")]
            links.forEach((link) => {
              link.addEventListener("click", (e) => {
                var url = link.href;

                var data = { eventType: "link-click", data: url };
                fetch("/api/v1/analytics-event", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
                })
                  .then((response) => response.json())
                  .then((result) => {
                    // Handle the response
                    console.log(result);
                  })
                  .catch((error) => {
                    // Handle the error
                    console.error(error);
                  });
              });
            });
        `}
      </Script>
      <body>
        <AppRouterCacheProvider>
          <ThemeRegistry>
            <Box display={"flex"} justifyContent={"center"}>
              <Box
                maxWidth="972px"
                style={{ overflow: "hidden", width: "100%" }}
              >
                <Logo />
                <div className={"App-content"}>{children}</div>
              </Box>
            </Box>
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
