import Term from './Term.js'; 
import Course from './Course.js';

type CatalogElement = string | null;
const defaultProperties = {
   raw: null,
   href: null,
   term: null,
};


export default class Catalog {
  raw: string;
  href: string;
  term: Term;
  courses: Course[];

  constructor(options, clean = false) {
    Object.assign(this, defaultProperties);
    this.courses = []
    Object.assign(this, options);
    this._parseCatalog();
    if (clean) {
      this._cleanCatalog();
    }
  }

  private async _parseCatalog() {
    if (!this.raw) {
      const e: Error = new Error("No raw data to parse");
      console.error(e);
      return;
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

  public clean():void{
    this._cleanCatalog();
  }

  private _cleanCatalog():void {
    //remove extraneous courses like lab and discussion sections
    this.courses = this.courses.filter((course) => {
      return course.type.text !== "Lab" && course.type.text !== "Discussion";


    });
    


  }


}
