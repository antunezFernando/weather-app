export class Day {
    #date;
    #description;
    #temp;
    #tempMax;
    #tempMin;

    constructor(date, description, temp, tempMax, tempMin) {
        this.#date = date;
        this.#description = description;
        this.#temp = temp;
        this.#tempMax = tempMax;
        this.#tempMin = tempMin;
    }

    getDate() {
        return this.#date;
    }

    getDescription() {
        return this.#description;
    }

    getTemp() {
        return this.#temp;
    }

    getTempMax() {
        return this.#tempMax;
    }

    getTempMin() {
        return this.#tempMin;
    }
}
