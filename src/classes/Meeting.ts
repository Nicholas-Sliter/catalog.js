import Location from "./Location.js";
import { pad } from "../utils.js";
import dayjs from "dayjs";
import CustomParseFormat from "dayjs/plugin/customParseFormat.js";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
dayjs.extend(CustomParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("America/New_York");

type MeetingElement = string | null;
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
  raw: MeetingElement;
  startTime: MeetingElement;
  endTime: MeetingElement;
  startDate: MeetingElement;
  endDate: MeetingElement;
  days: string[];
  location: Location | null;

  constructor(options: object) {
    Object.assign(this, defaultProperties);
    this.raw = JSON.stringify(options);
    //Object.assign(this, options);
    this._parseMeeting(options);
  }

  private async _parseMeeting(meetingObj: any) {
    const regex = /(.+)-(.+) on (.+?) (at (.+) (.+) )?\((.+) to (.+)\)/;
    const timeFormat = "h:mma";
    const dateFormat = "MMM DD, YYYY";

    const matches = meetingObj.text.match(regex);
    if (matches) {
      const startTime = dayjs(matches[1], timeFormat).tz("America/New_York");
      this.startTime = `${pad(startTime.hour(), 2)}:${pad(
        startTime.minute(),
        2
      )}${startTime.hour() >= 12 ? "pm" : "am"} ET`;
      const endTime = dayjs(matches[2], timeFormat).tz("America/New_York");
      this.endTime = `${pad(endTime.hour(), 2)}:${pad(endTime.minute(), 2)}${
        endTime.hour() >= 12 ? "pm" : "am"
      } ET`;
      this.days = matches[3].split(", ");

      if (matches[4]) {
        this.location = new Location({
          rawID: [matches[5], matches[6]].join("/"),
          href: null,
          text: null,
        });
      }

      //Note: months are 0 indexed
      const startDate = dayjs(matches[7], dateFormat);
      this.startDate = `${startDate.year().toString()}-${pad(
        startDate.month() + 1,
        2
      )}-${pad(startDate.date(), 2)}`;
      const endDate = dayjs(matches[8], dateFormat);
      this.endDate = `${endDate.year().toString()}-${pad(
        endDate.month() + 1,
        2
      )}-${pad(endDate.date(), 2)}`;
    }
  }
}
