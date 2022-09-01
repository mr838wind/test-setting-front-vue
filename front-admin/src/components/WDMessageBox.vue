<!--
    용도 : 전역 message box (alert, confirm, image crop)
-->

<template>
    <WDModal ref="app-modal"
             :title="title"
             :isBtnX="isBtnX"
             :scale="scale">

        <template v-slot:body>
            <p v-if="content"
               v-html="formattedContents" />
            <div :is="component"/>
        </template>

        <template v-if="showOk || showCancel"
                  v-slot:footer>
            <WDButton v-if="showOk"
                      :variant="'success'"
                      @click="onClickedOk">
                {{ okBtnName }}
            </WDButton>
            <WDButton v-if="showCancel"
                      :variant="'danger'"
                      @click="onClickedCancel">
                {{ cancelBtnName }}
            </WDButton>
        </template>

    </WDModal>
</template>

<script>
    import WDModal from "./WDModal";
    import _ from 'lodash';

    export default {
        name: "WDMessageBox",
        components: {
            WDModal,
        },
        props: {
            scale: {
                type: String,
                default: "md",
                description: 'Modal size',
                validator(value) {
                    let acceptedValues = ["", "sm", "md", "lg", "xl"];
                    return acceptedValues.indexOf(value) !== -1;
                },
            },
        },
        computed : {
            formattedContents(){
                return this.content.replace(/(\n)/g, '<br>');
            }
        },
        data() {
            return {
                title:'',
                content:'',
                callback:()=>{},
                showOk: true,
                showCancel: true,
                okBtnName: '',
                cancelBtnName:'',
                isBtnX: true,
                component: '',
                visible: false,
            }
        },
        methods: {
            onShown() {
                this.$emit('shown');
            },
            show({title, content, callback, showOk, showCancel, okBtnName, cancelBtnName, isBtnX, component}) {
                this.title = title;
                this.content = content;
                this.callback = callback;
                this.showOk = !(showOk === false);
                this.showCancel = !(showCancel === false);
                this.okBtnName = okBtnName;
                this.cancelBtnName = cancelBtnName;
                this.isBtnX = isBtnX;
                this.component = component;
                this.visible = true;
                this.$refs['app-modal'].show();
            },
            close() {
                this.visible = false;
                this.$refs['app-modal'].close();
                this.$emit('close');
            },
            onClickedOk() {
                this.close();
                if(_.isFunction(this.callback)){
                    this.callback('ok');
                }
                this.$emit("ok");
            },
            onClickedCancel() {
                this.close();
                if(_.isFunction(this.callback)){
                    this.callback('cancel');
                }
                this.$emit("cancel");
            }
        }
    }
</script>

<style scoped lang="scss">

</style>