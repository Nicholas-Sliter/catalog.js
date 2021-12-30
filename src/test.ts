// import xml2js from "xml2js";
// import fetch from "node-fetch";
// import fs from "fs";

// const href =
//   "http://catalog.middlebury.edu/offerings/searchxml/catalog/catalog%2FMCUG?term%2F=202190";

// async function stuff() {
//   const response = await fetch(href);

//   if (!response.ok) {
//     throw new Error(`Could not fetch ${href}`);
//   }
//   const xml = await response.text();
//   const parser = new xml2js.Parser();
//   const json = await parser.parseStringPromise(xml);
//   return json;
// }

// const json = await stuff();
// let data = await JSON.stringify(json);
// let d2 = await JSON.parse(data);
// //console.log(d2["rss"]["channel"]);
// const channel = d2.rss.channel[0];
// console.log(channel);

// //fs.writeFileSync("test.json", data);

import Scraper from "./classes/Scraper";

const term = "F21";
const searchParameters = {};
const S = new Scraper(term, searchParameters);


