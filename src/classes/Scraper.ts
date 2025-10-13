import xml2js from "xml2js";
import fetch from "node-fetch";
import Catalog from "./Catalog.js";
import Param from "./Param.js";
import fs from "fs";

const MIDD_URL_BASE = 'https://catalog.middlebury.edu/offerings/searchxml/catalog-MCUG?';
const DEFAULT_SEARCH_PARAMS = [
  new Param("type%5B%5D", "genera%3Aoffering-LCT").getObject(),
  new Param("type%5B%5D", "genera%3Aoffering-LAB").getObject(),
  new Param("type%5B%5D", "genera%3Aoffering-DSC").getObject(),
  new Param("type%5B%5D", "genera%3Aoffering-DR1").getObject(),
  new Param("type%5B%5D", "genera%3Aoffering-IND").getObject(),
  new Param("type%5B%5D", "genera%3Aoffering-PE").getObject(),
  new Param("type%5B%5D", "genera%3Aoffering-SCR").getObject(),
  new Param("type%5B%5D", "genera%3Aoffering-SEM").getObject(),
  new Param("type%5B%5D", "genera%3Aoffering-SNR").getObject(),
  new Param("days_mode", "inclusive").getObject(),
  new Param("time_start", "0").getObject(),
  new Param("time_end", "86400").getObject(),
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

  constructor(obj:
    {
      term?: string | null,
      searchParameters?: object[] | null,
      filepath?: string | null
    }) {
    let { term, searchParameters, filepath } = obj;


    if (!term && !filepath) {
      throw new Error("Term or file must be defined");
    }

    if (!searchParameters) {
      searchParameters = DEFAULT_SEARCH_PARAMS;
    }

    if (term) {
      this.term = this._convertTerm(term);
      this.searchParameters = searchParameters.map((param) => {
        return { ...param };
      });

      this.href = this._getScraperURL();

      //default parameters when no scrape has been performed
      this.raw = "";
      //this.catalog = new Catalog({});
    }
    if (filepath) {
      this.href = filepath;
      this.raw = "";
      //this.catalog = new Catalog({});
    }
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

  public async getCatalogFromFile(filepath: string): Promise<Catalog> {
    this.href = filepath;
    if (!this.raw) {
      await this.scrapeFromFile(filepath);
    }

    await this.parseFromFile(filepath);

    return this.catalog;
  }

  public async scrapeFromFile(filepath: string): Promise<Scraper> {
    const file = fs.readFileSync(filepath, "utf8");

    const parser = new xml2js.Parser();
    const json = JSON.stringify(await parser.parseStringPromise(file));
    this.raw = json;

    return this;
  }

  public async parseFromFile(filepath: string): Promise<Scraper> {
    const catalog = new Catalog({ raw: this.raw, href: filepath });
    this.catalog = catalog;
    return this;
  }

  public async scrape(): Promise<Scraper> {
    const response = await fetch(this.href, {
      headers: {
        "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
        "Accept": 'text/html,application/xhtml+xml,application/xml;',
        "Accept-Encoding": 'gzip, deflate, br',
        "Cache-Control": "max-age=0",
        "Connection": "keep-alive",
        "Host": "catalog.middlebury.edu"
      }
    });

    if (!response.ok) {
      throw new Error(`Could not fetch ${this.href}`);
    }

    const xml = await response.text();
    const parser = new xml2js.Parser();
    const json = JSON.stringify(await parser.parseStringPromise(xml));
    this.raw = json;

    return this;
  }

  public async parse(): Promise<Scraper> {
    if (!this.raw) {
      throw new Error("Scraper must scrape before parsing");
    }

    const catalog = new Catalog({ raw: this.raw, href: this.href });
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

    this.searchParameters.forEach((param: { name: string; value: string }) => {
      url += `&${param.name}=${param.value}`;
    });

    return url;
  }
}
