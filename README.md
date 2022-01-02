## catalog.js

### A JavaScript / TypeScript API for the Middlebury course catalog.

[![Build Status](https://travis-ci.org/coursereviews/catalog.js.svg?branch=master)](https://travis-ci.org/coursereviews/catalog.js)

## Install

```sh
$ npm install --save middlebury-catalog
```

## Examples

Scrape the course catalog for a given term in one of two formats (YYYYSS or SYY) and a set of search parameters. The URL is automatically
constructed based on the term and parameters.  If given no search paramters, the scraper will use its predefined defaults.

```js
import Scraper from ('middlebury-catalog');

const scraper = new Scraper('202190');
const catalog = await scraper.getCatalog();
 
```

or manually

```js
import Scraper from ('middlebury-catalog');

const scraper = new Scraper('F21');
await scraper.scrape();
await scraper.parse();
const catalog = scraper.catalog;
 
  });
```




Specify an XML file to scrape from. You must still provide a term to catalog.

```js
const catalog = require('middlebury-catalog');

catalog('201590')
  .catalogFromFile('test/test.xml')
  .then(function (catalog) {
    console.log(catalog.courses[0]);
  });
```

## Develop

Clone the repository then run:

```sh
$ npm install
```

Run the tests with:

```
$ npm test
```
