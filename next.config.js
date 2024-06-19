/** @type {import('next').NextConfig} */

const FRONT_END_URLS = {
  local: "http://localhost:3000",
  prod: "https://reversecanarymission.org",
};

const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization, Cookie, auth-token",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
