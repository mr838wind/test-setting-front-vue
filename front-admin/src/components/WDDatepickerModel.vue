<!--
    용도 : Datepicker Component
    Bootstrap Vue Component 참조 : https://bootstrap-vue.org/docs/components/form-datepicker

    TODO//complete

-->

<template>
    <b-form-datepicker v-model="componentValue"
                       :disabled="disabled"
                       :placeholder="'날짜 선택'"
                       :max="max"
                       :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
                        />
</template>

<script>
    export default {
        name: "WDDatepickerModel",
        // v-model setting:
        model: {
            prop: 'value',
            event: 'input'
        },
        data() {
            return {

            }
        },
        computed: {
            // v-model
            componentValue: {
                get: function() {
                    // YYYYMMDD -> YYYY-MM-DD
                    if(this.value !== '') {
                        return this.value.substring(0,4)
                            + '-' + this.value.substring(4,6)
                            + '-' + this.value.substring(6,8)
                        ;
                    }
                    return '';
                },
                set: function(value) {
                    // YYYY-MM-DD -> YYYYMMDD
                    const valueConverted = value.replaceAll('-', '');
                    this.$emit('input', valueConverted);
                }
            }
        },
        props: {
            value: {
                type: Date | String,
                default: ''
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

        },
        watch: {

        }
    }
</script>

<style scoped lang="scss">

</style>
