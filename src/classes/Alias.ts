export default class Alias {
   courseCode: string;

   constructor(courseString: string) {
      this.courseCode = this._parseCourseCode(courseString);
   }


   private _parseCourseCode(courseString: string): string {

      //split and remove Please register string
      const splits = courseString.split("Please register");
      if (splits.length > 1) {
         courseString = splits[2];
         //now remove the via or vis string
         const viaSplits = courseString.split("via");
         if (viaSplits.length > 1) {
            courseString = viaSplits[0];
         }
         //this exists as a typo in the winter 2022 catalog entry for Introduction to the Talmud
         const visSplits = courseString.split("vis");
         if (visSplits.length > 1) {
            courseString = visSplits[0];
         }  
      }

      return courseString;
   }


}