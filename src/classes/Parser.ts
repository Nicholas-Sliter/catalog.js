import Catalog from "./Catalog.js";



export default class Parser {

      catalog: Catalog;
      


      parseCatalog(raw: string): Catalog {
         this.catalog = new Catalog({
            raw: raw
         });

         return this.catalog;
      }

      parseCourse(raw: string): Course {
         return new Course({
            raw: raw
         });
      }




}