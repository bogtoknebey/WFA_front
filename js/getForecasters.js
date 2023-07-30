async function SetForecasters(){
    // document.getElementById("main-block").display = "none";
    // document.getElementById("load-block").display = "inline";

    var fcJson = await getForecastersJSON();
    console.log(fcJson);

    var fcList = document.getElementById("forecasters_list");
    let fcListInnerStr = "";
    fcJson.forEach((fc, ind) => {
        console.log(fc);
        
        fcListInnerStr += '<li id="fc_' + ind + '"><p class="default-paragraph">';
        fcListInnerStr += fc.Name + ' <a href="' + fc.BaseLink +'">' + fc.BaseLink + '</a>';
        fcListInnerStr += '</p></li>';
    });
    fcList.innerHTML = fcListInnerStr;

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