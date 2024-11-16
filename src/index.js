import "./styles.css";
import { Report } from "./Report";
import { Day } from "./Day";

const API_KEY = "SLZAR6BPBTLHBLPUUVF9H6QHU";
const CELSIUS = "metric";
const FAHRENHEIT = "us";

const searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", () => {
    getWeatherReport(...getSearchQuery()).then((report) => {
        renderReport(report);
    });
});

async function getWeatherReport(location, unit) {
    const res = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit === "C" ? CELSIUS : FAHRENHEIT}&key=${API_KEY}`,
    );
    const json = await res.json();

    return getReportObject(json, unit);
}

function getReportObject(json, unit) {
    const location = json.resolvedAddress;

    const week = [];

    for (let i = 0; i < 7; i++) {
        const day = json.days[i];
        week.push(
            new Day(
                day.datetime,
                day.description,
                day.temp,
                day.tempmax,
                day.tempmin,
            ),
        );
    }

    return new Report(location, week, unit);
}

function renderReport(report) {
    const columns = document.querySelectorAll(".day-container");

    for (let i = 0; i < 7; i++) {
        const date = document.createElement("div");
        date.innerText = report.getWeek()[i].getDate();
        date.classList.toggle("day-item");
        const temp = document.createElement("div");
        temp.innerText = `${report.getWeek()[i].getTemp()}° ${report.getUnit()}`;
        temp.classList.toggle("day-item");
        const tempMax = document.createElement("div");
        tempMax.innerText = `${report.getWeek()[i].getTempMax()}° ${report.getUnit()}`;
        tempMax.classList.toggle("day-item");
        const tempMin = document.createElement("div");
        tempMin.innerText = `${report.getWeek()[i].getTempMin()}° ${report.getUnit()}`;
        tempMin.classList.toggle("day-item");
        const description = document.createElement("div");
        description.innerText = report.getWeek()[i].getDescription();
        description.classList.toggle("day-item");

        columns[i].innerHTML = "";
        columns[i].appendChild(date);
        columns[i].appendChild(temp);
        columns[i].appendChild(tempMax);
        columns[i].appendChild(tempMin);
        columns[i].appendChild(description);
    }
}

function getSearchQuery() {
    const locationInput = document.querySelector("#location");
    const unitInput = document.querySelector("#unit");

    let location = locationInput.value;
    let unit = unitInput.value;
    return [location, unit];
}
