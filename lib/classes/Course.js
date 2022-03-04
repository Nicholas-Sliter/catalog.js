import { stripHtml } from "../utils.js";
import Crn from "./Crn.js";
import Department from "./Department.js";
import Instructor from "./Instructor.js";
import Location from "./Location.js";
import Requirement from "./Requirement.js";
import Schedule from "./Schedule.js";
import Subject from "./Subject.js";
import Term from "./Term.js";
import Type from "./Type.js";
import Level from "./Level.js";
import Alias from "./Alias.js";
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
    href;
    code;
    courseNumber;
    description;
    title;
    alternate;
    type;
    department;
    requirements;
    instructors;
    location;
    schedule;
    crn;
    term;
    subject;
    level;
    alias;
    constructor(options) {
        Object.assign(this, defaultProperties);
        this.requirements = []; //to prevent all instances of this class from having the same requirements array
        this.instructors = [];
        //Object.assign(this, options);
        this._parseCourse(options);
    }
    async _parseCourse(courseObj) {
        if (!courseObj) {
            throw new Error("No raw data to parse");
        }
        this.href = courseObj?.link[0];
        this.code = courseObj?.title[0];
        this.courseNumber = this._parseCourseNumber(this.code);
        this.description = this._parseDescription(courseObj?.description[0]);
        this.title = this._parseTitle(courseObj["catalog:title"][0]);
        //this.alternate = courseObj?.alternate[0];
        this.type = new Type(courseObj?.["catalog:genustype"]?.[0]);
        this.location = new Location(courseObj?.["catalog:location"]?.[0]);
        this.schedule = new Schedule(courseObj?.["catalog:schedule"]?.[0]);
        this.crn = new Crn(courseObj?.["catalog:property"]?.[0]);
        const termObj = courseObj?.["catalog:term"]?.[0];
        this.term = new Term(termObj);
        const instructors = courseObj?.["catalog:instructor"];
        if (instructors && instructors?.length > 0) {
            instructors.forEach((instructor) => {
                this.instructors.push(new Instructor(instructor));
            });
        }
        const topics = courseObj["catalog:topic"];
        topics.forEach((topic) => {
            const types = topic.$.type.split("/");
            const topicType = types[types.length - 1];
            if (topicType === "subject") {
                this.subject = new Subject(topic);
            }
            else if (topicType === "department") {
                this.department = new Department(topic);
            }
            else if (topicType === "requirement") {
                const req = new Requirement(topic);
                this.requirements.push(req);
            }
            else if (topicType === "level") {
                this.level = new Level(topic);
            }
        });
    }
    _parseTitle(titleString) {
        //remove and strip HTML
        titleString = stripHtml(titleString);
        //remove "Please register ...." string from title
        // and remove "Please Register" string from title  TODO:
        //and add alias to the other course
        //regex for "Please Register" and "Please register"
        const reg = /(Please Register|Please register)/;
        const split = titleString.split(reg);
        if (split.length > 2) {
            const alias = new Alias(split[2]);
            this.alias = alias;
        }
        return split[0].trim();
    }
    _parseDescription(descriptionString) {
        //remove and strip HTML
        descriptionString = stripHtml(descriptionString);
        //remove x hrs. lect. from end of description
        //regex to recognize "3 hrs. lect."
        const re = /(\d+)\s*hrs\.\s*lect\./;
        const split = descriptionString.split(re);
        descriptionString = split[0];
        //remove (...) at end of description
        //example: ..... (Pass/Fail; Approval required) or (Approval required)
        const re2 = /\(.*\)$/;
        const split2 = descriptionString.split(re2);
        descriptionString = split2[0];
        descriptionString = descriptionString.trim();
        return descriptionString;
    }
    _parseCourseNumber(code) {
        code = code.trim();
        //remove - Term (eg. -W22 or -S23)
        const re = /-\w\d+/;
        const split = code.split(re);
        code = split[0];
        //remove section identifier (eg. A, B, C, ...) from end
        code = code.slice(0, -1);
        return code;
    }
}
