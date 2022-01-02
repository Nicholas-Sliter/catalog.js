import Term from './Term.js'; 
import Course from './Course.js';

type CatalogElement = string | null;
const defaultProperties = {
   raw: null,
   href: null,
   term: null,
   courses: [],
};


export default class Catalog {
  raw: string;
  href: string;
  term: Term;
  courses: Course[];

  constructor(options) {
    Object.assign(this, defaultProperties);
    Object.assign(this, options);
    this._parseCatalog();
  }

  private async _parseCatalog() {
    if (!this.raw) {
      throw new Error("No raw data to parse");
    }

    const catalogObj = await JSON.parse(this.raw);

    if (!this.href) {
      this.href = catalogObj?.rss.channel[0].link[0];
    }

    if (!this.term) {
      const termObj = catalogObj?.rss.channel[0]["catalog:chosen_term"][0];
      console.log(termObj);
      this.term = new Term(termObj);
      console.log(this.term);
    }

    if (this.courses.length === 0) {
      catalogObj.rss.channel[0].item.forEach(async (courseObj) => {
        const course = new Course(courseObj);
        this.courses.push(course);
      });
    }
  }
}
