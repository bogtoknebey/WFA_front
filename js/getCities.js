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
        liStr += '<a class="li-link" id="' + id + '">' + upCaseName + '</a>';
        liStr += '</p></li>';
        list.innerHTML += liStr;
    });

    // click(go throught the link) and mousemove(color change) events
    citiesJson.forEach((city, ind) => {
        let id = "city_" +  ind;
        let currCity = document.getElementById(id);
        currCity.addEventListener("click", function() {
            let cityId = event.target.id.slice(5);
            sessionStorage.cityId = JSON.stringify(cityId);
            location.replace("./city.html")
        });
        currCity.addEventListener("mousemove", function() {
            event.target.style.backgroundColor = "white";
        });
        currCity.addEventListener("mouseout", function() {
            event.target.style.backgroundColor = event.target.parentElement.style.backgroundColor;
        });
    });


    // search event
    let search = document.getElementById("citySearch");
    search.addEventListener("search", function() {
        let searchStr = event.target.value;
        let allCities = document.getElementsByClassName("li-link");
        for (var i = 0; i < allCities.length; i++) {
            let currCity = allCities[i];
            if (currCity.innerHTML.toLowerCase().includes(searchStr.toLowerCase()))
                currCity.style.display = "inline";
            else
                currCity.style.display = "none";
        }
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