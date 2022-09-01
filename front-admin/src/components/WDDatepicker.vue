<!--
    용도 : Datepicker Component
    Bootstrap Vue Component 참조 : https://bootstrap-vue.org/docs/components/form-datepicker
-->

<template>
    <b-form-datepicker v-model="componentValue"
                       :disabled="disabled"
                       :placeholder="'날짜 선택'"
                       :max="max"
                       :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
                       @input="onInput" />
</template>

<script>
    export default {
        name: "WDDatepicker",
        model: {
            prop: 'value',
            event: 'change'
        },
        data() {
            return {
                componentValue: this.value
            }
        },
        props: {
            value: {
                type: Date | String,
                default: new Date()
            },
            max: {
                type: Date,
                default: null
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            onInput(v){
                this.$emit('change', v);
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