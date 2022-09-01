<template>
  <div id="app">

      <!-- layout -->
      <component :is="layout" >
          <transition name="custom-slide-left" >
            <router-view/>
          </transition>
      </component>

      <!-- global ui -->

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
export default {
    computed: {
        layout() {
            return (this.$route.meta.layout || EnumLayout.DefaultLayout);
        }
    },
}
</script>
