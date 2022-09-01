<template>
    <b-form-input ref="input"
                  v-model="componentValue"
                  :placeholder="placeholder"
                  :type="type"
                  :readonly="readonly"
                  :disabled="disabled"
                  :state="state"
                  :formatter="formatter"
                  @input="onInput"
                  @enter="onEnter"
                  @keyup="onKeyup"
                  @click="onClick"
                  @blur="onBlur"
    />
</template>

<script>
import WDInputMixin from './WDInputMixin';
    export default {
        name: "WDInputMixinVer",
        mixins: [WDInputMixin],
        data() {
            return {
                componentValue: this.value
            };
        },
        props: {
            validateRule: {
                type: Function,
                default: (value,props)=>{
                    if(props.maxLength !== -1 && value.length>props.maxLength) {
                        value = value.substr(0,props.maxLength);
                    }
                    let num = value.replace(new RegExp(RegExp(props.validateReg), "g"), '');

                    if(props.min !== -1 && Number(num) < props.min) {
                        num = props.min;
                    }
                    if(props.max !== -1 && Number(num) > props.max) {
                        num = props.max;
                    }
                    if(props.isMoney) {
                        return Number(num).toLocaleString();
                    } else {
                        return num.toString();
                    }
                }
            },
        },
        methods: {
            focus() {
                this.$refs.input.focus();
            },
        },
        watch: {
            value(newVal) {
                this.componentValue = newVal;
            }
        }
    }
</script>

<style scoped>

</style>