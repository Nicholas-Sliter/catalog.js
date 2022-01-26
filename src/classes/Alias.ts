export default class Alias {
   id: string;

   constructor(courseString: string) {
      this.id = this._parseCourseCode(courseString);
   }


   private _parseCourseCode(courseString: string): string {
         //now remove the via or vis string
         const viaSplits = courseString.split("via");
         if (viaSplits.length > 1) {
            courseString = viaSplits[1];
         }
         //this exists as a typo in the winter 2022 catalog entry for Introduction to the Talmud
         const visSplits = courseString.split("vis");
         if (visSplits.length > 1) {
            courseString = visSplits[1];
         }  

      return courseString.trim();
   }


}