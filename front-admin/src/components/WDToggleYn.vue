<!--
    용도 : Toggle Component (Switch style checkboxes)
    Bootstrap Vue Component 참조 : https://bootstrap-vue.org/docs/components/form-checkbox

    toggle [y/n] 버전:
-->

<template>
    <b-form-checkbox v-model="internalValue"
                     size="lg"
                     switch
                     :id="id"
                     :value="value"
                     :unchecked-value="notAcceptedValue"
                     :state="state"
                     :disabled="disabled"
                     @change="onChange"
    >
        <slot />
    </b-form-checkbox>
</template>

<script>
    export default {
        name: "WDToggleYn",
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
            event: ['input', 'change']
        },
        props: {
            id: {
                type: String,
                default: ''
            },
            // v-model: prop
            checked: {
                type: [String, Number, Boolean],
                default: 'n',
            },
            // true 일 때 값
            value: {
                type: [String, Number, Boolean],
                default: 'y',
            },
            // false 일 때 값
            notAcceptedValue: {
                type: [String, Number, Boolean],
                default: 'n',
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
	        onChange(v) {
		        this.$emit('change', v);
	        },
        },
        watch: {

        }
    }
</script>

<style scoped lang="scss">

</style>
