/*eslint no-dupe-keys: 0*/

const _       = require('lodash'),
      request = Promise.promisifyAll(require('request')),
      fs      = Promise.promisifyAll(require('fs')),
      xml2js  = Promise.promisifyAll(require('xml2js')),
      parse   = require('./parsers');

function createScraper(term) {
  if (!term) {
    throw new Error('parameter `term` is required');
  }

  const scraper = function () {};

  scraper.catalogFromUrl = async function () {
    return request.getAsync(getScrapeUrl(term))
      .then(function (response) {
        return xml2js.parseStringAsync(response.body);
      })
      .then(function (xml) {
        return parse.parseCatalog(xml);
      });
  };

  scraper.catalogFromFile = function (file) {
    return fs.readFileAsync(file, 'utf8')
      .then(function (file) {
        return xml2js.parseStringAsync(file);
      })
      .then(function (xml) {
        return parse.parseCatalog(xml);
      });
  };

  return scraper;
}

module.exports = createScraper;

function getScrapeUrl(term) {
  const baseUrl = 'http://catalog.middlebury.edu/offerings/searchxml/catalog/catalog%2FMCUG?';
  const urlParts = {
    'term': 'term%2F' + term,
    'department': '',
    'type%5B%5D': 'genera%3Aoffering%2FLCT',
    'type%5B%5D': 'genera%3Aoffering%2FLAB',
    'type%5B%5D': 'genera%3Aoffering%2FDSC',
    'type%5B%5D': 'genera%3Aoffering%2FDR1',
    'type%5B%5D': 'genera%3Aoffering%2FDR2',
    'type%5B%5D': 'genera%3Aoffering%2FPE',
    'type%5B%5D': 'genera%3Aoffering%2FPLB',
    'type%5B%5D': 'genera%3Aoffering%2FSCR',
    'type%5B%5D': 'genera%3Aoffering%2FSEM',
    'location%5B%5D': 'resource%2Fplace%2Fcampus%2FM',
    'search': 'Search'
  };

  return (
    baseUrl +
    _(urlParts)
      .map(function (value, key) {
        return key + "=" + value;
      })
      .join("&amp;");
}
