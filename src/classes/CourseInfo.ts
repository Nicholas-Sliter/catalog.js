/**
 * A course class to store the course data
 * @param {string} course the course data
 * @const {course} the converted format of the course data
 *
 */

type CourseInfoElement = string | null;

export default class CourseInfo {
   
  rawID: CourseInfoElement;
  href: CourseInfoElement;
  text: CourseInfoElement;

  constructor(options: object) {}
}
