<!--
    << v-model 관련 약간 수정 >>
    용도 : Check Box Component
    Bootstrap Vue Component 참조 : https://bootstrap-vue.org/docs/components/form-checkbox

    <WDCheckBox>
        Checkbox text
    </WDCheckBox>

    /*
     * https://kr.vuejs.org/v2/guide/components-custom-events.html
     * v-model 을 사용하는 컴포넌트는 기본값으로 value를 prop으로 사용하고, input 을 이벤트로 사용합니다.
     * 이 때, 체크박스와 같이 value 속성을 다른 용도로 사용하여야 하는 경우에는 model 옵션을 이용하여 문제가 생기는 것을 방지할 수 있습니다.
     * b-form-checkbox v-model(prop,event):  checked, input
     */
    v-model (prop, event): (checked, input)

    usage:
        1. modelValue: true, false
            v-model="modelValue"
        2. modelValue: 'Y','N'
            v-model="modelValue" :value="'Y'" :not-accepted-value="'N'"

    //https://stackoverflow.com/questions/39868963/vue-2-mutating-props-vue-warn
    computed 방식으로 변경

-->

<template>
    <b-form-checkbox v-model="internalValue"
                     :id="id"
                     :value="value"
                     :unchecked-value="notAcceptedValue"
                     :state="state"
                     :disabled="disabled">
        <slot />
    </b-form-checkbox>
</template>

<script>
export default {
    name: "WDCheckBoxModel",
    data() {
        return {

        }
    },
    computed: {
        // v-model
        internalValue: {
            get: function() {
                return this.checked;
            },
            set: function(value) {
                this.$emit('input', value);
            }
        }
    },
    // v-model setting:
    model: {
        prop: 'checked',
        event: 'input'
    },
    props: {
        id: {
            type: String,
            default: ''
        },
        // v-model: prop
        checked: {
            type: [String, Number, Boolean],
            default: false,
        },
        value: {
            type: [String, Number, Boolean],
            default: true,
        },
        notAcceptedValue: {
            type: [String, Number, Boolean],
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

    },
    watch: {

    }
}
</script>

<style scoped>

</style>
