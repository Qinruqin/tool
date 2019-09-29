/**
 * 判断是否为手机号码
 */
function checkPhone(param){
    var reg = /^1[3456789]\d{9}$/g;
    return reg.test(param);
}

/**
 * 判断是否为固定电话号码(0511-4405222 或 021-87888822)
 */
function checkTel(param){
    var reg = /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/
    return reg.test(param);
}
/**
 * 判断身份证号的格式是否正确
 */
function checkIdCard(param){
    var reg1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/; //15位身份证号
    var reg2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}(\d|x)$/gi; // 18位身份证号
    return reg1.test(param) || reg2.test(param);
}
/**
 * 判断邮箱的格式是否正确
 */
function checkEmail(param){
    var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/gi;
    return reg.test(param);
}
/**
 * 判断是否存在重复字符串
 */
function checkRepeatString(param){
    var reg = /\b(\w+)\b\s+\1\b/gi ; // \b(\w+)\b   匹配单词开始处和结束处之间的多于一个的字母或数字  \s+ 一个或多个空白符 \1 前面匹配的那个单词\
    return reg.test(param)
}
/**
 * 匹配中文字符 
 */
function checkChinese(param){
    var reg = /[\u4e00-\u9fa5]/g;
    return reg.test(param);
}