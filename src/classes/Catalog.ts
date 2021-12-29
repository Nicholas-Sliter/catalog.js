import Term from './Term'; 
import Course from './Course';

type CatalogElement = string | null;
const defaultProperties = {
   raw: null,
   href: null,
   term: null,
   courses: [],
};


class Catalog {
   raw: string;
   href: string;
   term: Term;
   courses: [Course];

   constructor(options) {
      Object.assign(this, defaultProperties);
      Object.assign(this, options);

   }



}
