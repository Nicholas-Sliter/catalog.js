/**
 * A course class to store the course data
 * @param {string} course the course data
 * @const {course} the converted format of the course data
 *
 */

type CourseInfoElement = string | null;
const defaultProperties = {
   rawID: null,
   href: null,
   text: null,
   id: null
};


export default class CourseInfo {

  rawID: CourseInfoElement;
  href: CourseInfoElement;
  text: CourseInfoElement;
  id: CourseInfoElement;

  constructor(options: object, parse:boolean=true) {
      Object.assign(this, defaultProperties);
      if (parse) {
        this._parseOptions(options);
        this.id = this._parseID();
      }
      else {
        Object.assign(this, options);
      }
  }

  private _parseOptions(options: object) {
    this.rawID = options?.["$"]?.id;
    this.href = options?.["$"]?.href;
    this.text = options?.["_"];
  }

  private _parseID() {
    let id: string = "";

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
