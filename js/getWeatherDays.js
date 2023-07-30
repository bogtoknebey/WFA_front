async function SetWeatherDay(forecasterId, cityId){
    var wdJson = await getWeatherDayJSON(forecasterId, cityId);
    console.log(wdJson);

    var cityJson = wdJson.City;
    var forecasterJson = wdJson.Forecaster;
    var whJson = wdJson.WeatherHours;
    var date = wdJson.Date;

    // <div id="city">Имя города</div>
    let str =  cityJson.UkrainianTranslit;
    document.getElementById("city").innerHTML = str.charAt(0).toUpperCase() + str.slice(1);

    document.getElementById("forecast_date").innerHTML = date;

    var allForcasts = document.getElementById("allForcasts");
    let allForcastsInnerStr = "";

    // <p id="f_0">Имя Предсказателя 0</p>
    allForcastsInnerStr += '<p id="f_0">' + forecasterJson.Name + '</p>';
    allForcastsInnerStr += '<table class="hour_day" id="hour_day_0">';
    allForcastsInnerStr += "<tr><td>Hour</td><td>Temperature</td></tr>"
    whJson.forEach((wh) => {
        allForcastsInnerStr += '<tr>';
        allForcastsInnerStr += '<td>' + wh.Hour + '</td><td>' + wh.Temperature + '</td>'
        allForcastsInnerStr += '</tr>';
    });
    allForcastsInnerStr += '</table>';
    allForcasts.innerHTML = allForcastsInnerStr;


    document.getElementById("load-block").style.display = "none";
    document.getElementById("main-block").style.display = "inline";
    /*
    <div id="city">Имя города</div>
    <div id="allForcasts">
        <p id="f_0">Имя Предсказателя 0</p>
        <div id="forecast_date_0"></div>
        <table class="hour_day" id="hour_day_0">
            <tr>
                <td>Hour</td><td>Temperature</td>
            </tr>
            <tr>
                <td>0</td><td>19</td>
            </tr>
            <tr>
                <td>3</td><td>17</td>
            </tr>
            <tr>
                <td>6</td><td>16</td>
            </tr>
            <tr>
                <td>9</td><td>21</td>
            </tr>
            <tr>
                <td>12</td><td>24</td>
            </tr>
            <tr>
                <td>15</td><td>25</td>
            </tr>
            <tr>
                <td>18</td><td>25</td>
            </tr>
            <tr>
                <td>21</td><td>22</td>
            </tr>
        </table>

        <p id="f_1">Имя Предсказателя 1</p>
        <div id="forecast_date_1"></div>
        <table class="hour_day" id="hour_day_1">
            <tr>
                <td>Hour</td><td>Temperature</td>
            </tr>
            <tr>
                <td>0</td><td>19</td>
            </tr>
            <tr>
                <td>3</td><td>17</td>
            </tr>
            <tr>
                <td>6</td><td>16</td>
            </tr>
            <tr>
                <td>9</td><td>21</td>
            </tr>
            <tr>
                <td>12</td><td>24</td>
            </tr>
            <tr>
                <td>15</td><td>25</td>
            </tr>
            <tr>
                <td>18</td><td>25</td>
            </tr>
            <tr>
                <td>21</td><td>22</td>
            </tr>
        </table>
    </div>
     */
}
let cityId = JSON.parse(sessionStorage.cityId);
let forecasterId = JSON.parse(sessionStorage.forecasterId); 
window.onload = SetWeatherDay(forecasterId, cityId);