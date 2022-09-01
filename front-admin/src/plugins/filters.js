/*
- 목적: vue 전역 필터
*/
import Vue from "vue";
import moment from "moment";


/**
 * from 'YYYYMMDDHHmmss'
 * to 'YYYY.MM.DD HH'
 */
Vue.filter('formatDateTimeRegular', (val = '', formatString = 'YYYY.MM.DD HH') => {
    if(!val || val.length < 14){
        return val;
    }
    val = val.substr(0, 14);
    return moment(val, 'YYYYMMDDHHmmss').format(formatString);
});







/**
 * from 'YYYYMMDD'
 * to 'YYYY/MM/DD' ,  'YYYY년 MM월 DD일', ....
 */
Vue.filter('formatDate', (val = '', formatString = 'YYYY년 MM월 DD일') => {
    if(!val || val.length < 8){
        return val;
    }
    val = val.substr(0, 8);
    return moment(String(val)).format(formatString);
});

/**
 * from 'YYYYMMDDHHmmss'
 * to 'YYYY/MM/DD HH:mm:ss' ,  ....
 */
Vue.filter('formatDateTime', (val = '', formatString = 'YYYY/MM/DD HH:mm:ss') => {
    if(!val || val.length < 14){
        return val;
    }
    val = val.substr(0, 14);
    return moment(String(val), 'YYYYMMDDHHmmss').format(formatString);
});

/**
 * from 'HHmm'
 * to 'HH:mm:00' ,
 */
Vue.filter('formatTime', (val = '') => {
    if(!val || val.length < 4){
        return val;
    }
    return val.substr(0, 2) + ":" + val.substr(2, 2) + ":00";
});

/**
 * from 'YYYY-MM-DD HH:mm:ss'
 * to 'YYYY/MM/DD HH:mm:ss' ,  ....
 */
Vue.filter('changeFormatDateTime', (val = '', fromFormatString = 'YYYY/MM/DD HH:mm:ss', toFormatString = 'YYYY/MM/DD HH:mm:ss') => {
    return moment(String(val), fromFormatString).format(toFormatString);
});

//요일생성 ex) YYYYMMDD -> 월
Vue.filter('rawDtmToConvertDayOfWeek', (val = '') => {
    if(!val || val.length < 8){
        return val;
    }
    val = val.substr(0, 8);

    let d = moment(String(val), 'YYYYMMDD').toDate();
    let week = ['일', '월', '화', '수', '목', '금', '토'];

    return week[d.getDay()];

});

//원화 컴마 1234567 -> 1,234,567
Vue.filter('currency', (money = 0) => {
    let onlyNum = Number(money.toString().replace(/[^0-9]/g, ''));
    return onlyNum.toLocaleString();
});

Vue.filter('currencyKrw', (money = 0) => {
    let onlyNum = Number(money.toString().replace(/[^0-9]/g, ''));
    return onlyNum.toLocaleString() + ' 원';
});

Vue.filter('korWon', (num = '') => {
    num = num.replace(/[^0-9]/g, '');
    if(Number(num) === 0 || isNaN(num)) {
        return '영원'
    }
    let hanA = new Array('',"일","이","삼","사","오","육","칠","팔","구","십");
    let danA = new Array('',"십","백","천",'',"십","백","천",'',"십","백","천",'',"십","백","천");
    let result = '';
    for(var i=0; i<num.length; i++) {
        let str = '';
        let han = hanA[num.charAt(num.length-(i+1))];
        if(han != '')
            str += han+danA[i];
        if(i == 4) str += "만";
        if(i == 8) str += "억";
        if(i == 12) str += "조";
        result = str + result;
    }
    if(num != 0)
        result = result + "원";
    return result ;
});

/**
 * 핸드폰 번호 포맷
 */
Vue.filter('formatHp', (hp = '') => {
    let telOnlyNum = hp.replace(/[^0-9]/g, '');
    if(telOnlyNum.length > 3 && telOnlyNum.length < 8){
        telOnlyNum = telOnlyNum.replace( /(^01.{1}|[0-9]{3})([0-9]+)/, "$1-$2" );
    }else if(telOnlyNum.length <= 11){
        telOnlyNum = telOnlyNum.replace( /(^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1-$2-$3" );
    } else {
        telOnlyNum = hp;
    }
    return telOnlyNum;
});
