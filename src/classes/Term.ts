import CourseInfo from "./CourseInfo.js";

type TermElement = string | null;
const defaultProperties = {
  season: null,
  year: null,
};

export default class Term extends CourseInfo {
  season: TermElement;
  year: TermElement;

  constructor(options: object) {
    super(options);
    Object.assign(this, defaultProperties);

    this.season = this._parseSeason();
    this.year = this._parseYear();
  }

  private _parseSeason(): string {
    const seasons: object = {
      "90": "F",
      "10": "W",
      "20": "S",
    };
    return seasons[this.id.slice(4)] || "Unknown";
  }

  private _parseYear(): string {
    return this.id.slice(0, 4) || "Unknown";
  }
}
