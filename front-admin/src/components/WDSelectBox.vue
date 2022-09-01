<!--
    용도 : Select Box Component
    Bootstrap Vue Component 참조 : https://bootstrap-vue.org/docs/components/form-select

    [ options json 사용 ]
    selectOptions: [
        { text: '전체', value: ''},
        { text: 'option1', value: '1'},
        { text: 'option2', value: '2'}
    ]
-->

<template>
    <b-form-select v-model="componentValue"
                   :disabled="disabled"
                   :options="options"
                   value-field="value"
                   :state="state"
                   @change="onChange"
                   @input="onInput" />
</template>

<script>
    export default {
        name: "WDSelectBox",
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
            disabled: {
                type: Boolean,
                default: false
            },
            options: {
                type: Array,
                default: () => []
            },
            state: {
                type: [String, Boolean],
                default: null
            },
        },
        methods: {
            onInput(v) {
                this.$emit('input', v);
            },
            onChange(v) {
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