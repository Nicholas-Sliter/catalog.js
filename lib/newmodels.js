class Catalog {
    raw;
    href;
    term;
    constructor(options) {
        _.defaults(options || (options = {}), {
            href: null,
            term: null,
            courses: []
        });
        _.extend(this, options);
    }
}
export {};
