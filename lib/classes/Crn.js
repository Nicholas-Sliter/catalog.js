import CourseInfo from "./CourseInfo.js";
export default class Crn extends CourseInfo {
    constructor(crnObj) {
        console.log(crnObj);
        const options = {
            rawId: crnObj["catalog:value"][0],
            href: null,
            text: null
        };
        super(options);
    }
}
