import { test } from 'uvu';
import * as assert from 'uvu/assert';
import Scraper from '../lib/classes/Scraper.js';
import Param from '../lib/classes/Param.js';


const searchParameters = [
  new Param('type%5B%5D', 'genera%3Aoffering%2FLCT').getObject(),
  new Param('type%5B%5D', 'genera%3Aoffering%2FLAB').getObject(),
  new Param('type%5B%5D', 'genera%3Aoffering%2FDSC').getObject(),
  new Param('type%5B%5D', 'genera%3Aoffering%2FDR1').getObject(),
  new Param('type%5B%5D', 'genera%3Aoffering%2FDR2').getObject(),
  new Param('type%5B%5D', 'genera%3Aoffering%2FPE').getObject(),
  new Param('type%5B%5D', 'genera%3Aoffering%2FPLB').getObject(),
  new Param('type%5B%5D', 'genera%3Aoffering%2FSCR').getObject(),
  new Param('type%5B%5D', 'genera%3Aoffering%2FSEM').getObject(),
  new Param('location%5B%5D', 'resource%2Fplace%2Fcampus%2FM').getObject(),
  new Param('search', 'Search').getObject(),
];




test('Web Scrape', async () => {
  const term = 'W22';
  const S = new Scraper({term, searchParameters});
  await S.scrape();
  await S.parse();

  const t = S.catalog.term;

  assert.is(t.rawID, 'term/202210');
  assert.is(t.text, 'Winter 2022');
  assert.is(t.year, '2022');
  assert.is(t.season, 'W');
  assert.is(
    t.href,
    'https://catalog.middlebury.edu/terms/view/catalog/catalog%2FMCUG/term/term%2F202210'
  );


  const courses = S.catalog.courses;

  assert.is(courses[0].code, 'AMST1022A-W22');
  assert.is(courses[0].title, 'American Pulp Fiction');

  assert.is(courses.length, 181);


  
});


test('File scrape', async() => {
  const term = 'F15';
  const S = new Scraper({term, searchParameters});
  await S.getCatalogFromFile('./__tests__/test.xml');

  const t = S.catalog.term;

  assert.is(t.rawID, 'term/201590');
  assert.is(t.text, 'Fall 2015');
  assert.is(t.year, '2015');
  assert.is(t.season, 'F');
  assert.is(
    t.href,
    'http://catalog.middlebury.edu/terms/view/catalog/catalog%2FMCUG/term/term%2F201590'
  );

  

  const courses = S.catalog.courses;

  assert.is(courses[0].code, 'AMST0102A-F15');
  assert.is(courses[0].title, 'Politics, Media, Pop. Culture');

  assert.is(courses.length, 34); //removed many courses for file space
  
  
  
});




test.run();
