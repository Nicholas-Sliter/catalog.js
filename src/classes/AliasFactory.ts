import { isCourseID, stripHtml } from "../utils.js";
import Alias from "./Alias.js";

export default class AliasFactory {

    private aliases: Map<string, Alias>;


    constructor(titleString: string, alternates: { _: string; $: { href: string; }; }[], courseID: string) {
        this.aliases = new Map<string, Alias>();
        const ids = new Set();

        const titleID = this._parseIDFromTitle(titleString);
        if (titleID && isCourseID(titleID) && titleID !== courseID) {
            ids.add(titleID);
        }

        const alternateIDs = this._parseIDsFromAlternateArray(alternates);
        alternateIDs.forEach((alternateID) => {
            if (alternateID && isCourseID(alternateID) && alternateID !== courseID) {
                ids.add(alternateID);
            }
        });

        ids.forEach((id: string) => {
            this.aliases.set(id, new Alias(id));
        });

    }


    public getAliases(): Alias[] {
        return Array.from(this.aliases.values());
    }


    private _parseIDFromTitle(titleCourseString: string): string {

        const titleString = stripHtml(titleCourseString);
        const reg = /(Please Register|Please register|please register)/;
        const split = titleString?.split(reg);

        if (split.length < 3) {
            return "";
        }

        let courseString = split[2];

        //now remove the via or vis string
        const viaSplits = courseString?.split("via") ?? [];
        if (viaSplits.length > 1) {
            courseString = viaSplits[1];
        }
        //this exists as a typo in the winter 2022 catalog entry for Introduction to the Talmud
        const visSplits = courseString?.split("vis") ?? [];
        if (visSplits.length > 1) {
            courseString = visSplits[1];
        }

        return courseString.trim();
    }

    private _parseIDFromAlternate(alternate: {
        _: string;
        $: {
            href: string;
        }
    }): string {

        if (!alternate) {
            return "";
        }

        return alternate?._?.split("-")?.[0]?.slice(0, -1) ?? "";

    }


    private _parseIDsFromAlternateArray(alternates: {
        _: string;
        $: {
            href: string;
        }
    }[]): string[] {

        if (!alternates) {
            return [];
        }

        return alternates?.map((alternate) => this._parseIDFromAlternate(alternate));

    }

}