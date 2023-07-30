function selectCity(){
    let cityId = event.target.id.slice(5);
    sessionStorage.cityId = JSON.stringify(cityId);
}

async function setCities(){
    let citiesJson = await getCitiesJSON();
    let list = document.getElementById("cities_list");
    
    list.innerHTML = "";
    citiesJson.forEach((city, ind) => {
        let name = city.UkrainianTranslit;
        let upCaseName = name.charAt(0).toUpperCase() + name.slice(1);
        let id = "city_" +  ind;

        let liStr = "";
        liStr += '<li><p class="default-paragraph">';
        // innerStr += '<a class="li-link" id="city_' + ind + '" onclick="selectCity()" href="city.html">' + upCaseName + '</a>';
        liStr += '<a class="li-link" id="' + id + '">' + upCaseName + '</a>';
        liStr += '</p></li>';
        list.innerHTML += liStr;

        //document.getElementById(id).addEventListener("click", selectCity);
    });

    citiesJson.forEach((city, ind) => {
        let id = "city_" +  ind;
        document.getElementById(id).addEventListener("click", function() {
            let cityId = event.target.id.slice(5);
            sessionStorage.cityId = JSON.stringify(cityId);
            location.replace("./city.html")
        });
    });


    document.getElementById("load-block").style.display = "none";
    document.getElementById("main-block").style.display = "inline";
}


setCities();
/*    
    <ul id="cities_list">
        <li>
            <p class="default-paragraph">
                <a class="li-link" id="city_0" onclick='selectCity()' href="city.html">Город 1</a>
            </p>
        </li>
        <li>
            <p class="default-paragraph">
                <a class="li-link" href="city.html">Город 2</a>
            </p>
        </li>
        <li>
            <p class="default-paragraph">...</p>
        </li>
        <li>
            <p class="default-paragraph">
                <a class="li-link" href="city.html">Город 4</a>
            </p>
        </li>
    </ul>  
*/