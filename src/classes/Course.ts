import { StringifyOptions } from "querystring";
import { stripHtml } from "../utils.js";
import Crn from "./Crn.js";
import Department from "./Department.js";
import Instructor from "./Instructor.js";
import Location from "./Location.js";
import Meeting from "./Meeting.js";
import Requirement from "./Requirement.js";
import Schedule from "./Schedule.js";
import Subject from "./Subject.js";
import Term from "./Term.js";
import Type from "./Type.js";
import Level from "./Level.js";

type CourseElement = string | null;
//can only contain primitive types
const defaultProperties = {
  href: null,
  code: null,
  description: null,
  title: null,
  alternate: null,
  type: null,
  department: null,
  location: null,
  schedule: null,
  crn: null,
  term: null,
  subject: null,
  level: null,
};

export default class Course {
  href: CourseElement;
  code: CourseElement;
  description: CourseElement;
  title: CourseElement;
  alternate: CourseElement;
  type: Type | null;
  department: Department | null;
  requirements: Requirement[];
  instructors: Instructor[];
  location: Location | null;
  schedule: Schedule | null;
  crn: Crn | null;

  term: Term | null;
  subject: Subject | null;
  level: Level | null;

  constructor(options: object) {
    Object.assign(this, defaultProperties);
    this.requirements = []; //to prevent all instances of this class from having the same requirements array
    this.instructors = [];
    //Object.assign(this, options);
    this._parseCourse(options);
  }

  private async _parseCourse(courseObj: any) {
    if (!courseObj) {
      throw new Error("No raw data to parse");
    }

    this.href = courseObj?.link[0];
    this.code = courseObj?.title[0];
    this.description = stripHtml(courseObj?.description[0]); //todo: do this in the class
    this.title = stripHtml(courseObj["catalog:title"][0]);
    //this.alternate = courseObj?.alternate[0];
    this.type = new Type(courseObj?.["catalog:genustype"]?.[0]);
    this.location = new Location(courseObj?.["catalog:location"]?.[0]);
    this.schedule = new Schedule(courseObj?.["catalog:schedule"]?.[0]);
    this.crn = new Crn(courseObj?.["catalog:property"]?.[0]);

    const termObj = courseObj?.["catalog:term"]?.[0];
    this.term = new Term(termObj);

  
    const instructors = courseObj?.["catalog:instructor"];
    if (instructors && instructors?.length > 0) {
    instructors.forEach((instructor: any) => {
      this.instructors.push(new Instructor(instructor));
    });

    }


    const topics = courseObj["catalog:topic"];
    topics.forEach((topic: any) => {
      const types: string[] = topic.$.type.split("/");
      const topicType: string = types[types.length - 1];

      if (topicType === "subject") {
        this.subject = new Subject(topic);
      } else if (topicType === "department") {
        this.department = new Department(topic);
      } else if (topicType === "requirement") {
        const req: Requirement = new Requirement(topic);
        this.requirements.push(req);
      } else if (topicType === "level") {
        this.level = new Level(topic);
      }
    });
  }
}
