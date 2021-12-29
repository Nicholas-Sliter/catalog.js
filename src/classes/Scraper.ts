import xml2js from "xml2js";
import Catalog from "./Catalog";
import Term from "./Term";

const MIDD_URL_BASE = 'http://catalog.middlebury.edu/offerings/searchxml/catalog/catalog%2FMCUG?';

/**
 * A scraper class to scrape the data from the course page
 *
 */
export default class Scraper {
   public catalog: Catalog;
   public raw: string;
   public href: string;
   public term: Term;
   public searchParameters: object;



   private _getScraperURL(term?: Term, searchParameters?: object): string {
      let url = `${MIDD_URL_BASE}`;

      if (term) {

      }


      if (!searchParameters || searchParameters==={}) {
         return url;

      }

      


      for (const key in searchParameters) {
         if (searchParameters.hasOwnProperty(key)) {
            url += `&${key}=${searchParameters[key]}`;
         }
      }
      return url;
   }

}
