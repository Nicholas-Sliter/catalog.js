
import Location from './Location.js';

type MeetingElement = string | null;
const defaultProperties = {
   raw: null,
   startTime: null,
   endTime: null,
   startDate: null,
   endDate: null,
   days: [],
   location: null
}


export default class Meeting {

   raw: MeetingElement;
   startTime: MeetingElement;
   endTime: MeetingElement;
   startDate: MeetingElement;
   endDate: MeetingElement;
   days: [];
   location: Location | null;

   
      constructor(options: object) {
         Object.assign(this, defaultProperties);
         Object.assign(this, options);
      }
   





}