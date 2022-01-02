import CourseInfo from "./CourseInfo.js";
const defaultProperties = {
    room: null,
    building: null,
    id: null,
};
/**
 * A class to store the location data, inherits from CourseInfo
 *
 */
export default class Location extends CourseInfo {
    room;
    building;
    constructor(options) {
        super(options, false);
        Object.assign(this, defaultProperties);
        this.room = this._parseRoom();
        this.building = this._parseBuilding();
        this.id = this._parseLocationID();
    }
    _parseRoom() {
        let room = "";
        if (!this.rawID) {
            new Error("rawID is null");
            return null;
        }
        if (this.rawID.indexOf("/") > -1) {
            const splits = this.rawID.split("/");
            room = splits[splits.length - 1];
        }
        else {
            throw new Error("Location " + this.id + " has no room.");
        }
        return room;
    }
    _parseBuilding() {
        let building = "";
        if (!this.rawID) {
            new Error("rawID is null");
            return null;
        }
        if (this.rawID.indexOf("/") > -1) {
            const splits = this.rawID.split("/");
            building = splits[splits.length - 2];
        }
        return building;
    }
    _parseLocationID() {
        let id = "";
        if (!this.rawID) {
            new Error("rawID is null");
            return null;
        }
        if (this.rawID.indexOf("/") > -1) {
            id = [this.building, this.room].join("/");
        }
        else {
            const splits = this.rawID.split("/");
            id = splits[splits.length - 1];
        }
        return id;
    }
}
