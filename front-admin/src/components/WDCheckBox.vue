<!--
    용도 : Check Box Component
    Bootstrap Vue Component 참조 : https://bootstrap-vue.org/docs/components/form-checkbox

    <WDCheckBox>
        Checkbox text
    </WDCheckBox>
-->

<template>
    <b-form-checkbox v-model="internalValue"
                     :id="id"
                     :value="value"
                     :unchecked-value="notAcceptedValue"
                     :state="state"
                     :disabled="disabled"
                     @change="onChange">
        <slot />
    </b-form-checkbox>
</template>

<script>
    export default {
        name: "WDCheckBox",
        data() {
            return {
                internalValue: this.notAcceptedValue
            }
        },
        props: {
            id: {
                type: String,
                default: ''
            },
            value: {
                type: Boolean,
                default: false,
            },
            notAcceptedValue: {
                type: [String, Number],
                default: '',
            },
            checked: {
                type: Boolean,
                default: false,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            state: {
                type: [String, Boolean],
                default: null
            },
        },
        methods: {
            onChange() {
                this.$emit('change', this.internalValue);
            },
        },
        watch: {
            checked: {
                immediate: true,
                handler(newVal) {
                    this.internalValue = newVal;
                }
            }
        }
    }
</script>

<style scoped lang="scss">

</style>