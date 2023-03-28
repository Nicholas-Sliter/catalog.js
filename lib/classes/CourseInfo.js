/**
 * A course class to store the course data
 * @param {string} course the course data
 * @const {course} the converted format of the course data
 *
 */
const defaultProperties = {
    rawID: null,
    href: null,
    text: null,
    id: null
};
export default class CourseInfo {
    rawID;
    href;
    text;
    id;
    constructor(options, parse = true) {
        Object.assign(this, defaultProperties);
        if (parse) {
            this._parseOptions(options);
            this.id = this._parseID();
        }
        else {
            Object.assign(this, options);
        }
    }
    _parseOptions(options) {
        this.rawID = options?.["$"]?.id;
        this.href = options?.["$"]?.href;
        this.text = options?.["_"];
    }
    _parseID() {
        let id = "";
        if (!this.rawID) {
            //throw new Error("rawID is null");
            return null;
        }
        if (this.rawID.indexOf("/") > -1) {
            const splits = this.rawID.split("/");
            id = splits[splits.length - 1];
        }
        else {
            //throw new Error("Course " + this.rawID + " has no ID.");
            return null;
        }
        return id;
    }
}
//# sourceMappingURL=CourseInfo.js.map