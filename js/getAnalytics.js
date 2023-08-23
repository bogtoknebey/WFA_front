async function SetAnalytics(forecasterId, cityId, daysAgo) {
    var input = await getDeviationsJSON(forecasterId, cityId, daysAgo);
    console.log(input);

    let deviationData = document.getElementById("deviation_data");
    let deviationDataInnerStr = "";

    if (!Object.hasOwn(input, '0')) {
        deviationData.innerHTML = "There is no data by selected parameters.";
        document.getElementById("load-block").style.display = "none";
        document.getElementById("main-block").style.display = "inline";
        document.getElementById("switch_table_btn").style.display = "none";
        return;
    } else {
        console.log(Object.keys(input[0]).length);
        if (Object.keys(input[0]).length == 0) {

            deviationData.innerHTML = "There is no data by selected parameters.";
            document.getElementById("load-block").style.display = "none";
            document.getElementById("main-block").style.display = "inline";
            document.getElementById("switch_table_btn").style.display = "none";
            return;
        }
    }   

    var forecaster = await getForecasterJSON(forecasterId);
    var city = await getCityJSON(cityId);

    var deviations = input[0];
    var biggestDeviations = input[1];
    var weatherHours = input[2];

    console.log(deviations);
    console.log(biggestDeviations);
    console.log(weatherHours);

    let cityName =  city.UkrainianTranslit;
    let forecasterName = forecaster.Name;
    let dateStr = Object.keys(deviations)[0].split('T')[0];
    deviationDataInnerStr +=  cityName.charAt(0).toUpperCase() + cityName.slice(1) + ", ";
    deviationDataInnerStr +=  forecasterName.charAt(0).toUpperCase() + forecasterName.slice(1) + ", ";
    deviationDataInnerStr +=  dateStr;

    deviationData.innerHTML = deviationDataInnerStr;

    // allDeviation
    // biggestDeviation
    let allDeviationElement = document.getElementById("allDeviation");
    let biggestDeviationElement = document.getElementById("biggestDeviation");
    let allWeatherHours = document.getElementById("allWeatherHours");
    let allDeviationInnerStr = "";
    let biggestDeviationInnerStr = "";
    let allWeatherHoursInnerStr = "";


    // Diviations table
    allDeviationInnerStr += "</br>";
    allDeviationInnerStr += "All deviations";
    allDeviationInnerStr += '<table id="deviations_table" class="hour_day">';

    // header of table
    allDeviationInnerStr += "<tr><td>Time of deviation</td>";
    let firtsDeviationSet = deviations[Object.keys(deviations)[0]];
    for (let hour in firtsDeviationSet) {
        allDeviationInnerStr += "<td>" + timeFormat(hour) +"</td>"
    }
    allDeviationInnerStr += "</tr>"
    
    // body of table
    for (let dateTime in deviations) {
        allDeviationInnerStr += "<tr>";
        allDeviationInnerStr += "<td>" + dateTime.split('T')[1] + "</td>";
        let currentDeviations = deviations[dateTime];
        for (let hour in currentDeviations) {
            allDeviationInnerStr += "<td>" + currentDeviations[hour] + "</td>";
        }
        allDeviationInnerStr += "</tr>";
    }

    // add the biggest deviation row
    allDeviationInnerStr += "<tr></tr>";
    allDeviationInnerStr += "<tr>";
    allDeviationInnerStr += "<td>Biggest of all time</td>";
    for (let hour in biggestDeviations) {
        allDeviationInnerStr += '<td>' + biggestDeviations[hour] + '</td>';
    }
    allDeviationInnerStr += "</tr>";

    allDeviationInnerStr += '</table>';
    allDeviationInnerStr += '</br>';
    allDeviationElement.innerHTML = allDeviationInnerStr;
    allDeviationElement.style.display = "inline";


    // WeatherHours table
    allWeatherHoursInnerStr += "</br>";
    allWeatherHoursInnerStr += "All forecasts";
    allWeatherHoursInnerStr += '<table id="weather_hours_table" class="hour_day">';

    // header of table
    allWeatherHoursInnerStr += "<tr><td>Time of forecast</td>";
    let firtsWeatherHoursSet = weatherHours[Object.keys(weatherHours)[0]];
    for (let num in firtsWeatherHoursSet) {
        allWeatherHoursInnerStr += "<td>" + timeFormat(firtsWeatherHoursSet[num].Hour) +"</td>"
    }
    allWeatherHoursInnerStr += "</tr>"
    
    // body of table
    for (let dateTime in weatherHours) {
        allWeatherHoursInnerStr += "<tr>";
        allWeatherHoursInnerStr += "<td>" + dateTime.split('T')[1] + "</td>";
        let currentWeatherHours = weatherHours[dateTime];
        for (let num in currentWeatherHours) {
            allWeatherHoursInnerStr += "<td>" + currentWeatherHours[num].Temperature + "</td>";
        }
        allWeatherHoursInnerStr += "</tr>";
    }

    // add the biggest deviation row
    allWeatherHoursInnerStr += "<tr></tr>";
    allWeatherHoursInnerStr += "<tr>";
    allWeatherHoursInnerStr += "<td>Biggest of all time</td>";
    for (let hour in biggestDeviations) {
        allWeatherHoursInnerStr += '<td>' + biggestDeviations[hour] + '</td>';
    }
    allWeatherHoursInnerStr += "</tr>";

    allWeatherHoursInnerStr += '</table>';
    allWeatherHoursInnerStr += '</br>';
    allWeatherHours.innerHTML = allWeatherHoursInnerStr;
    allWeatherHours.style.display = "none";


    // <div id="allDeviation" class="medium-div">
    // </div>
    // <div id="allWeatherHours" class="medium-div">
    // </div>
    // add Listener to switch button
    document.getElementById("switch_table_btn").addEventListener("click", function() {
        let tables = [document.getElementById("allDeviation"), document.getElementById("allWeatherHours")];
        for (let tableNum in tables) {
            let display = tables[tableNum].style.display;
            if (display == "none") {
                display = "inline";
            } else if (display == "inline"){
                display = "none";
            }
            tables[tableNum].style.display = display;
        }
    });




    // biggestDeviationInnerStr += "Biggest Deviations during all day";
    // biggestDeviationInnerStr += '<table class="hour_day">';
    // biggestDeviationInnerStr += "<tr><td>Hour</td><td>Deviation</td></tr>";
    // for (let hour in biggestDeviations) {
    //     biggestDeviationInnerStr += '<tr>';
    //     biggestDeviationInnerStr += '<td>' + timeFormat(hour) + '</td><td>' + biggestDeviations[hour] + '</td>';
    //     biggestDeviationInnerStr += '</tr>';
    // }
    // biggestDeviationInnerStr += '</table>';
    // biggestDeviationElement.innerHTML = biggestDeviationInnerStr;

    document.getElementById("load-block").style.display = "none";
    document.getElementById("main-block").style.display = "inline";
}

/*
        <div class="page-header">Analytics</div>
        <p id="deviation_data" class="nopadding-paragraph">Имя города, Имя предсказателя, Дата</p>

        <div id="allDeviation" class="medium-div">
            Deviations by hours
        </div>
        <div id="biggestDeviation" class="medium-div">
            Biggest Deviations during all day
        </div>
*/

let cityId = JSON.parse(sessionStorage.cityId);
let forecasterId = JSON.parse(sessionStorage.forecasterId); 
let daysAgo = 0;

window.onload = SetAnalytics(forecasterId, cityId, daysAgo);