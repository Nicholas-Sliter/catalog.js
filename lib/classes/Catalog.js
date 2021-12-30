const defaultProperties = {
    raw: null,
    href: null,
    term: null,
    courses: [],
};
export default class Catalog {
    raw;
    href;
    term;
    courses;
    constructor(options) {
        Object.assign(this, defaultProperties);
        Object.assign(this, options);
    }
}
