<!--
    용도 : Radio Box Group Component
    Bootstrap Vue Component 참조 : https://bootstrap-vue.org/docs/components/form-radio

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
    <div class="radio-group-box">
        <b-form-radio-group v-model="internalSelected"
                            class="form-group-b"
                            :buttons="buttons"
                            button-variant="outline-secondary"
                            :options="options"
                            @change="onChange" />
    </div>
</template>

<script>
    export default {
        name: "WDRadioGroup",
        model: {
            prop: 'selected',
            event: 'change'
        },
        data() {
            return {
                internalSelected: ''
            }
        },
        props: {
            selected: {
                type: [String, Number],
                default: '',
            },
            buttons: {
                type: Boolean,
                default: false
            },
            options:{
                type: Array,
                default: () => [],
            },
        },
        methods: {
            onChange: function (val) {
                this.$emit('change',val)
            },
        },
        watch: {
            selected: {
                immediate: true,
                handler(newVal) {
                    this.internalSelected = newVal;
                }
            }
        }
    }
</script>

<style scoped lang="scss">

</style>