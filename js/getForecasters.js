async function SetForecasters(){
    var fcJson = await getForecastersJSON();
    console.log(fcJson);
    let allCities = await getCitiesJSON();
    console.log(allCities);

    // set date input atributes - min, max, value
    var fcDate = document.getElementById("forecast-date");
    var date = new Date();
    fcDate.max = date.toISOString().split("T")[0];
    date.setDate(date.getDate() - 1);
    fcDate.value = date.toISOString().split("T")[0];
    date.setDate(date.getDate() - 13);
    fcDate.min = date.toISOString().split("T")[0];
    
    var fcList = document.getElementById("forecasters_list");
    let fcListInnerStr = "";
    fcJson.forEach((fc, ind) => {
        console.log(fc);
        
        fcListInnerStr += '<li id="fc_' + ind + '"><p class="default-paragraph">';
        fcListInnerStr += '<input type="checkbox" id="fc_check_' + ind + '">';
        fcListInnerStr += fc.Name + ' <a href="' + fc.BaseLink +'">' + fc.BaseLink + '</a>';
        fcListInnerStr += '</p></li>';
    });
    fcList.innerHTML = fcListInnerStr;

    // get forecast analitics
    document.getElementById("forecasts-link").addEventListener("click", function() {
        let baseId = 'fc_check_';
        let numId = 0;
        let fullId = baseId + numId;
        let el = document.getElementById(fullId);
        var forecastersIds = [];

        while (el != null && el != undefined) {
            let isChecked = document.getElementById(fullId).checked;
            if (isChecked)
                forecastersIds.push(numId);
            numId += 1;
            fullId = baseId + numId;
            el = document.getElementById(fullId);
        }

        // clear main element
        let mainElement = document.getElementById("all-forcasts-tables");
        mainElement.style.display = "none";
        mainElement.innerHTML = '';

        // create and append menu element
        const menu = document.createElement("nav");
        const tabList = document.createElement("ul");
        tabList.setAttribute("class", "table-menu");
        fcJson.forEach((fc, ind) => {
            let currTabListElement = document.createElement("li");
            let classStr = "table-tab";
            if (ind == 0)
                classStr += " table-tab-first";
            currTabListElement.setAttribute('class', classStr);
            currTabListElement.setAttribute('id', `li-table-${ind}`);
            currTabListElement.textContent = fc.Name;
            tabList.appendChild(currTabListElement);
        });
        menu.appendChild(tabList);
        mainElement.appendChild(menu);
        
        // get selected date
        let selectedDate =  document.getElementById("forecast-date").value; // 2023-08-06
        let today = new Date().toISOString().split("T")[0];
        let selectedDateObj = new Date(selectedDate);
        let todayObj = new Date(today);
        let daysAgo = Math.abs(todayObj - selectedDateObj) / 1000 / 3600 / 24; // milliseconds to days

        // table main cycle
        // TODO: add alter tables (with absolute temperature values)
        for (let forecasterId in forecastersIds) {
            // set table element
            let currTableId = 'fc-table-' + forecasterId; 
            let currTable = document.createElement("table");
            currTable.setAttribute('id', currTableId);
            currTable.setAttribute('class', 'hour_day');
            mainElement.appendChild(currTable);
            currTable = document.getElementById(currTableId);

            // add head row in current table
            let headRow = document.createElement("tr");

            let td = document.createElement("td");
            td.textContent = `Forecaster #${forecasterId}`;
            headRow.appendChild(td);
            td = document.createElement("td");
            td.textContent = "00:00";
            headRow.appendChild(td);
            td = document.createElement("td");
            td.textContent = "03:00";
            headRow.appendChild(td);
            td = document.createElement("td");
            td.textContent = "06:00";
            headRow.appendChild(td);
            td = document.createElement("td");
            td.textContent = "09:00";
            headRow.appendChild(td);
            td = document.createElement("td");
            td.textContent = "12:00";
            headRow.appendChild(td);
            td = document.createElement("td");
            td.textContent = "15:00";
            headRow.appendChild(td);
            td = document.createElement("td");
            td.textContent = "18:00";
            headRow.appendChild(td);
            td = document.createElement("td");
            td.textContent = "21:00";
            headRow.appendChild(td);
            
            currTable.appendChild(headRow);
            
            // add other rows
            for (let cityNum in allCities) {
                let currCity = allCities[cityNum];
                let cityId = currCity.Id;
                console.log("forecaster id: " + forecasterId + " cityId: " + cityId);

                // get promise with data
                var currInput = getDeviationsJSON(forecasterId, cityId, daysAgo);

                // handle promise with data
                currInput.then(function (data) {
                    deviations = data[0];
                    biggestDeviations = data[1];
                    weatherHours = data[2];

                    // no data check
                    if (Object.keys(deviations).length < 1 || Object.keys(biggestDeviations).length < 1 || Object.keys(weatherHours).length < 1) {
                        console.log("no data");
                        return;
                    }
                    console.log("cityId: " + cityId);
                    console.log(`cityId: ${cityId}, its deviations, biggestDeviations, weatherHours: `);
                    console.log(deviations);
                    console.log(biggestDeviations);
                    console.log(weatherHours);

                    const currRow = document.createElement("tr");

                    // add head td
                    td = document.createElement("td");
                    td.textContent = currCity.UkrainianTranslit;
                    currRow.appendChild(td);

                    // add others td
                    for (let num in biggestDeviations) {
                        td = document.createElement("td");
                        td.textContent = biggestDeviations[num];
                        currRow.appendChild(td);
                    }
                        
                    currTable.appendChild(currRow);
                });
            }
        }
        
        // do it viewtable
        mainElement.style.display = "inline";
    });
    

    document.getElementById("load-block").style.display = "none";
    document.getElementById("main-block").style.display = "inline";
}

window.onload = SetForecasters;

/*
    <div id="all-forcasts-tables" class="medium-div hidden">
        <nav><ul class="table-menu">
            <li class="table-tab-first table-tab"><a class="table-tab-link" href="cities.html">Cities</a></li>
            <li class="tab-table"><a class="table-tab-link" href="forecasters.html">Forecasters</a></li>
        </ul></nav>

        ..Space for tables..

    </div>
*/

/*
    <li>
        <p class="default-paragraph">
            Sinoptik 
            <a href="https://sinoptik.ua/">https://sinoptik.ua/</a>
        </p>
    </li>
    <li>
        <p class="default-paragraph">
            Gismeteo 
            <a href="https://www.gismeteo.ua/">https://www.gismeteo.ua/</a>
        </p>
    </li>
    <li>
        <p class="default-paragraph">
            Meteo 
            <a href="https://meteo.ua/">https://meteo.ua/</a>
        </p>
    </li>
*/