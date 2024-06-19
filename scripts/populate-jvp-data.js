// // Parsing JVP
// const fs = require("fs");
// const { stateData } = require("./raw-data/jvp.js");
// const axios = require("axios");

// const data = [];

// let delayCounter = 500;

// stateData.forEach((datum) => {
//   const { state, chapters } = datum;
//   chapters.forEach((chapter) => {
//     let {
//       name,
//       explicitName,
//       email,
//       facebook,
//       instagram,
//       website,
//       contribute,
//       twitter,
//     } = chapter;

//     const originalName = name;

//     if (explicitName) {
//       name = explicitName;
//     }

//     let socialsString = "";
//     let websiteString = website
//       ? website
//       : "https://www.jewishvoiceforpeace.org/";
//     let joinInstructions = `Please [email us at ${email}](mailto:${email}) if you're interested in getting involved!`;
//     if (facebook || instagram || twitter) {
//       socialsString = "\n\nFollow us on our socials:";
//       if (instagram) {
//         socialsString += `\n- [Instagram](${instagram})`;
//       }
//       if (facebook) {
//         socialsString += `\n- [Facebook](${facebook})`;
//       }
//       if (twitter) {
//         socialsString += `\n- [Twitter](${twitter})`;
//       }
//     }

//     if (contribute) {
//       joinInstructions = `Please fill out our [interest form](${contribute}) to get involved.`;
//     }

//     setTimeout(() => {
//       axios.post("https://joinalocal.org/api/v1/organization", {
//         name: `JVP ${name}`,
//         tagline:
//           "We are a Jewish organization that fights for the liberation of all people. We believe that through organizing, we can and will dismantle the institutions and structures that sustain injustice and grow something new, joyful, beautiful, and life-sustaining in their place.",
//         description:
//           `Jewish Voice for Peace is the largest progressive Jewish anti-Zionist organization in the world. We’re organizing a grassroots, multiracial, cross-class, intergenerational movement of U.S. Jews into solidarity with the Palestinian freedom struggle, guided by a vision of justice, equality, and dignity for all people.\n\nIf you’ve been looking for a political home for Jews on the left in this perilous moment; if you’ve been wanting a Jewish community with justice at the center; if you’ve been looking to turn your rage and grief into meaningful, strategic action: Join us. You belong here.\n\nYou can learn more about what we stand for on our [website](${websiteString}).` +
//           socialsString,
//         category: "Organization",
//         umbrellaOrgId: "660cfac80107a410af736d93",
//         isUmbrella: false,
//         joinInstructions: joinInstructions,
//         logoUrl:
//           "https://i.ibb.co/WzrD3Yc/Screenshot-2024-04-02-at-11-42-31-PM.png",
//         city: originalName,
//         state: state,
//         country: "United States",
//         passkey: "test",
//       });
//     }, delayCounter);

//     delayCounter += 500;
//   });
// });
