<!--
    용도 : Toggle Component (Switch style checkboxes)
    Bootstrap Vue Component 참조 : https://bootstrap-vue.org/docs/components/form-checkbox
-->

<template>
    <b-form-checkbox v-model="internalChecked"
                     size="lg"
                     switch
                     @change="onChange">
        <slot />
    </b-form-checkbox>
</template>

<script>
    export default {
        name: "WDToggle",
        data() {
            return {
                internalChecked: false
            }
        },
        model: {
            prop: 'checked',
            event: 'change'
        },
        props: {
            checked: {
                type: Boolean,
                default: false
            },
        },
        methods: {
            onChange(v) {
                this.$emit('change', v);
            },
        },
        watch: {
            checked: {
                immediate: true,
                handler(newVal) {
                    this.internalChecked = newVal;
                }
            }
        }
    }
</script>

<style scoped lang="scss">

</style>