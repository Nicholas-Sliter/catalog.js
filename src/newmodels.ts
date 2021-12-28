import Term from './term'; 

class Catalog {
   raw: string;
   href: string;
   term: Term;


   


   constructor(options) {
      _.defaults(options || (options = {}), {
         href: null,
         term: null,
         courses: []
      });
   
      _.extend(this, options);
   }



}