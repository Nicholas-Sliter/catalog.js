import xml2js from "xml2js";
import fetch from "node-fetch";
import Catalog from "./Catalog.js";
const MIDD_URL_BASE = "http://catalog.middlebury.edu/offerings/searchxml/catalog/catalog%2FMCUG?";
/**
 * A scraper class to scrape the data from the course page
 *
 */
export default class Scraper {
    catalog;
    raw;
    href;
    term;
    searchParameters;
    constructor(term, searchParameters) {
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
    _convertTerm(term) {
        /** if term is of format YYYYSS, return term */
        if (term.match(/^[0-9]{6}$/)) {
            return term;
        }
        /** if term is of format SYY, convert to YYYYSS */
        if (term.match(/([A-Z]){1}([0-9]){2}$/)) {
            console.log(term);
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
            console.log(seasonCode);
            return `${fullYear}${seasonCode}`;
        }
        throw new Error(`Invalid term format: ${term}`);
    }
    async getCatalog() {
        if (!this.raw) {
            await this.scrape();
        }
        if (!this.catalog) {
            await this.parse();
        }
        return this.catalog;
    }
    async scrape() {
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
    async parse() {
        if (!this.raw) {
            throw new Error("Scraper must scrape before parsing");
        }
        const catalog = new Catalog({ raw: this.raw, href: this.href });
        this.catalog = catalog;
        return this;
    }
    _getScraperURL() {
        let url = `${MIDD_URL_BASE}`;
        if (this.term) {
            url += `term=term%2F${this.term}`;
        }
        if (!this.searchParameters) {
            return url;
        }
        this.searchParameters.forEach((param) => {
            url += `&${param.name}=${param.value}`;
        });
        return url;
    }
}
