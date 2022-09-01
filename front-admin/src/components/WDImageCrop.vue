<template>
    <div class="cropper-wrapper">
        <div :style="{backgroundImage: 'url(' + img + ')'}" class="cropper-background"/>
        <Cropper
                ref="cropper"
                class="cropper"
                :src="img"
                :stencil-props="{
                    minAspectRatio: minAspectRatio,
                    maxAspectRatio: maxAspectRatio
                }"
                @ready="ready"/>
    </div>
</template>

<script>
    import { Cropper } from 'vue-advanced-cropper'
    import 'vue-advanced-cropper/dist/style.css'


    export default {
        name: "WDImageCrop",
        components: {
            Cropper
        },
        props: {
            img: {
                type: String,
                default: 'https://images.pexels.com/photos/226746/pexels-photo-226746.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
            },
            minAspectRatio: {
                type: Number,
                default:300
            },
            maxAspectRatio: {
                type: Number,
                default:300
            }
        },
        methods: {
            crop() {
                const { canvas } = this.$refs.cropper.getResult();
                this.$emit('update:img', canvas.toDataURL());
            },
            async ready() {
                // console.warn('ready!');
                const imgObj = await this.getImgObj(this.img);
                this.$emit('ready', {
                    width: imgObj.width,
                    height: imgObj.height
                });
            },
            async resize(width, height) {
                // console.log(`resize width :: ${width}, height :: ${height}`);
                const imgObj = await this.getImgObj(this.img);
                const { canvas } = this.$refs.cropper.getResult();
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext("2d");
                ctx.drawImage(imgObj, 0, 0, width, height);

                this.$emit('update:img', canvas.toDataURL());
            },
            getImgObj (imageData) {
                return new Promise((resolve, reject) => {
                    const imgObj = new Image();
                    imgObj.src = imageData;
                    imgObj.onload = () => {
                        resolve(imgObj)
                    };
                    imgObj.onerror = error => reject(error);
                });
            }
        }
    }
</script>

<style scoped lang="scss">

</style>