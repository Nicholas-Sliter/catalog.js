export function stripHtml(html) {
    //remove newline chars and replace it with a space
    html = html.replace(/[\r\n]/g, ' ');
    //remove html tags
    return html.replace(/<[^>]*>?/gm, '');
}
export function pad(num, places, padCharacter = "0") {
    return String(num).padStart(places, padCharacter);
}
export function isCourseID(id) {
    return id.length === 8 && /^(_[A-Z]{3}|[A-Z]{4})\d{4}$/.test(id);
}
