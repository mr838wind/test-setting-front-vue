<!--
    용도 : input component
    사용법 :
     <WDInput> </.....>

-->
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

    export  const formatterDate = {}

    const formatterHP = {}
    export {formatterHP}


    export default {
        name: "WDInput",
        data() {
            return {
                componentValue: this.value
            };
        },
        props: {
            value: {
                type: String,
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
                type: String | Boolean,
                default: null
            },
            maxLength: {
                type: Number,
                default: -1
            },
            validateReg: {
                type: String,
                default: ''
            },
            validateRule: {
                type: Function,
                default: (value,$props)=>{
                    if($props.validateReg !== '') {
                        value = value.replace(new RegExp(RegExp($props.validateReg), "g"), '');
                    }
                    if($props.maxLength !== -1 && value.length>$props.maxLength) {
                        value = value.substr(0,$props.maxLength);
                    }
                    return value;
                }
            },
            //TODO 포맷팅룰
            formattingRule: {
                type: Function,
                default: (value,$props)=>{
                    return value;
                }
            },
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

            focus() {
                this.$refs.input.focus();
            },
            formatter(value) {
                //유효성검사
                value = this.validateRule(value,this.$props)

                //포맷팅
                value = this.formattingRule(value,this.$props)
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

<style scoped>

</style>