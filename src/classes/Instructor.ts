
type InstructorElement = string | null;
const defaultProperties = {
   name: null,
   middleburyId: null,

};


export default class Instructor {
   name: InstructorElement;
   middleburyId: InstructorElement;

   constructor(options: object) {
      Object.assign(this, defaultProperties);
      Object.assign(this, options);
   }

}