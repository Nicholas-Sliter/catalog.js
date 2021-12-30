
/**
* A schedule class to store the schedule data
* @param {string} schedule the schedule data
* @const {schedule} the converted format of the schedule data
* 
*/

import Meeting from "./Meeting.js";


type ScheduleElement = string | null;
const defaultProperties = {
   text: null,
   meetings: []
}


export default class Schedule {
  public text: ScheduleElement;
  public meetings: [Meeting] | [];

  constructor(options: object) {
    this.text = null;
    this.meetings = [];
    Object.assign(this, options);
  }
}