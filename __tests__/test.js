import { test } from "uvu";
import * as assert from "uvu/assert";
import Scraper from "../lib/classes/Scraper.js";
import Param from "../lib/classes/Param.js";


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




test("Web Scrape", async () => {
  const S = new Scraper("W22", searchParameters);
  await S.scrape();
  await S.parse();

  const term = S.catalog.term;

  assert.is(term.rawID, "term/202210");
  assert.is(term.text, "Winter 2022");
  assert.is(term.year, "2022");
  assert.is(term.season, "W");
  assert.is(
    term.href,
    "https://catalog.middlebury.edu/terms/view/catalog/catalog%2FMCUG/term/term%2F202210"
  );


  const courses = S.catalog.courses;

  assert.is(courses[0].code, "AMST1022A-W22");
  assert.is(courses[0].title, "American Pulp Fiction");

  assert.is(courses.length, 181);


  
});


test("File scrape", async() => {
  const S = new Scraper("F15", searchParameters);
  await S.getCatalogFromFile("./test.xml");

  const term = S.catalog.term;

  assert.is(term.rawID, "term/201590");
  assert.is(term.text, "Fall 2015");
  assert.is(term.year, "2015");
  assert.is(term.season, "F");
  assert.is(
    term.href,
    "http://catalog.middlebury.edu/terms/view/catalog/catalog%2FMCUG/term/term%2F201590"
  );

  

  const courses = S.catalog.courses;

  assert.is(courses[0].code, "AMST0102A-F15");
  assert.is(courses[0].title, "Politics, Media, Pop. Culture");

  assert.is(courses.length, 886);
  
  
  
});




test.run();
