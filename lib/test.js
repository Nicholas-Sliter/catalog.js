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
import Scraper from "./classes/Scraper.js";
import Param from "./classes/Param.js";
const term = "S22";
const searchParameters = [
    new Param("type%5B%5D", "genera%3Aoffering%2FLCT").getObject(),
    //new Param("type%5B%5D", "genera%3Aoffering%2FLAB").getObject(),
    //new Param("type%5B%5D", "genera%3Aoffering%2FDSC").getObject(),
    //new Param("type%5B%5D", "genera%3Aoffering%2FDR1").getObject(),
    //new Param("type%5B%5D", "genera%3Aoffering%2FDR2").getObject(),
    //new Param("type%5B%5D", "genera%3Aoffering%2FPE").getObject(),
    //new Param("type%5B%5D", "genera%3Aoffering%2FPLB").getObject(),
    //new Param("type%5B%5D", "genera%3Aoffering%2FSCR").getObject(),
    new Param("type%5B%5D", "genera%3Aoffering%2FSEM").getObject(),
    new Param("location%5B%5D", "resource%2Fplace%2Fcampus%2FM").getObject(),
    new Param("search", "Search").getObject(),
];
const S = new Scraper(term, searchParameters);
//await S.getCatalogFromFile("./test/test.xml");
//console.log(S.catalog);
await S.scrape();
await S.parse();
//console.log(S.catalog.courses[0].requirements);
//S.catalog.clean();

//console.log(S.catalog.courses[0]);
    

S.catalog.courses.forEach(course => console.log(course.alias));
