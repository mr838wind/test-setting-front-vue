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
                    return value;
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