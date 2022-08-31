import moment from "moment";
import _ from "lodash";

export default {

    copyAttributesOnlyDefined: function(fromObj, toObj ){
        const subset = _.pick( fromObj , _.keys(toObj) );
        _.assign( toObj , subset );
    },

    copyAttributesAll: function(fromObj, toObj ){
        _.assign( toObj , fromObj );
    },

    random(min,max){
        return Math.random() * (max-min) + min;
    },

    /**
     * Date 로 변환
     * @param yyyymmdd (ex 20200814)
     * @returns {Date}
     */
    stringToDate(yyyymmdd){
        if(yyyymmdd){
            let y = yyyymmdd.substr(0, 4);
            let m = yyyymmdd.substr(4, 2);
            let d = yyyymmdd.substr(6, 2);
            return new Date(y,m-1,d);
        }else{
            return null;
        }
    },

    /**
     * String 으로 변환
     * @param date
     * @returns {string}
     */
    dateToString(dt){
        return moment(dt).format("YYYYMMDD");
    },

    /**
     * 오늘날짜 String 으로 변환
     * @param date
     * @returns {string}
     */
    todayToString(){
        return moment().format("YYYYMMDD");
    },

    /**
     * String 으로 변환
     * @param yyyymmddhhmmss (ex 20200814121500)
     * @returns yyyy년 mm월 dd일 hh시 mm분 ss초
     */
    dateToStringKor(dt) {

        if(dt) {
            let y = dt.substr(0, 4);
            let M = dt.substr(4, 2);
            let d = dt.substr(6, 2);
            let h = dt.substr(8, 2);
            let m = dt.substr(10, 2);
            //let s = dt.substr(12, 2);

            if(h === '12') {
                h = "오후" + h
            } else if(h > 12) {
                h = "오후" + ((h-12) > 10 ? h-12 : "0"+(h-12))
            } else if(h < 12 && h !== '') {
                h = "오전" + h
            }

            // return y+"년 "+M+"월 "+d+"일 "+h+(h ? ":":'')+m+(m ? ":":'')+s
            return y+"년 "+M+"월 "+d+"일 "+h+(h ? "시":'')+m+(m ? "분":'')

        } else {
            return '';
        }

    },

    /**
     * String 으로 변환
     * @param yyyymmddhhmmss (ex 20200814121500)
     * @returns string
     */
    dateToStringDot(dt) {

        if(dt) {
            let y = dt.substr(0, 4);
            let M = dt.substr(4, 2);
            let d = dt.substr(6, 2);

            return y + "." + M + "." +d;

        } else {
            return null;
        }

    },


    /**
     * 중복불가 목록에 push
     * @param array
     * @param val
     */
    pushDistinct(array, val){
        const exist = array.includes( val )
        if( ! exist ){
            array.push(val);
        }
    },


    /**
     * 문자열 | Object 공백 체크
     * @param str
     */
    isEmpty(obj) {

        if (typeof obj === 'object') {

            for (const key in obj) return false;

            return true;

        } else {
            if ( obj === null || obj === '' || obj === undefined || obj === 'undefined' ) {
                return true;
            }
        }

        return false;
    },

    /**
     * print log
     */
    printComponentLog(componentRef, msg) {
        console.log('>>== component: %o : %s', componentRef.$options.name, msg);
    },

    // /**
    //  * alert
    //  */
    // alert(msg) {
    //     alert(msg);
    // },

    /**
     * url redirect
     */
    urlRedirect(vueInstance, url) {
        vueInstance.$router.replace(url);
    },

    /**
     * 주민번호로(yymmdd-n) 태어난 년월일(yyyymmdd) 가져오기
     *  주민등록번호 뒷자리가(7번째자리) 없으면 , 현재년도이상이면 1900년대생 미만이면 2000년대생
     *  주민등록번호 뒷자리가(7번째자리) 1,2로 시작하면 1900년대생으로 계산
     *  주민등록번호 뒷자리가(7번째자리) 3,4로 시작하면 2000년대생으로 계산
     *
     * @param identityNumberFront (ex.030507)
     * @param identityNumberBack  (ex.3xxxxxx)
     * */
    getFullBirthFromIdentityNumber(identityNumberFront ='', identityNumberBack = '') {
        if(!identityNumberFront) {
            return -1;
        }
        if(identityNumberFront.length <6) {
            return -1;
        }
        let startYear = '';
        if(identityNumberBack.length>0) {
            startYear = identityNumberBack.substr(0,1) < 3 ? '19' : '20';
        } else {
            startYear = Number(this.todayToString().substr(2,2)) <= Number(identityNumberFront.substr(0,2)) ? '19' : '20';
        }
        let dt = startYear;
        dt += identityNumberFront;

        let birthday = moment(dt);
        if(!birthday.isValid()) {
            return -1;
        }

        return birthday;
    },

    /**
     * 만나이계산
     *  만나이는 올해년도 - 태어난년도
     *  올해 생일이 아직 안지났으면 -1
     *  ex) 태어난날이 2020년 5월 8일이고
     *  기준일이 2021년 5월 7일 , 만 0세
     *  기준일이 2021년 5월 9일 , 만 1세
     */
    getAmericanAge(birthday) {
        let birthdayMoment = moment(birthday);
        if(!birthdayMoment.isValid()) {
            return -1;
        }
        let today = moment();


        return today.diff(birthdayMoment,'years');
    },
    /**
     * 해당 키값이 있으면 obj 반환
     */
    getObjByKey(array, obj) {
        return _.find(array, obj)
    },

    /**
     * 전화번호 유효성 검사
     * */
    validateTelNo(number) {
        let telOnlyNum = number.replace(/[^0-9]/g, '');
        if(telOnlyNum.indexOf('02') === 0) {
            let pattern = /^\d{2}\d{3,4}\d{4}$/;
            if(!pattern.test(telOnlyNum)){
                return false;
            }
        } else {
            let pattern = /^\d{3}\d{3,4}\d{4}$/;
            if(!pattern.test(telOnlyNum)){
                return false;
            }
        }

        return true;
    },

    /**
     * 휴대폰번호 유효성 검사
     * */
    validateHp(number) {
        let telOnlyNum = number.replace(/[^0-9]/g, '');

        let pattern = /^\d{3}\d{3,4}\d{4}$/;
        if(!pattern.test(telOnlyNum)){
            return false;
        }

        return true;
    },

    /**
     * 이메일 유효성 검사
     * */
    validateEmail(email) {
        // eslint-disable-next-line no-control-regex
        let pattern = /^(?:[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

        if(!pattern.test(email)){
            return false;
        }

        return true;
    },

    /**
     * 금액 형식으로 변경
     */
    format2Amt(amt) {

        const formatted =  String(amt).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        console.log('formatted ', formatted);

        return formatted;
    },

    /**
     * 비밀번호 체크로직
     * @param password
     * @returns {boolean}
     */
    checkPassword(password) {

        let result = {code: 'success', msg: '성공하였습니다.'};
        if(!/^[a-zA-Z0-9]{8,15}$/.test(password)){

            result = {code: 'fail', msg: '숫자와 영문자 조합으로 8~15자리를 사용해야 합니다.'}
            return result;
        }
        var checkNumber = password.search(/[0-9]/g);
        var checkEnglish = password.search(/[a-z]/ig);

        if(checkNumber <0 || checkEnglish <0){

            result = {code: 'fail', msg: '숫자와 영문자를 혼용하여야 합니다.'}
            return result;
        }

        if(/(\w)\1\1\1/.test(password)){

            result = {code: 'fail', msg: '같은 문자를 4번 이상 사용하실 수 없습니다.'}
            return result;
        }

        return result;
    },

    /**
     * build json blob
     * @param jsonObj
     * @returns {Blob}
     */
    buildJsonBlob( jsonObj ){
        const json = JSON.stringify(jsonObj );
        const blob = new Blob([json], {
            type: 'application/json'
        });
        return blob;
    },

    /**
     * simple validation
     * @param subObjName
     * @param fieldName
     * @param msgPrefix
     * @returns {boolean}
     */
    validateRequired(thisObj, subObjName, fieldName, msgPrefix) {
        console.log('xxx ', thisObj[subObjName][fieldName], _.isEmpty(thisObj[subObjName][fieldName]));

        if( !thisObj[subObjName][fieldName] && _.isEmpty(thisObj[subObjName][fieldName]) ) {
            //alert(`${msgPrefix}을(를) 입력해 주세요.`);
            thisObj.$showAlert(
                {
                    title: '알림',
                    content: `${msgPrefix}을(를) 입력해 주세요.`,
                    callback: () => {},
                    okBtnName: '확인'
                }
            )
            return false;
        }
        return true;
    },

    // 미리 validateRequired check 할 것.
    // 해당 필드는 null / undefined 가 아니다.
    validateStringLength(thisObj, subObjName, fieldName, msgPrefix, maxLength){
        if( thisObj[subObjName][fieldName].length > maxLength ){
            thisObj.$showAlert({
                title: '알림',
                content: `${msgPrefix}는(은) 최대 ${maxLength}자 입니다.`,
                callback: () => {},
                okBtnName: '확인',
            });
            return false;
        }
        return true;
    },

    // 미리 validateRequired check 할 것.
    // 해당 필드는 null / undefined 가 아니다.
    validateDatabaseId(thisObj, subObjName, fieldName, msgPrefix){
        const reg = /^[a-zA-Z0-9_]+$/;
        if( !reg.test(thisObj[subObjName][fieldName]) ){
            thisObj.$showAlert({
                title: '알림',
                content: `${msgPrefix}는(은) 띄어쓰기 없이 영문, 숫자, _만 사용해야합니다.`,
                callback: () => {},
                okBtnName: '확인',
            });
            return false;
        }
        return true;
    },

    /**
     * log
     * @param args
     */
    log(...args) {
        //const debug = true; // 'true' for test
        const debug = false;
        if(debug) {
            console.log(...args);
        }
    }


}

