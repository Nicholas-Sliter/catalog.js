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
import Alias from "./Alias.js";
import AliasFactory from "./AliasFactory.js";

const DEPARTMENT_PREFIX_CHAR = "_";

type CourseElement = string | null;
//can only contain primitive types
const defaultProperties = {
  href: null,
  code: null,
  courseNumber: null,
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
  alias: null,
};

export default class Course {
  href: CourseElement;
  code: CourseElement;
  courseNumber: CourseElement;
  description: CourseElement;
  title: CourseElement;
  alternate: { _: string; $: { href: string; }; }[];
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
  alias: Alias[];

  constructor(options: object) {
    Object.assign(this, defaultProperties);
    this.requirements = []; //to prevent all instances of this class from having the same requirements array
    this.instructors = [];
    this.alias = [];
    //Object.assign(this, options);
    this._parseCourse(options);
  }

  private async _parseCourse(courseObj: any) {
    if (!courseObj) {
      throw new Error("No raw data to parse");
    }

    this.href = courseObj?.link[0];
    this.code = courseObj?.title[0];
    this.alternate = courseObj?.["catalog:alternate"];
    this.courseNumber = this._parseCourseNumber(this.code);
    this.description = this._parseDescription(courseObj?.description[0]);
    this.title = this._parseTitle(courseObj["catalog:title"][0]);

    const aliases = new AliasFactory(
      courseObj["catalog:title"][0],
      courseObj?.["catalog:alternate"],
      this.courseNumber)

    this.alias = aliases.getAliases();
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


  private _parseTitle(titleString: string): string {
    //remove and strip HTML
    titleString = stripHtml(titleString);

    //remove "Please register ...." string from title
    // and remove "Please Register" string from title  TODO:
    //and add alias to the other course
    //regex for "Please Register" and "Please register"
    const reg = /(Please Register|Please register|please register)/;
    const split = titleString.split(reg);

    // if (split.length > 2) {
    //   const alias = new Alias(split[2]);
    //   this.alias = alias;
    // }


    //switch abbreviation to full name
    const abbreviationMap = {
      "Adv": "Advanced",
      "Rdg": "Reading",
    };

    for (const [abbreviation, fullName] of Object.entries(abbreviationMap)) {
      titleString = titleString.replace(abbreviation, fullName);
    }


    return split[0].trim();

  }


  private _parseDescription(descriptionString: string) {
    //remove and strip HTML
    descriptionString = stripHtml(descriptionString);

    //remove x hrs. lect. from end of description
    //regex to recognize "3 hrs. lect." or "3 hrs. sem."
    const re = /\d+ hrs. (lect.|sem.)/;
    //const re = /(\d+)\s*hrs\.\s*lect\./;

    const split = descriptionString.split(re);
    descriptionString = split[0];

    //remove any (...) at end of description string, but not if it is in the middle of the string.
    //example: ..... (Pass/Fail; Approval required) or (Approval required)
    const re2 = /\s*\([^\)]+\)\s*$/;
    const split2 = descriptionString.split(re2);
    descriptionString = split2[0];

    //convert &amp to &
    descriptionString = descriptionString.replace(/&amp;/g, "&");

    //convert â€™ to \x27 (')
    descriptionString = descriptionString.replace(/â€™/g, "\x27");

    //convert â€˜ to \x27 (')
    descriptionString = descriptionString.replace(/â€˜/g, "\x27");

    descriptionString = descriptionString.trim();

    return descriptionString;
  }


  private _parseCourseNumber(code: string): string {
    code = code.trim();

    //remove - Term (eg. -W22 or -S23)
    const re = /-\w\d+/;
    const split = code.split(re);
    code = split[0];

    //remove section identifier (eg. A, B, C, ...) from end
    code = code.slice(0, -1);

    //if the dept section is not 4 characters long, prefix it with the prefix character
    code = code.padStart(8, DEPARTMENT_PREFIX_CHAR);


    return code;

  }

}
