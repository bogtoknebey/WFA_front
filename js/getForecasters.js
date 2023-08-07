async function SetForecasters(){
    // document.getElementById("main-block").display = "none";
    // document.getElementById("load-block").display = "inline";

    var fcJson = await getForecastersJSON();
    console.log(fcJson);

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


    document.getElementById("forecasts-link").addEventListener("click", function() {
        let baseId = 'fc_check_';
        let numId = 0;
        let fullId = baseId + numId;
        let el = document.getElementById(fullId);
        var forecastersIds = [];

        while (el != null && el != undefined){
            let isChecked = document.getElementById(fullId).checked;
            if (isChecked) {
                forecastersIds.push(numId);
            }

            numId += 1;
            fullId = baseId + numId;
            el = document.getElementById(fullId);
        }

        let selectedDate =  document.getElementById("forecast-date").value; // 2023-08-06
        let today = new Date().toISOString().split("T")[0];
        let selectedDateObj = new Date(selectedDate);
        let todayObj = new Date(today);
        let daysAgo = Math.abs(todayObj - selectedDateObj) / 1000 / 3600 / 24; // milliseconds to days

        for (let forecasterId in forecastersIds) {
            for (let cityNum in allCities){
                let cityId = allCities[cityNum][0];
                let currInput = getDeviationsJSON(forecasterId, cityId, daysAgo);
                // TODO add a tables with forecast tabs
            }
        }
    });


    document.getElementById("load-block").style.display = "none";
    document.getElementById("main-block").style.display = "inline";
}

window.onload = SetForecasters;
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