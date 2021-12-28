/**
 * A term class to store the term name (FYY, WYY, SYY) and its converted format
 * @param name the term name (FYY, WYY, SYY)
 * @const {term} the converted format of the term name
 * 
 */

export default class Term {
  name: string;
  term: string;

  constructor(name: string) {
    if (name.length !== 3) {
      throw new Error(
        "Invalid term length: name must be of format FYY, WYY, or SYY."
      );
    }
    this.name = name.toUpperCase();
    this.term = this._convertNameToTerm(this.name);
  }

  /**
   * Convert from the term name to the converted format
   * @param name the term name (FYY, WYY, SYY)
   * @returns {term} the converted format of the term name
   */
  private _convertNameToTerm(name: string) {
    let term: string;
    const seasons: object = {
      F: "90",
      W: "10",
      S: "20",
    };

    const season: string = seasons[name.charAt(0)] ?? "";
    if (season === "") {
      throw new Error(
        "Invalid term name: name must be of format FYY, WYY, or SYY."
      );
    }

    const year: string = name.slice(1);

    if (year.length !== 2 || !year.match(/^[0-9]{2}$/)) {
      throw new Error(
        "Invalid term year: name must be of format FYY, WYY, or SYY, where YY is a 2 digit year."
      );
    }

    const century: string = "20";
    const fullYear: string = `${century}${year}`;

    term = fullYear + season;

    return term;
  }

  private _convertTermToName(term: string) {
    let name: string;
    const seasons: object = {
      '90': 'F',
      '10': 'W',
      '20': 'S',
    };

    const season: string = seasons[name.slice(4)] ?? "";
    if (season === "") {
      throw new Error(
        "Invalid term: term must be of format YYYYSS."
      );
    }

    const year: string = term.slice(0, 4);

    if (year.length !== 4 || !year.match(/^[0-9]{4}$/)) {
      throw new Error(
        "Invalid term year: term must be of format YYYYSS, where YYYY is a 4 digit year."
      );
    }

    const partialYear: string = year.slice(2);

    name = partialYear + season;

    return name;
  }
}