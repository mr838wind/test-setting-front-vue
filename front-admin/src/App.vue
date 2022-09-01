<template>
  <div id="app">

      <!-- layout -->
      <component :is="layout" >
          <transition name="custom-slide-left" >
            <router-view/>
          </transition>
      </component>

      <!-- global ui -->
      <!-- msg -->
      <WDMessageBox ref="confirmModal" />

      <!-- loading -->
      <b-overlay :show="showLoading"
                 spinner-variant="primary"
                 spinner-type="grow"
                 no-fade
                 no-wrap/>

  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
<script>

import EnumLayout from "@/plugins/layout/enum-layout";
import WDMessageBox from "@/components/WDMessageBox";
import {EventBus} from "@/plugins/EventBus";  // TODO/remove event bus

export default {
    components: { WDMessageBox },
    created() {
        this.initMessageEvents();
        this.initLoadingEvents();
    },
    mounted() {
    },
    data(){
        return {
            showLoading: false,
        }
    },
    computed: {
        layout() {
            return (this.$route.meta.layout || EnumLayout.DefaultLayout);
        }
    },
    methods: {
        initLoadingEvents() {
            EventBus.$on("@showLoading", () => {
                this.showLoading = true;
            });
            EventBus.$on("@hideLoading", () => {
                this.showLoading = false;
            });
        },

        initMessageEvents() {
            EventBus.$on("@showAlert", ({title, content, callback, okBtnName}) => {
                this.$refs.confirmModal.show({title, content, callback, okBtnName, showCancel:false, isBtnX:false});
            });
            EventBus.$on("@showConfirm", ({title, content, callback, okBtnName, cancelBtnName}) => {
                this.$refs.confirmModal.show({title, content, callback, okBtnName, cancelBtnName, isBtnX:false});
            });
            EventBus.$on("@showContent", ({title, component}) => {
                this.$refs.confirmModal.show({title, component, showOk:false, showCancel:false, isBtnX:false});
            });
            EventBus.$on("@hideContent", () => {
                this.$refs.confirmModal.close();
            });
        },
    },
}
</script>
