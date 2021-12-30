/**
* A schedule class to store the schedule data
* @param {string} schedule the schedule data
* @const {schedule} the converted format of the schedule data
*
*/
const defaultProperties = {
    text: null,
    meetings: []
};
export default class Schedule {
    text;
    meetings;
    constructor(options) {
        this.text = null;
        this.meetings = [];
        Object.assign(this, options);
    }
}
