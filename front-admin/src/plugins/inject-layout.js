/*
- 목적: vue 컴포넌트 관리
*/
import Vue from 'vue'
import DefaultLayout from "../views/layout/DefaultLayout";
import FlatLayout from "../views/layout/FlatLayout";

const InjectLayout = {
    install(Vue, options) {
        Vue.component('DefaultLayout', DefaultLayout);
        Vue.component('FlatLayout', FlatLayout);
    }
}

Vue.use(InjectLayout);

export default InjectLayout;
