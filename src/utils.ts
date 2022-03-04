export function stripHtml(html: string): string {
    //remove newline chars and replace it with a space
    html = html.replace(/[\r\n]/g, ' ');
    //remove html tags
    return html.replace(/<[^>]*>?/gm, '');
}

export function pad(num: number, places: number, padCharacter = "0") {
  return String(num).padStart(places, padCharacter);
}