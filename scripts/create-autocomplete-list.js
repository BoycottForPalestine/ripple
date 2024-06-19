const fs = require("fs");
const { organizations } = require("./organizations");

const locationMap = {};

organizations.forEach((org) => {
  const { city } = org;
  if (city && !locationMap[city]) {
    locationMap[city] = "city";
  }
});

organizations.forEach((org) => {
  const { state } = org;
  if (state && !locationMap[state]) {
    locationMap[state] = "state";
  }
});

organizations.forEach((org) => {
  const { country } = org;
  if (country && !locationMap[country]) {
    locationMap[country] = "country";
  }
});

const options = [];

Object.keys(locationMap).forEach((location) => {
  const locationType = locationMap[location];
  options.push({
    label: location,
    locationType: locationType,
  });
});

fs.writeFileSync(
  "lib/frontend/data/search-options.ts",
  `export const searchOptions = ${JSON.stringify(options)};`
);
