//Unit testing using Jest

import Scraper from "../lib/classes/Scraper.js";
//import jest
import { jest } from "/jest/globals.js";

//unit test to check if scraper class is defined
describe("Scraper - basic tests", () => {
  test("should be defined", () => {
    expect(Scraper).toBeDefined();
  });
});




