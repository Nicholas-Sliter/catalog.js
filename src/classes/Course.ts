import Term from './Term.js';
import Instructor from './Instructor.js';

type CourseElement = string | null;
const defaultProperties = {
    href: null,
    code: null,
    description: null,
    title: null,
    alternate: null,
    type: null,
    department: null,
    requirements: [],
    instructors: [],
    location: null,
    schedule: null,
    crn: null,

		term: null,
};



export default class Course {
  href: CourseElement;
  code: CourseElement;
  description: CourseElement;
  title: CourseElement;
  alternate: CourseElement;
  type: CourseElement;
  department: CourseElement;
  requirements: [];
  instructors: [Instructor];
  location: CourseElement;
  schedule: CourseElement;
  crn: CourseElement;

  term: Term | null;

	constructor(options: object) {
		Object.assign(this, defaultProperties);
		Object.assign(this, options);

	}

  private async _parseCourse(courseObj: any) {
    if (!courseObj) {
      throw new Error('No raw data to parse');
    }

    this.href = courseObj?.link[0];
    this.code = courseObj?.title[0];
    this.description = courseObj?.description[0];
    this.title = courseObj['catalog:title'][0];
    this.alternate = courseObj?.alternate[0];
    this.type = courseObj?.type[0];
    this.department = courseObj?.department[0];
    this.location = courseObj?.location[0];
    this.schedule = courseObj?.schedule[0];
    this.crn = courseObj?.crn[0];

    const termObj = courseObj["catalog:term"][0];
    this.term = new Term(termObj);
    



  }



}
