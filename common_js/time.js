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

/** 
 * 通过时间戳获取几天前的时间
 */
function formatMsgTime(timespan) {
  var dateTime = new Date(timespan);
  var year = dateTime.getFullYear();
  var month = dateTime.getMonth() + 1;
  var day = dateTime.getDate();
  var hour = dateTime.getHours();
  var minute = dateTime.getMinutes();
  var second = dateTime.getSeconds();
  var now = new Date();
  var now_new = Date.parse(now.toDateString());  //typescript转换写法

  var milliseconds = 0;
  var timeSpanStr;

  milliseconds = now_new - timespan;

  month = (month + '').padStart(2, '0');
  day = (day + '').padStart(2, '0');
  hour = (hour + '').padStart(2, '0');
  minute = (minute + '').padStart(2, '0');
  second = (second+'').padStart(2,'0');

  if (milliseconds <= 1000 * 60 * 1) {
    timeSpanStr = '刚刚';
  }
  else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
    timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
  }
  else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
  }
  else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
  }
  else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) { //同年，大于15天
    timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
  } else { //不同年
    timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
  }
  return timeSpanStr;
}




