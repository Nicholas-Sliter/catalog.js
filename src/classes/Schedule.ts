
/**
* A schedule class to store the schedule data
* @param {string} schedule the schedule data
* @const {schedule} the converted format of the schedule data
* 
*/


type ScheduleElement = string | null;
const defaultProperties = {
   text: null,
   meetings: []
}


export default class Schedule {

      text: ScheduleElement;
      meetings: [];

      constructor(options: object) {
         Object.assign(this, defaultProperties);
         Object.assign(this, options);
      }
   }