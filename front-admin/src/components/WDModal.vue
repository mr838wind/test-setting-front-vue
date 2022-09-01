<!--
    용도 : Modal Component
    Bootstrap Vue Component 참조 : https://bootstrap-vue.org/docs/components/modal

    [ Animation Effects : https://codepen.io/antoncabon/pen/WxQLbM ]
-->
<template>

    <b-modal ref="modal-container"
             :modalClass="modalClass"
             :hide-footer="!$slots.footer"
             :size="scale"
             @shown="onShown"
             @close="onClose"
             :no-close-on-backdrop="true"
             :no-close-on-esc="true"
             centered >

        <!-- Header with close button -->
        <template v-slot:modal-header>
            <h3 v-if="!$slots.header">
                {{ title }}
            </h3>
            <slot name="header"/>
            <b-icon icon="x"
                    class="h3"
                    v-if="isBtnX"
                    @click="close"
                    data-dismiss="modal" />
        </template>

        <!-- Body -->
        <slot name="body"/>

        <!-- Footer -->
        <template v-slot:modal-footer>
            <slot name="footer"/>
        </template>

    </b-modal>

</template>

<script>
export default {
    name: "WDModal",
    components:{
    },
    data() {
        return {
        }
    },
    props: {
        modalClass: {
            type: String,
            default: ''
        },
        title:{
            type: String,
            default: ''
        },
        options: {
            type: Array,
            default: () => []
        },
        scale: {
            type: String,
            default: "lg",
            description: 'Modal size',
            validator(value) {
                let acceptedValues = ["", "sm", "md", "lg", "xl"];
                return acceptedValues.indexOf(value) !== -1;
            },
        },
        isBtnX: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        onShown() {
            this.$emit('shown');
        },
        onClose() {
            this.$emit('close');
        },
        show(){
            this.$refs['modal-container'].show();
        },
        close(){
            // this.visible = false
            this.$refs['modal-container'].hide();
            this.$emit('close');
        },
    }
}
</script>

<style scoped lang="scss">

</style>