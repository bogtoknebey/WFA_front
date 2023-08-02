async function SetCity(id){
    var cityJson = await getCityJSON(id);
    console.log(cityJson);
    var fcJson = await getForecastersJSON();
    console.log(fcJson);
    
    var name = document.getElementById("name");
    let str =  cityJson.UkrainianTranslit;
    name.innerHTML = str.charAt(0).toUpperCase() + str.slice(1);

    var link = document.getElementById("link");
    link.href = "https://www.google.com.ua/maps/@" + cityJson.latitude + "," + cityJson.longitude + ",13z?entry=ttu";

    let fcNum = 0;
    var fcList = document.getElementById("forecasters_ul");
    let fcListInnerStr = "";

    fcJson.forEach((fc, ind) => {
        console.log(fc);
        let className = "";
        if (ind == 0)
            className = "forecasters_li_first";
        else
            className = "forecasters_li";

        fcListInnerStr += '<li class="' + className + '" id="fc_' + ind + '">';
        fcListInnerStr += fc.Name + ' <input type="checkbox" id="fc_check_' + ind + '">';
        fcListInnerStr += '</li>';
    });
    
    fcList.innerHTML = fcListInnerStr;

    document.getElementById("city_forecast_link").addEventListener("click", function() {
        
        /*
        let baseId = 'fc_check_';
        let numId = 0;
        let fullId = baseId + numId;
        let el = document.getElementById(fullId);

        while (el != null && el != undefined){
            let isChecked = document.getElementById(fullId).checked;
            if (isChecked){
                sessionStorage.forecasterId = JSON.stringify(numId);
            }

            numId += 1;
            fullId = baseId + numId;
            el = document.getElementById(fullId);
        }
        */

        if (document.getElementById('fc_check_0').checked){
            sessionStorage.forecasterId = JSON.stringify(0);
        }
        if (document.getElementById('fc_check_1').checked){
            sessionStorage.forecasterId = JSON.stringify(1);
        }
        if (document.getElementById('fc_check_2').checked){
            sessionStorage.forecasterId = JSON.stringify(2);
        }
        
        location.replace("./city_forecast.html")
    });
    document.getElementById("city_analytics_link").addEventListener("click", function() {
        if (document.getElementById('fc_check_0').checked){
            sessionStorage.forecasterId = JSON.stringify(0);
        }
        if (document.getElementById('fc_check_1').checked){
            sessionStorage.forecasterId = JSON.stringify(1);
        }
        if (document.getElementById('fc_check_2').checked){
            sessionStorage.forecasterId = JSON.stringify(2);
        }
        
        location.replace("./analytics.html")
    });

    document.getElementById("load-block").style.display = "none";
    document.getElementById("main-block").style.display = "inline";
}

let cityId = JSON.parse(sessionStorage.cityId); 
SetCity(cityId);

