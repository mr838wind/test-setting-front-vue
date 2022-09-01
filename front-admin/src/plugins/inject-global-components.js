/**
 * global ui components
 */
import Vue from "vue";

//==
import {EventBus} from "@/plugins/EventBus";

//==
import WDButton from "@/components/WDButton";
import WDCheckBox from "@/components/WDCheckBox";
import WDCheckboxGroup from "@/components/WDCheckboxGroup";
import WDCheckBoxModel from "@/components/WDCheckBoxModel";
import WDDatepicker from "@/components/WDDatepicker";
import WDDatepickerGroup from "@/components/WDDatepickerGroup";
import WDInput from "@/components/WDInput";
import WDPagination from "@/components/WDPagination";
import WDRadioGroup from "@/components/WDRadioGroup";
import WDSelectBox from "@/components/WDSelectBox";
import WDTable from "@/components/WDTable";
import WDTableDraggable from "@/components/WDTableDraggable";
import WDTextarea from "@/components/WDTextarea";
import WDToggle from "@/components/WDToggle";
import WDModal from "@/components/WDModal";
import WDMessageBox from "@/components/WDMessageBox";
import WDFileUpload from "@/components/WDFileUpload";
import WDToggleYn from "@/components/WDToggleYn";
import WDDatepickerModel from "@/components/WDDatepickerModel";
import WDDatepickerGroupModel from "@/components/WDDatepickerGroupModel";


const GlobalComponents = {
    install(Vue, options) {

        Vue.component(WDButton.name, WDButton);
        Vue.component(WDCheckBox.name, WDCheckBox);
        Vue.component(WDCheckboxGroup.name, WDCheckboxGroup);
        Vue.component(WDCheckBoxModel.name, WDCheckBoxModel);
        Vue.component(WDDatepicker.name, WDDatepicker);
        Vue.component(WDDatepickerModel.name, WDDatepickerModel); //modified
        Vue.component(WDDatepickerGroup.name, WDDatepickerGroup);
        Vue.component(WDDatepickerGroupModel.name, WDDatepickerGroupModel); //modified
        Vue.component(WDInput.name, WDInput);
        Vue.component(WDPagination.name, WDPagination);
        Vue.component(WDRadioGroup.name, WDRadioGroup);
        Vue.component(WDSelectBox.name, WDSelectBox);
        Vue.component(WDTable.name, WDTable);
        Vue.component(WDTableDraggable.name, WDTableDraggable);
        Vue.component(WDTextarea.name, WDTextarea);
        Vue.component(WDToggle.name, WDToggle);
        Vue.component(WDToggleYn.name, WDToggleYn);
        Vue.component(WDModal.name, WDModal);
        Vue.component(WDMessageBox.name, WDMessageBox);
        Vue.component(WDFileUpload.name, WDFileUpload);

        Vue.prototype.$showAlert = function({title, content, callback, okBtnName}){
            EventBus.$emit("@showAlert", {title, content, callback, okBtnName});
        }
        Vue.prototype.$showConfirm = function({title, content, callback, okBtnName, cancelBtnName}){
            EventBus.$emit("@showConfirm", {title, content, callback, okBtnName, cancelBtnName});
        }
        Vue.prototype.$showContent = function({title, component}){
            EventBus.$emit("@showContent", {title, component});
        }
        Vue.prototype.$hideContent = function(){
            EventBus.$emit("@hideContent");
        }

        Vue.prototype.$showLoading = function(  ){
            EventBus.$emit("@showLoading" );
        }
        Vue.prototype.$hideLoading = function(){
            EventBus.$emit("@hideLoading" );
        }

        Vue.prototype.$setDataAttributes = function ( target, src ) {
            Object.keys(src).forEach(function(key) {
                Vue.set(target, key, src[key]); // 또는
            })
        }
        Vue.prototype.$setDataAttribute = function ( target, key, val ) {
            Vue.set(target, key, val); // 또는
        }
    }
};

Vue.use(GlobalComponents);
