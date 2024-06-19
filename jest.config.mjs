import nextJest from "next/jest.js";
import fs from "fs";

const modules = fs.readdirSync("node_modules");
let esModules = [];

for (const m of modules) {
  try {
    await import(m);
  } catch (error) {
    esModules.push(m);
  }
}

const esModulesPattern = esModules.join("|");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "@/lib/(.*)": "<rootDir>/lib/$1",
    "@/components/(.*)": "<rootDir>/components/$1",
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
const jestConfig = await createJestConfig(config)();
jestConfig.transformIgnorePatterns[0] = `/node_modules/(?!${esModulesPattern}).+.(js|jsx|mjs|cjs|ts|tsx)$/`;

export default jestConfig;
