import CourseInfo from "./CourseInfo.js";

export default class Crn extends CourseInfo {
   constructor(crnObj: object) {
      const options = {
        rawID: crnObj["catalog:value"][0],
        href: null,
        text: crnObj["catalog:value"][0],
      };
      super(options, false);
      this.id = this.rawID;
   }
}