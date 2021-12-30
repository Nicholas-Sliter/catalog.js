import CourseInfo from "./CourseInfo";
const defaultProperties = {
    name: null,
    middleburyID: null,
};
export default class Instructor extends CourseInfo {
    name;
    middleburyID;
    constructor(options) {
        super(options);
        Object.assign(this, defaultProperties);
        this.name = this.text;
        this.middleburyID = this._parseMiddleburyID();
    }
    /**
     * Parse a raw instructor ID to get the middlebury ID
     * Raw ID is of form "resource/person/3F1285F4DD81824CB42A177D0893577D"
     * We want to get the last part of the ID "3F1285F4DD81824CB42A177D0893577D"
     * @returns {string}
     */
    _parseMiddleburyID() {
        let middleburyID;
        if (this.rawID.indexOf("/") > -1) {
            const splits = this.rawID.split("/");
            middleburyID = splits[splits.length - 1];
        }
        else {
            throw new Error("Instructor " + this.name + " has no Middlebury ID.");
        }
        return middleburyID;
    }
}
