<!--
    용도 : Input Component
    Bootstrap Vue Component 참조 : https://bootstrap-vue.org/docs/components/form-input
-->

<template>
    <b-form-input ref="input"
                  v-model="componentValue"
                  :placeholder="placeholder"
                  :type="type"
                  :readonly="readonly"
                  :disabled="disabled"
                  :state="state"
                  autocomplete="off"
                  :formatter="formatter"
                  @input="onInput"
                  @enter="onEnter"
                  @keyup="onKeyup"
                  @click="onClick"
                  @blur="onBlur"
                  @update="onUpdate"
                  @change.native="onChange"
                  @focusin="onFocusin"
                  @focusout="onFocusout" />
</template>

<script>
    export default {
        name: "WDInput",
        data() {
            return {
                componentValue: this.value
            };
        },
        props: {
            value: {
                type: [String, Number],
                default: ''
            },
            placeholder: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'text'
            },
            readonly: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            state: {
                type: [String, Boolean],
                default: null
            },
            maxLength: {
                type: Number,
                default: -1
            }
        },
        methods:{
            onInput(v){
                this.$emit('input', v);
            },
            onEnter(v) {
                this.$emit('enter', v);
            },
            onKeyup(v) {
                this.$emit('keyup', v);
            },
            onBlur(v) {
                this.$emit('blur', v);
            },
            onClick(v) {
                this.$emit('click', v);
            },
            onChange(v) {
                this.$emit('change', v);
            },
            onUpdate(v) {
                this.$emit('update', v);
            },
            onFocusout(v) {
                this.$emit('focusout', v);
            },
            onFocusin(v) {
                this.$emit('focusin', v);
            },

            focus() {
                this.$refs.input.focus();
            },
            formatter(value) {
                if(this.maxLength === -1) {
                    return value;
                }
                if(value.length>this.maxLength) {
                    value = value.substr(0,this.maxLength);
                }
                return value;
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