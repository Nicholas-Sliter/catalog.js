import Location from "./Location.js";
import dayjs from "dayjs";

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
    //Object.assign(this, options);
    this._parseMeeting(options);
  }

  private async _parseMeeting(meetingObj: any) {
    const regex = /(.+)-(.+) on (.+?) (at (.+) (.+) )?\((.+) to (.+)\)/;
    const timeFormat = "hh:mma";
    const dateFormat = "MMM DD, YYYY";

    const matches = meetingObj.text.match(regex);
    if (matches) {
      this.startTime = dayjs(matches[1], timeFormat).toString();
      this.endTime = dayjs(matches[2], timeFormat).toString();
      this.days = matches[3].split(", ");

      if (matches[4]) {
        this.location = new Location({
          rawId: [matches[5], matches[6]].join("/"),
          href: null,
          text: null
        });
      }

      this.startDate = dayjs(matches[7], dateFormat).toString();
      this.endDate = dayjs(matches[8], dateFormat).toString();
    }
  }
}
