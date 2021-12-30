const defaultProperties = {
    raw: null,
    startTime: null,
    endTime: null,
    startDate: null,
    endDate: null,
    days: [],
    location: null
};
export default class Meeting {
    raw;
    startTime;
    endTime;
    startDate;
    endDate;
    days;
    location;
    constructor(options) {
        Object.assign(this, defaultProperties);
        Object.assign(this, options);
    }
}
