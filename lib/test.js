/*
import Scraper from "./classes/Scraper.js";
import Param from "./classes/Param.js";
const term = "W22";
const searchParameters = [
    new Param("type%5B%5D", "genera%3Aoffering%2FLCT").getObject(),
    new Param("type%5B%5D", "genera%3Aoffering%2FLAB").getObject(),
    new Param("type%5B%5D", "genera%3Aoffering%2FDSC").getObject(),
    new Param("type%5B%5D", "genera%3Aoffering%2FDR1").getObject(),
    new Param("type%5B%5D", "genera%3Aoffering%2FDR2").getObject(),
    new Param("type%5B%5D", "genera%3Aoffering%2FPE").getObject(),
    new Param("type%5B%5D", "genera%3Aoffering%2FPLB").getObject(),
    new Param("type%5B%5D", "genera%3Aoffering%2FSCR").getObject(),
    new Param("type%5B%5D", "genera%3Aoffering%2FSEM").getObject(),
    new Param("location%5B%5D", "resource%2Fplace%2Fcampus%2FM").getObject(),
    new Param("search", "Search").getObject(),
];
const S = new Scraper(term, searchParameters);
await S.scrape();
await S.parse();
console.log(S.catalog.courses);

*/