<!--
    용도 : Default Layout
-->

<template>
    <div class="wrapper">

        <div class="default-layout">
            <!-- content -->
            <div class="body-wrap">
                    <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {
        },
        methods: {

        }
    }
</script>

<style scoped lang="scss">
    .default-layout {
        .body-wrap {
            padding: 50px 0;
        }
    }
</style>
