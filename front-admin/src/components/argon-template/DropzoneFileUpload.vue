<template>
  <div class="dropzone mb-3 dz-clickable"
       :class="[multiple ? 'dropzone-multiple': 'dropzone-single']"
       ref="fileWrap"
  >
    <div class="fallback">
      <div class="custom-file">
        <input type="file"
               class="custom-file-input"
               id="projectCoverUploads"
               :multiple="multiple">
        <label class="custom-file-label" for="projectCoverUploads">Choose file</label>
      </div>
    </div>
    <div class="dz-preview dz-preview-single"
         v-if="!multiple"
         :class="previewClasses"
         ref="previewSingle">
      <div class="dz-preview-cover">
        <img class="dz-preview-img" data-dz-thumbnail>
      </div>
    </div>
    <b-list-group v-else
        flush=""
        class="dz-preview dz-preview-multiple list-group-lg"
        :class="previewClasses"
        ref="previewMultiple">
      <b-list-group-item class="px-0">
        <b-row class="align-items-center">
          <b-col cols="auto">
            <div class="avatar">
              <b-img rounded class="avatar-img" data-dz-thumbnail />
            </div>
          </b-col>
          <b-col class="ml--3">
            <h4 class="mb-1" data-dz-name>...</h4>
<!--            <p class="small text-muted mb-0" data-dz-size>...</p>-->
          </b-col>
          <b-col cols="auto">
            <b-button data-dz-remove="true" variant="danger" size="sm">
              <b-icon icon="trash" />
            </b-button>
          </b-col>
        </b-row>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>
<script>
  export default {
    name: 'dropzone-file-upload',
    props: {
      options: {
        type: Object,
        default: () => ({})
      },
      value: [String, Object, Array],
      url: {
        type: String,
        default: 'http://'
      },
      importUrl: {
        type: String,
        default: ''
      },
      multiple: Boolean,
      previewClasses: [String, Object, Array],
      displayExistingFiles: {
        type: Array,
        default: () => []
      },
	  pathKey: {
      	type: String,
		default: 'imageWebPath'
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
    model: {
      prop: 'value',
      event: 'change'
    },
    data() {
      return {
        currentFile: null,
        files: [],
        showList: false,
        dropzone: null,
      }
    },
    methods: {
      async initDropzone() {
        let Dropzone = await import('dropzone')
        Dropzone = Dropzone.default || Dropzone
        Dropzone.autoDiscover = false
        let preview = this.multiple ? this.$refs.previewMultiple : this.$refs.previewSingle;
        let self = this
        let finalOptions = {
          url: this.url,
          thumbnailWidth: null,
          thumbnailHeight: null,
          previewsContainer: preview,
          previewTemplate: preview.innerHTML,
          maxFiles: (!this.multiple) ? 1 : null,
          acceptedFiles: this.acceptedFiles,
          isUpdate: this.isUpdate,
          accept: function(file, done) {
            if(self.options.maxFiles && self.options.maxFiles < self.files.length){
              done(self.options.dictMaxFilesExceeded.replace("{{maxFiles}}", self.options.maxFiles));
            }else{
              done();
            }
          },
          init: function () {
            this.on("addedfile",  (file) => {
              if(self.multiple){
                self.files.push(file)
              }else{
                if(self.files.length > 0){
                  self.files.forEach((file) => {
                    self.removeFile(file);
                  })
                }
                self.files = [file];

                self.$nextTick(() => {
                    if(self.$refs.fileWrap.classList) {
                        self.$refs.fileWrap.classList.add('dz-max-files-reached');
                    }
                })
              }
              if(file.type && file.type.indexOf('image/') > -1 && (typeof self.options.maxFiles === 'undefined' || (self.options.maxFiles && self.options.maxFiles >= self.files.length))) {
                self.$emit('show-crop', file);
              }
              if(!file.upload.isExistingFile) {
                self.$emit('change', self.files.filter((file) => {
                  return !file.upload.isExistingFile;
                }));
              }
            });
            this.on("removedfile", (file) => {
              let index = self.files.findIndex((f) => {
                return f.upload && f.upload.uuid === file.upload.uuid
              })
              if (index !== -1) {
                if(self.files[index].upload.isExistingFile){
                  self.$emit('existingFileRemove', self.files[index].upload.seq);
                }
                self.$emit('fileRemove');
                self.files.splice(index, 1);
              }
              self.$emit('change', self.files.filter((file) => {
                return !file.upload.isExistingFile;
              }));
            });
            this.on("error", (file, message) => {
              self.removeFile(file);
              self.$emit('invalid-file', message);
            });
          },
          autoProcessQueue: false,
          ...this.options,
        }
        this.dropzone = new Dropzone(this.$el, finalOptions)
        preview.innerHTML = ''
      },
      async setDisplayExistingFiles() {
        this.displayExistingFiles.forEach(async (file) => {
          if(file[this.pathKey] === null || typeof file[this.pathKey] === 'undefined') {
              return;
          }
          const base64 = await this.imgUrlToB64(file[this.pathKey]);
          let block = base64.split(";");
          let contentType = block[0].split(':')[1];

          this.dropzone.displayExistingFile({
            name: file.logicName,
            size: file.size,
            upload: {
              isExistingFile: true,
              seq: file.seq,
              uuid: this.createUuid(),
            }
          }, this.isImage(contentType) ? file[this.pathKey] : 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
           null, '*');
        })
      },
      async imgUrlToB64(url){
        var xhr = new XMLHttpRequest();
        return new Promise((resolve, reject) => {
          xhr.onload = function() {
            var reader = new FileReader();
            reader.onloadend = () => {
              resolve(reader.result);
            };
            reader.readAsDataURL(xhr.response);
          };
          xhr.open('GET', url);
          xhr.responseType = 'blob';
          xhr.send();
        });
      },
      isImage(contentType) {
        return contentType.split('/')[0] === 'image';
      },
      createUuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = Math.random() * 16 | 0,
                  v = c === 'x' ? r : r & 0x3 | 0x8;
          return v.toString(16);
        });
      },
      async setCropImageFile(file, base64, originalFile) {
        this.removeFile(originalFile);

        this.$nextTick(() => {
          file.upload.uuid = this.createUuid();
          this.dropzone.displayExistingFile(file, base64, null, '*');
          this.$refs.fileWrap.classList.add('dz-max-files-reached');
        });
      },
      removeFile(file) {
        this.dropzone.removeFile(file);
      },
      removeAllFile() {
          this.files.forEach((file)=>{
              this.dropzone.removeFile(file);
          })
      },
    },
    async mounted() {
      await this.initDropzone();
      /*if(this.importUrl && !this.multiple){
        await this.setSingleFile(this.importUrl);
      }*/
      await this.setDisplayExistingFiles();
    }
  }
</script>
<style>

</style>
