/*
  api 공통에러
 */
export default class ApiServiceError {
    constructor( {errorCode, message} ) {
        this.errorCode = errorCode;
        this.errorMessage = message;
    }

    toString(){
        return `errorCode:${this.errorCode}, errorMessage:${this.errorMessage}`;
    }
}
