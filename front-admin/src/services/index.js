import {BookService} from "@/services/modules/BookService";

const API_URL_HOST = process.env.VUE_APP_API_HOST; // host
const API_URL_HOST_WITH_PREFIX = API_URL_HOST + '/api'

/**
 * provide services:
 * - plugin 에 넣는게 좋을까??
 */
const services = {
    //loginService: new LoginService(API_URL_HOST_WITH_PREFIX), //로그인
    bookService: new BookService(API_URL_HOST_WITH_PREFIX), //book
}

console.log('>>== services=%o', services);

export default services
