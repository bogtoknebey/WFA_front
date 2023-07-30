async function getJSON(url) 
{
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
      .then((response) => response.json())
      .then((json) => {
        return json;
    });
}

async function getCityJSON(id) {
    let url = "https://www.wfaback.realhost-free.net/api/city/" + id;
    return await getJSON(url);
}

async function getForecasterJSON(id) {
    let url = "https://www.wfaback.realhost-free.net/api/forecaster/" + id;
    return await getJSON(url);
}

async function getForecastersJSON() {
    let url = "https://www.wfaback.realhost-free.net/api/forecasters";
    return await getJSON(url);
}

async function getCitiesJSON() {
    let url = "https://www.wfaback.realhost-free.net/api/cities";
    return await getJSON(url);
}

async function getWeatherDayJSON(forecasterId, cityId) {
    let url = "https://www.wfaback.realhost-free.net/api/weatherday/" + forecasterId + "/" + cityId;
    return await getJSON(url);
}

async function getDeviationsJSON(forecasterId, cityId, daysAgo) {
    let url = "https://www.wfaback.realhost-free.net/api/analytics/" + forecasterId + "/" + cityId + "/" + daysAgo;
    return await getJSON(url);
}