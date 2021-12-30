import CourseInfo from "./CourseInfo";

export default class Crn extends CourseInfo {
   constructor(crnObj: object) {
      const options = {
        rawId: crnObj["catalog:value"][0],
        href: null,
        text: null
      };
      super(options);
   }
}