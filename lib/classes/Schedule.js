/**
 * A schedule class to store the schedule data
 * @param {string} schedule the schedule data
 * @const {schedule} the converted format of the schedule data
 *
 */
import Meeting from "./Meeting.js";
const defaultProperties = {
    text: null,
    meetings: [],
};
export default class Schedule {
    text;
    meetings;
    constructor(scheduleObj) {
        this.text = scheduleObj?.['_'] || null;
        this.meetings = [];
        this._parseSchedule();
    }
    _parseSchedule() {
        if (!this.text) {
            new Error("Schedule text is null");
            return null;
        }
        this.text.split("\n").forEach((meetingString) => {
            const meeting = new Meeting({ text: meetingString });
            this.meetings.push(meeting);
        });
    }
}
