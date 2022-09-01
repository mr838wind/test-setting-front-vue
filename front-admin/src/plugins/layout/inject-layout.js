/*
- 목적: vue 컴포넌트 관리
*/
import Vue from 'vue'
import EnumLayout from "@/plugins/layout/enum-layout";
//
import DefaultLayout from "../../views/layout/DefaultLayout";
import FlatLayout from "../../views/layout/FlatLayout";

const InjectLayout = {
    install(Vue, options) {

        // register
        Vue.component(EnumLayout.DefaultLayout, DefaultLayout);
        Vue.component(EnumLayout.FlatLayout, FlatLayout);

    }
}

Vue.use(InjectLayout);

export default InjectLayout;
