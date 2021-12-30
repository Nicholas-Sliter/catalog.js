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
};


export default class CourseInfo {

  rawID: CourseInfoElement;
  href: CourseInfoElement;
  text: CourseInfoElement;

  constructor(options: object) {
      Object.assign(this, defaultProperties);
      //Object.assign(this, options);
      this._parseOptions(options);
  }

  private _parseOptions(options: object) {
    this.rawID = options["$"].id;
    this.href = options["$"].href;
    this.text = options["_"];
  }

}
