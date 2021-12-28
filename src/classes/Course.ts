import Term from './Term';
import Instructor from './Instructor';

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



}
