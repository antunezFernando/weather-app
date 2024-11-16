export class Report {
    #location;
    #week;
    #unit;

    constructor(location, week, unit) {
        this.#location = location;
        this.#week = week;
        this.#unit = unit;
    }

    getLocation() {
        return this.#location;
    }

    getWeek() {
        return this.#week;
    }

    getUnit() {
        return this.#unit;
    }
}
