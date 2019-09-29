/**
 * 时间戳转成yyyy-mm-dd HH:MM:SS格式
 * @param  {} timetemp时间戳
 */
function timetempToTime(timetemp) {
    var dateTime = new Date(timetemp);
    var year = dateTime.getFullYear();
    var month = Number(dateTime.getMonth()) + 1;
    month = month < 10 ? '0' + month : month;
    var day = dateTime.getDate();
    day = day < 10 ? '0' + day : day;
    var hour = dateTime.getHours();
    hour = hour < 10 ? '0' + hour : hour;
    var minute = dateTime.getMinutes();
    minute = minute < 10 ? '0' + minute : minute;
    var second = dateTime.getSeconds();
    second = second < 10 ? '0' + second : second;
    var result = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    return result;
}
/** 
 * 秒算成 小时分钟秒的格式
 * @param  {} seconds  秒
 */
function formatSeconds(seconds) {
    var result = parseInt(seconds);
    var h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
    var m = Math.floor(result / 60 % 60) < 10 ? '0' + Math.floor(result / 60 % 60) : Math.floor(result / 60 % 60);
    var s = Math.floor(result % 60) < 10 ? '0' + Math.floor(result % 60) : Math.floor(result % 60);
    if (h > 0) {
        result = h + "小时" + m + "分钟" + s + "秒";
    } else if (h == 0 && m > 0) {
        result = m + "分钟" + s + "秒";
    } else {
        result = s + "秒";
    }
    return result;
}

/** 
 * 获取当前时间yyyy-mm-dd HH:MM:SS
 */
function getNowTime() {
    var dateTime = new Date();
    var year = dateTime.getFullYear();
    var month = Number(dateTime.getMonth()) + 1;
    month = month < 10 ? '0' + month : month;
    var day = dateTime.getDate();
    day = day < 10 ? '0' + day : day;
    var hour = dateTime.getHours();
    hour = hour < 10 ? '0' + hour : hour;
    var minute = dateTime.getMinutes();
    minute = minute < 10 ? '0' + minute : minute;
    var second = dateTime.getSeconds();
    second = second < 10 ? '0' + second : second;
    var result = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    return result;
}




