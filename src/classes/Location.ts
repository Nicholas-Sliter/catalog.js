
import CourseInfo from './CourseInfo';

type LocationElement = string | null;
const defaultProperties = {
   room: null,
   building: null,
   id: null
};


/**
 * A class to store the location data, inherits from CourseInfo
 * 
 */
export default class Location extends CourseInfo {
   room: LocationElement;
   building: LocationElement;
   id: LocationElement;

   constructor(options: object) {
      super(options);
      Object.assign(this, defaultProperties);

      this.room = this._parseRoom();
      this.building = this._parseBuilding();
      this.id = this._parseID();

   }

   private _parseRoom(): string {
      let room: string;
      if (this.rawID.indexOf('/') > -1) {
         const splits = this.rawID.split('/');
         room = splits[splits.length - 1];
      } else {
         throw new Error("Location " + this.id + " has no room.");
      }
      return room;
   }

   private _parseBuilding(): string {
      let building: string;
      if (this.rawID.indexOf('/') > -1) {
         const splits = this.rawID.split('/');
         building = splits[splits.length - 2];
      }
      return building;
   }

   private _parseID(): string {
      let id: string;
      if (this.rawID.indexOf('/') > -1) {
         id = [this.building, this.room].join("/");
      }
      else {
         const splits = this.rawID.split('/');
         id = splits[splits.length - 1];
      }
      return id;
   }


}