// const str = "BaybayCity";
// const srch = "Baybay City";
// const str2 = "Leyte";
// const str3 = "Caridad";

// if ("Leyte" === str2 && str.includes(srch) && str3 === "Caridad") {
//   console.log("GOOD!");
// }

// // if (str.includes(srch)) {
// //   console.log("GOOD!");
// // }
const fetch = require("node-fetch");

async function test() {
  const response = await fetch(
    `https://api.locationiq.com/v1/autocomplete?q=Cebu City&autocomplete=1&key=pk.934fb3ab4775b063e8ca78c35f4dc313&format=json&dedupe=1`
  );

  const res = await response.json();

  console.log(res);
}

test();
