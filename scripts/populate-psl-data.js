// // Parsing JVP
// const fs = require("fs");
// const { locations } = require("./raw-data/psl.js");
// const { stateCodeToState } = require("./raw-data/statecode-to-state.js");
// const axios = require("axios");

// const data = [];

// let delayCounter = 500;

// locations.forEach((location) => {
//   const [city, stateCode] = location.split(", ");
//   const state = stateCodeToState[stateCode];

//   setTimeout(() => {
//     axios
//       .post("https://joinalocal.org/api/v1/organization", {
//         name: `Party for Socialism and Liberation, ${city}`,
//         tagline:
//           "The Party for Socialism and Liberation believes that the only solution to the deepening crisis of capitalism is the socialist transformation of society. The PSL struggles for the revolutionary overturn of capitalism, which is the only way capitalism can be abolished.",
//         description:
//           "The Party for Socialism and Liberation believes that the only solution to the deepening crisis of capitalism is the socialist transformation of society. Driven by an insatiable appetite for ever greater profits regardless of social cost, capitalism is on a collision course with the people of the world and the planet itself. Imperialist war; deepening unemployment and poverty; deteriorating health care, housing and education; racism; discrimination and violence based on gender and sexual orientation; environmental destruction—all are inevitable products of the capitalist system itself. You can read more about [our program here](https://pslweb.org/program/).\n\nFor the great majority of people in the world, including tens of millions of workers in the United States, conditions of life and work are worsening. There is no prospect that this situation can or will be turned around under the existing system.\n\nThe idea that the capitalists’ grip on society and their increasingly repressive state can be abolished through any means other than a revolutionary overturn is an illusion. Equally unrealistic are reformist hopes for a “kinder, gentler” capitalism, or solutions based on economic decentralization or small group autonomy. Meeting the needs of the more than 6.5 billion people who inhabit the planet today is impossible without large-scale agriculture and industry and economic planning.\n\nThe fundamental problems confronting humanity today flow from the reality that most of the world’s productive wealth—the product of socialized labor and nature—is privately owned and controlled by a tiny minority. This minority decides what will be produced and what will not. Its decisions are based on making profits rather than meeting human needs.\n\nThere are really only two choices for humanity today—an increasingly destructive capitalism, or socialism.\n\nThe Party for Socialism and Liberation is working tirelessly to end the destructive structure of capitalism and replace it with socialism. If you want to join us in this struggle, join us today!",
//         category: "Organization",
//         umbrellaOrgId: "6619c6296a5c3e55a46e12fd",
//         isUmbrella: false,
//         joinInstructions: `You can join the Party for Socialism and Liberation in ${city} by [applying to join on our website](https://pslweb.org/join/). After you apply, someone will reach out and contact you within two weeks with more details.`,
//         logoUrl:
//           "https://i.ibb.co/cXLvvKm/Screenshot-2024-04-12-at-4-37-33-PM.png",
//         city: city,
//         state: state,
//         country: "United States",
//         passkey: "test",
//       })
//       .then((response) => {
//         console.log("Added " + city + ", " + state + " to the database.");
//       })
//       .catch((e) => {
//         console.log(
//           "Error adding " + city + ", " + state + " to the database."
//         );
//         console.log(e);
//       });
//   }, delayCounter);

//   delayCounter += 250;
// });
