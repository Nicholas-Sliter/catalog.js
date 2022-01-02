import xml2js from "xml2js";
import fetch from "node-fetch";
import Catalog from "./Catalog.js";
import Param from "./Param.js";

const MIDD_URL_BASE =
  "http://catalog.middlebury.edu/offerings/searchxml/catalog/catalog%2FMCUG?";

const DEFAULT_SEARCH_PARAMS = [
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

/**
 * A scraper class to scrape the data from the course page
 *
 */
export default class Scraper {
  public catalog: Catalog;
  public raw: string;
  public href: string;
  public term: string;
  public searchParameters: object[];

  constructor(term: string, searchParameters?: object[]) {
    if (!term) {
      throw new Error("Term must be defined");
    }

    this.term = this._convertTerm(term);
    this.searchParameters = searchParameters.map((param) => {
      return { ...param };
    });

    this.href = this._getScraperURL();

    //default parameters when no scrape has been performed
    this.raw = "";
    this.catalog = new Catalog({});
  }

  private _convertTerm(term: string): string {
    /** if term is of format YYYYSS, return term */
    if (term.match(/^[0-9]{6}$/)) {
      return term;
    }

    /** if term is of format SYY, convert to YYYYSS */
    if (term.match(/([A-Z]){1}([0-9]){2}$/)) {
      const seasons = {
        F: "90",
        W: "10",
        S: "20",
      };
      const century = "20";
      const partialYear = term.slice(1);
      const fullYear = `${century}${partialYear}`;
      const season = term.charAt(0);
      const seasonCode = seasons[season];
      return `${fullYear}${seasonCode}`;
    }

    throw new Error(`Invalid term format: ${term}`);
  }

  public async getCatalog(): Promise<Catalog> {
    if (!this.raw) {
      await this.scrape();
    }

    if (!this.catalog) {
      await this.parse();
    }

    return this.catalog;
  }



  public async scrape(): Promise<Scraper> {
    const response = await fetch(this.href);

    if (!response.ok) {
      throw new Error(`Could not fetch ${this.href}`);
    }

    const xml = await response.text();
    const parser = new xml2js.Parser();
    const json = await JSON.stringify(await parser.parseStringPromise(xml));
    this.raw = json;

    return this;
  }

  public async parse(): Promise<Scraper> {

    if (!this.raw) {
      throw new Error("Scraper must scrape before parsing");
    }

    const catalog = new Catalog({raw: this.raw, href: this.href});
    this.catalog = catalog;

    return this;



  }

  private _getScraperURL(): string {
    let url = `${MIDD_URL_BASE}`;

    if (this.term) {
      url += `term=term%2F${this.term}`;
    }

    if (!this.searchParameters) {
      return url;
    }

    this.searchParameters.forEach((param: {name:string, value:string}) => {
      url += `&${param.name}=${param.value}`;
    });

    return url;
  }
}
