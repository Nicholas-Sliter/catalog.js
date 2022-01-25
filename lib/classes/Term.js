import CourseInfo from "./CourseInfo.js";
const defaultProperties = {
    season: null,
    year: null,
};
export default class Term extends CourseInfo {
    season;
    year;
    constructor(options) {
        super(options);
        Object.assign(this, defaultProperties);
        this.season = this._parseSeason();
        this.year = this._parseYear();
    }
    _parseSeason() {
        const seasons = {
            "90": "F",
            "10": "W",
            "20": "S",
        };
        return seasons[this.id.slice(4)] || "Unknown";
    }
    _parseYear() {
        return this.id.slice(0, 4) || "Unknown";
    }
}
