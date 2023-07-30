function timeFormat(hour){
    // example: 0 -> 00:00
    hour = "" + hour;
    if (hour.length == 1)
        hour = "0" + hour;
    hour += ":00";
    return hour;
}