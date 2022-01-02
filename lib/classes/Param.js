export default class Param {
    name;
    value;
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
    getObject() {
        return {
            name: this.name,
            value: this.value
        };
    }
}
