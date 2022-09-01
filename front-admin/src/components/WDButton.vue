<!--
    용도 : Button Component
    Bootstrap Vue Component 참조 : https://bootstrap-vue.org/docs/components/button

    <WDButton>
        Button text
    </WDButton>
-->

<template>
    <b-button :variant="variant"
              :disabled="disabled"
              @click="onClick">
        <slot />
    </b-button>
</template>

<script>
    export default {
        name: "WDButton",
        data() {
            return {

            }
        },
        props: {
            variant: {
                type: String,
                default: 'primary',
                description: 'outline-primary...|primary|secondary|success|danger|warning|info|light|dark'
            },
            disabled: {
                type: Boolean,
                default: false
            },
        },
        methods: {
            onClick(v) {
                this.$emit('click', v);
            }
        }
    }
</script>

<style scoped lang="scss">

</style>