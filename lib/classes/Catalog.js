import Term from './Term.js';
import Course from './Course.js';
const defaultProperties = {
    raw: null,
    href: null,
    term: null,
};
export default class Catalog {
    raw;
    href;
    term;
    courses;
    constructor(options) {
        Object.assign(this, defaultProperties);
        this.courses = [];
        Object.assign(this, options);
        this._parseCatalog();
    }
    async _parseCatalog() {
        if (!this.raw) {
            const e = new Error("No raw data to parse");
            console.error(e);
            return;
        }
        const catalogObj = await JSON.parse(this.raw);
        if (!this.href) {
            this.href = catalogObj?.rss.channel[0].link[0];
        }
        if (!this.term) {
            const termObj = catalogObj?.rss.channel[0]["catalog:chosen_term"][0];
            this.term = new Term(termObj);
        }
        if (this.courses.length === 0) {
            catalogObj.rss.channel[0].item.forEach(async (courseObj) => {
                const course = new Course(courseObj);
                this.courses.push(course);
            });
        }
    }
}
//# sourceMappingURL=Catalog.js.map