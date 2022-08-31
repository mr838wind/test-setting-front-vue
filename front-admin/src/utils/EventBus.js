/*
 될수록 event bus 사용하지 말자. 부모,자식사이 event 혹은 vue global method 로 해결.
 */
import Vue from "vue";
export const EventBus = new Vue();
