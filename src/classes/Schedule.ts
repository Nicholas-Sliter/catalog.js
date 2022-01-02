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
  meetings: [],
};

export default class Schedule {
  public text: ScheduleElement;
  public meetings: Meeting[];

  constructor(scheduleObj: any) {
    this.text = scheduleObj?.['_'] || null;
    this.meetings = [];
    this._parseSchedule();
  }

  private _parseSchedule(): void {
    if (!this.text) {
      throw new Error("Schedule text is null");
    }

    this.text.split("\n").forEach((meetingString) => {
      const meeting = new Meeting({ text: meetingString });
      this.meetings.push(meeting);
    });
  }
}
