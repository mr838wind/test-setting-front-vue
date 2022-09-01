<!--
    용도 : Textarea Component
    Bootstrap Vue Component 참조 : https://bootstrap-vue.org/docs/components/form-textarea
-->

<template>
    <b-form-textarea v-model="componentValue"
                     :placeholder="placeholder"
                     :rows="rows"
                     :max-rows="maxRows"
                     @input="onInput" />
</template>

<script>
    export default {
        name: "WDTextarea",
        data() {
            return {
                componentValue: this.value
            }
        },
        props: {
            value: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: ''
            },
            rows: {
                type: Number,
                default: 3
            },
            maxRows: {
                type: Number,
                default: 6
            }
        },
        methods: {
            onInput(v){
                this.$emit('input', v);
            }
        },
        watch: {
            value(newVal) {
                this.componentValue = newVal;
            }
        }
    }
</script>

<style scoped lang="scss">

</style>