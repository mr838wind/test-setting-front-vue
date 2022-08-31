import axios from '@/utils/AxiosInterceptors'
import moment from "moment";
import CommonUtil from "@/utils/CommonUtil";
// import FileDownload from "js-file-download";
import _ from "lodash";

export class ContentsService {

    constructor(hostWithPrefix) {
        this.hostWithPrefix = hostWithPrefix;
    }

    listBook( param ){
        if( _.has(param, 'registerDtm') ){
            if(!_.isEmpty(param.registerDtm[0])) param.registerStartDtm = moment(param.registerDtm[0]).format("YYYYMMDDHHmmss");
            if(!_.isEmpty(param.registerDtm[1])) param.registerEndDtm = moment(param.registerDtm[1]).format("YYYYMMDDHHmmss");

            param = _.omit(param, "registerDtm");
        }

        return axios
            .get(`${this.hostWithPrefix}/book/list`, {params: param})
            .then(response => {
                return response.data.data;
            })
            .catch(e => {
                console.warn(e);
            });
    }

    insertBook(item, uploadFile){
        const formData = new FormData();

        formData.append('mainImageFile', uploadFile.mainImageFile);
        for(const iter of uploadFile.imageFileList){
            formData.append('imageFileList', iter);
        }
        formData.append('requestBody', CommonUtil.buildJsonBlob(item));

        return axios
            .post(`${this.hostWithPrefix}/book/insert`, formData, {
                headers: {
                    'Content-Type': 'multipart/mixed'
                }
            })
            .then(response => {
                return response.data.data;
            })
            .catch(e => {
                return e;
            });
    }

    updateBook(item, uploadFile){
        const formData = new FormData();

        formData.append('mainImageFile', uploadFile.mainImageFile);
        for(const iter of uploadFile.imageFileList){
            formData.append('imageFileList', iter);
        }
        formData.append('requestBody', CommonUtil.buildJsonBlob(item));

        return axios
            .put(`${this.hostWithPrefix}/book/update/${item.bookId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/mixed'
                }
            })
            .then(response => {
                return response.data.data;
            })
            .catch(e => {
                console.warn(e);
                return false;
            });
    }

    deleteBook( paramList ){
        return axios
            .delete(`${this.hostWithPrefix}/book/delete`, {data: paramList})
            .then(response => {
                return response.data.data;
            })
            .catch(e => {
                console.warn(e);
            });
    }

/*
    sampleDownload() {
        const FileDownload = require('js-file-download');
        return axios
            .get(`${this.hostWithPrefix}/book/sampleDownload`, {
                responseType: 'blob',
            })
            .then(response => {
                FileDownload(response.data, '데이터_업로드_양식.xlsx');
                return true;
            })
            .catch(e => {
                console.warn(e);
            })
    }*/

}

