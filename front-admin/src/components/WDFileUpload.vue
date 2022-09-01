<template>
    <div class="file-wrap" :class="!multiple ? 'single':''">
        <DropzoneFileUpload
                :style="previewRectSize"
                ref="dropZoneFileUpload"
                v-model="multiple ? inputs.fileMultiple : inputs.fileSingle"
                :displayExistingFiles="displayExistingFiles"
                :multiple="multiple"
                :options="options"
                :acceptedFiles="acceptedFiles"
                :isUpdate="isUpdate"
                @change="change"
                @existingFileRemove="existingFileRemove"
                @fileRemove="fileRemove"
                @invalid-file="(msg) => { error = msg }"
                @show-crop="showCrop"/>
        <div class="invalid-feedback"
             style="display: block;"
             v-show="error">
            {{ error }}
        </div>

        <!--삭제 버튼 (single)-->
        <button v-if="!multiple"
                data-dz-remove="true"
                type="button"
                class="btn btn-danger btn-sm delete-image"
                @click="removeAll">
            <b-icon icon="trash" />
        </button>
    </div>
</template>

<script>
    import DropzoneFileUpload from "./argon-template/DropzoneFileUpload";
    import WDImageCrop from "./WDImageCrop";
    import Vue from 'vue';

    export default {
        name: "WDFileUpload",
        components: {
            DropzoneFileUpload,
        },
        props: {
            multiple: {
                type: Boolean,
                default: true
            },
            /** 보여줄 이미지의 path 배열 **/
            displayExistingFiles: {
                type: Array,
                default: () => []
            },
            options: {
                type: Object,
                default: () => ({})
            },
            /*이미지 가로 사이즈 (단위X)*/
            previewWidth:{
                type: Number,
                default: 300
            },
            /*이미지 세로 사이즈 (단위X)*/
            previewHeight:{
                type: Number,
                default: 300
            },
            cropMinAspectRatio: {
                type: Number,
                default: 300
            },
            cropMaxAspectRatio: {
                type: Number,
                default: 300
            },
            acceptedFiles: {
                type: String,
                default: 'image/*'
            },
            isUpdate: {
                type: Boolean,
                default: false
            },

        },
        computed:{
            previewRectSize(){
                return {width: this.previewWidth + 'px', height: this.previewHeight + 'px'}
            }
        },
        data() {
            return {
                inputs: {
                    fileSingle: [],
                    fileMultiple: []
                },
                error: '',
            }
        },
        methods: {
            setSingleFileByBase64({file ,base64, originalFile}) {
                this.$refs.dropZoneFileUpload.setCropImageFile(file, base64, originalFile);
            },
            removeFile(file) {
                this.$refs.dropZoneFileUpload.removeFile(file);
            },
            change(files) {
                this.error = '';
                //this.$emit('change', this.multiple ? this.inputs.fileMultiple : this.inputs.fileSingle);
                this.$emit('change', files);
            },
            fileRemove(){
                this.$emit('fileRemove');
            },
            existingFileRemove(seq){
                this.$emit('existingFileRemove', seq);
            },
            removeAll() {
                this.$refs.dropZoneFileUpload.removeAllFile();
            },
            async showCrop(file) {

                if(file.type.indexOf('image/') < 0) {
                    return;
                }

                const toBase64 = file => new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = error => reject(error);
                });

                const fileName = file.upload.filename;
                const fileUuid = file.upload.uuid;
                const base64 = await toBase64(file);
                const parentVm = this;

                //TODO 별도 컴퍼넌트 파일로
                const imageCropComponent = Vue.component('ImageCrop', {
                    template:`
                        <div class="image-crop">
                            <WDImageCrop ref="imageCrop"
                                         :img.sync="imgUrl"
                                         :minAspectRatio="minAspectRatio"
                                         :maxAspectRatio="maxAspectRatio"
                                         @ready="cropReady" />
                            <div class="toolbar">
                                <div class="input-box">
                                    <p class="title">Width</p>
                                    <WDInput :type="'number'"
                                             v-model="width" />
                                </div>
                                <div class="input-box">
                                    <p class="title">Height</p>
                                    <WDInput :type="'number'"
                                             v-model="height" />
                                </div>


                                <div class="btn-wrap">
                                    <WDButton :variant="'dark'"
                                              v-on:click="resize">
                                        이미지 크기 조정
                                    </WDButton>
                                    <WDButton :variant="'dark'"
                                              v-on:click="crop">
                                        자르기
                                    </WDButton>
                                    <WDButton :variant="'warning'"
                                              v-on:click="reset">
                                        초기화
                                    </WDButton>
                                    <WDButton :variant="'success'"
                                              v-on:click="apply">
                                        적용
                                    </WDButton>
                                    <WDButton :variant="'dark'"
                                              v-on:click="cancel">
                                        취소
                                    </WDButton>
                                </div>
                            </div>
                        </div>
                    `,
                    components: {
                        WDImageCrop
                    },
                    data(){
                        return {
                            imgUrl: base64,
                            original: base64,
                            originalFile: file,
                            fileName: fileName,
                            fileUuid: fileUuid,
                            width: '0',
                            height: '0',
                            minAspectRatio: parentVm.cropMinAspectRatio,
                            maxAspectRatio: parentVm.cropMaxAspectRatio
                        }
                    },
                    methods: {
                        crop() {
                            this.$refs.imageCrop.crop();
                        },
                        cropReady(val) {
                            this.width = String(val.width);
                            this.height = String(val.height);
                        },
                        async resize() {
                            await this.$refs.imageCrop.resize(this.width, this.height);
                        },
                        reset() {
                            this.imgUrl = this.original;
                        },
                        b64toBlob(b64Data, contentType='', sliceSize=512){
                            const byteCharacters = atob(b64Data);
                            const byteArrays = [];

                            for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                                const slice = byteCharacters.slice(offset, offset + sliceSize);

                                const byteNumbers = new Array(slice.length);
                                for (let i = 0; i < slice.length; i++) {
                                    byteNumbers[i] = slice.charCodeAt(i);
                                }

                                const byteArray = new Uint8Array(byteNumbers);
                                byteArrays.push(byteArray);
                            }

                            const blob = new Blob(byteArrays, {type: contentType});
                            return blob;
                        },
                        blobToFile(blob) {
                            return  new File([blob], this.fileName);
                        },
                        async apply() {
                            let block = this.imgUrl.split(";");
                            let contentType = block[0].split(':')[1];
                            let realData = block[1].split(",")[1];
                            const blob = this.b64toBlob(realData, contentType);
                            const _file = this.blobToFile(blob);

                            _file.upload = {
                                bytesSent: 0,
                                filename: this.fileName,
                                progress: 0,
                                total: _file.size,
                                uuid: fileUuid
                            };
                            parentVm.setSingleFileByBase64({
                                file: _file,
                                base64: this.imgUrl,
                                originalFile: this.originalFile
                            });

                            this.$hideContent();
                        },
                        cancel() {
                            parentVm.removeFile(this.originalFile);
                            this.$hideContent();
                        }
                    }
                });

                this.$showContent({
                    title: '이미지 자르기',
                    component: imageCropComponent
                });
            }
        },
        created() {

        }
    }
</script>

<style scoped lang="scss">

</style>
