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
    href;
    code;
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
    constructor(options) {
        Object.assign(this, defaultProperties);
        Object.assign(this, options);
    }
}
