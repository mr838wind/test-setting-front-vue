<!--
    용도 : Check Box Group Component
    Bootstrap Vue Component 참조 : https://bootstrap-vue.org/docs/components/form-checkbox

    - default class type: form-group-b

    [ options json 사용 ]
    radioOptions: [
        { text: '우편', value: '1'},
        { text: '이메일', value: '2'},
        { text: '모두 수신', value: '3'},
        { text: '수신 거부', value: '4'},
    ]
-->

<template>
    <b-form-checkbox-group v-model="selected"
                           :options="options"
                           @change="onChange" />
</template>

<script>
    export default {
        name: "WDCheckboxGroup",
        model: {
            prop: 'selected',
            event: 'change'
        },
        data() {
            return {
                internalSelected: []
            }
        },
        props: {
            selected: {
                type: Array,
                default: () => []
            },
            options:{
                type: Array,
                default: () => [],
            },
        },
        methods: {
            onChange(v) {
                this.$emit('change', v);
            }
        },
        watch: {
            selected: {
                immediate: true,
                handler(newVal) {
                    this.internalSelected = newVal;
                }
            }
        },
    }
</script>

<style scoped lang="scss">

</style>