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
};
export default class CourseInfo {
    rawID;
    href;
    text;
    constructor(options) {
        Object.assign(this, defaultProperties);
        Object.assign(this, options);
    }
}
