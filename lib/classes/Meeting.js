import Location from "./Location.js";
import dayjs from "dayjs";
import CustomParseFormat from "dayjs/plugin/customParseFormat.js";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
dayjs.extend(CustomParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("America/New_York");
const defaultProperties = {
    raw: null,
    startTime: null,
    endTime: null,
    startDate: null,
    endDate: null,
    days: [],
    location: null,
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
        this.raw = JSON.stringify(options);
        //Object.assign(this, options);
        this._parseMeeting(options);
    }
    async _parseMeeting(meetingObj) {
        const regex = /(.+)-(.+) on (.+?) (at (.+) (.+) )?\((.+) to (.+)\)/;
        const timeFormat = "h:mma";
        const dateFormat = "MMM D, YYYY";
        const matches = meetingObj.text.match(regex);
        if (matches) {
            const startTime = dayjs(matches[1], timeFormat).tz("America/New_York");
            this.startTime = startTime.format('h:mm A');
            const endTime = dayjs(matches[2], timeFormat).tz("America/New_York");
            this.endTime = endTime.format('h:mm A');
            this.days = matches[3].split(", ");
            if (matches[4]) {
                this.location = new Location({
                    rawID: [matches[5], matches[6]].join("/"),
                    href: null,
                    text: null,
                }, false);
            }
            const startDate = dayjs(matches[7], dateFormat);
            this.startDate = startDate.format('YYYY-MM-DD');
            const endDate = dayjs(matches[8], dateFormat);
            this.endDate = endDate.format('YYYY-MM-DD');
        }
    }
}
//# sourceMappingURL=Meeting.js.map