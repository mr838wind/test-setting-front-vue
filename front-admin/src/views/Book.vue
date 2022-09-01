<!--
    용도: 콘텐츠 관리
-->

<template>
    <div class="page-contents">
        <div class="section-area">

            <section class="section">
                <h2 class="page-title">콘텐츠 관리</h2>


                <!-- search box -->
                <div class="group-box search-box">

                    <div class="flex-box">
                        <div class="title">등록날짜</div>
                        <div class="content-wrap">
                            <WDDatepickerGroup :timeSelect="false"
                                               v-model="searchParams.registerDtm" />
                        </div>
                    </div>

                    <div class="flex-box">
                        <div class="title">홈화면 노출여부</div>
                        <div class="content-wrap">
                            <WDSelectBox v-model="searchParams.displayYn"
                                         :options="[
                                             { text: '전체', value: ''},
                                             { text: '비노출', value: 'n'},
                                             { text: '노출', value: 'y'},
                                         ]"/>
                        </div>
                    </div>

                    <div class="btn-wrap">
                        <WDButton :variant="'info'"
                                  @click="searchBookList(1)">
                            조회
                        </WDButton>

                        <WDButton style="margin-left: 10px;" :variant="'primary'"
                                  @click="initSearchParam()">
                            초기화
                        </WDButton>

                    </div>
                </div>


                <div class="table-btn-top">
                    <div class="btn-wrap">
                        <WDButton :variant="'dark'"
                                  @click="showInsertContentsModal">
                            새 콘텐츠 등록
                        </WDButton>
                    </div>
                </div>

                <!-- result table -->
                <p v-if="items.length < 1"
                   class="no-result">
                    검색결과가 없습니다.
                </p>
                <template v-else>


                    <!-- Draggable Table -->
                    <WDTableDraggable :fields="fields"
                                      :items="items"
                                      :tableKey="'seq'"
                                      :disabled="dragDisabled"
                                      @change="changeItems">

                        <template slot="row-data"
                                  slot-scope="{row}">
                            <b-td>
                                <WDCheckBoxModel v-model="row.checked"
                                                 @input="changeChecked($event, row)" />
                            </b-td>
                            <b-td>{{ row.registerDtm | formatDateTime }}</b-td>
                            <b-td @click="showUpdateContentsModal(row)" class="btn-link">{{ row.bookId }}</b-td>
                            <b-td>{{ row.name }}</b-td>
                            <b-td>
                                <div class="img-wrap">
                                    <img v-if="row.imageList && row.imageList.length > 0"
                                         :src="row.imageList[0].imageWebPath"
                                         alt="이미지 미리보기">
                                </div>
                            </b-td>
                            <b-td>{{ row.listPrice | currency }}</b-td>
                            <b-td>
                                <WDToggleYn v-model="row.displayYn"
                                          @change="changeExposure($event, row)" />
                            </b-td>
                        </template>

                    </WDTableDraggable>


                    <!-- pagination -->
	                <WDPagination :perPage="searchParams.perPage"
	                              :currentPage="searchParams.page"
	                              :totalRowCnt="searchParams.totalCount"
	                              @change="searchBookList"/>

                    <div class="table-manage-bottom">
                        <WDButton :variant="'danger'"
                                  @click="deleteContents">
                            콘텐츠 삭제
                        </WDButton>
                    </div>
                </template>
            </section>

        </div>


        <!-- 새 콘텐츠 등록 Modal -->
        <WDModal ref="insertContentsModal"
                 :title="'콘텐츠 관리 > 등록'"
                 :isBtnX="false"
                 :scale="'xl'">
            <template v-slot:body>
                <div class="group-box">

	                <div class="flex-box">
		                <div class="title">콘텐츠 ID</div>
		                <div class="content-wrap">
			                <WDInput :placeholder="'띄어쓰기 없이 영문, 숫자, _만 사용하여 20자 이내'"
			                         v-model="insertParams.bookId"
			                         :maxLength="20"
			                         :disabled="insertParams.isUpdate"/>
		                </div>
	                </div>

                    <div class="flex-box">
                        <div class="title">콘텐츠 이름</div>
                        <div class="content-wrap">
                            <WDInput :placeholder="'30자 이하로 작성해 주세요.'"
                                     :maxLength="30"
                                     v-model="insertParams.name"/>
                        </div>
                    </div>

                    <div class="flex-box">
                        <div class="title">원 가격</div>
                        <div class="content-wrap">
                            <WDInput :placeholder="'숫자만 입력'"
                                     :type="'number'"
                                     v-model="insertParams.listPrice"/>
                        </div>
                    </div>

                    <div class="flex-box">
                        <div class="title">{{ insertParams.packageYn == 'n' ? '심볼' : '패키지' }} 이미지 업로드 <br>(340 X 374 pixel)</div>
                        <div class="content-wrap">
                            <WDFileUpload :multiple="false"
                                          :previewWidth="300"
                                          :previewHeight="300"
                                          :options="{
                                              maxFilesize: 6,
                                              dictFileTooBig: '파일 용량이 {{maxFilesize}}MB를 초과하였습니다.',
                                              dictInvalidFileType: '지원하는 파일형식이 아닙니다.',
                                              dictCancelUploadConfirmation: '해당 파일을 제거하겠습니까?',
                                          }"
                                          :display-existing-files="getDisplayExistingFile('M')"
                                          :cropMinAspectRatio="1/1"
                                          :cropMaxAspectRatio="1/1"
                                          @change="(file) => {uploadFile.mainImageFile = file[0];}" />
                            <p class="desc">jpg, gif, png 파일만 가능합니다.</p>
                        </div>
                    </div>

                    <div class="flex-box">
                        <div class="title">콘텐츠 설명 이미지 업로드 <br>(1080 X 1852 pixel)</div>
                        <div class="content-wrap">
                            <WDFileUpload :multiple="true"
                                          :previewWidth="300"
                                          :previewHeight="300"
                                          :options="{
											  maxFiles: 6,
                                              maxFilesize: 6,
                                              dictFileTooBig: '파일 용량이 {{maxFilesize}}MB를 초과하였습니다.',
                                              dictMaxFilesExceeded: '등록 가능한 파일 {{maxFiles}}개를 초과하였습니다.',
                                              dictInvalidFileType: '지원하는 파일형식이 아닙니다.',
                                              dictCancelUploadConfirmation: '해당 파일을 제거하겠습니까?',
                                          }"
                                          :display-existing-files="getDisplayExistingFile('T')"
                                          @existingFileRemove="removePrevImageFile"
                                          :cropMinAspectRatio="1/1"
                                          :cropMaxAspectRatio="1/1"
                                          @change="(file) => {uploadFile.imageFileList = file;}"/>
                            <p class="desc">jpg, gif, png 파일만 가능합니다.</p>
                        </div>
                    </div>

	                <div class="flex-box">
		                <div class="title">홈 화면 노출</div>
		                <div class="content-wrap">
			                <WDToggleYn v-model="insertParams.displayYn"
			                            @change="(data) => {insertParams.displayYn = data}" />
		                </div>
	                </div>
                </div>
            </template>

            <template v-slot:footer>
                <WDButton :variant="'danger'"
                          @click="closeInsertContentsModal" >
                    취소
                </WDButton>
                <WDButton :variant="'success'"
                          @click="insertUpdateContents" >
	                {{ insertParams.isUpdate ? '수정' : '등록' }}
                </WDButton>

                <template v-if="showModalPreloader">
                    <loader object="#ff9633" color1="#ffffff" color2="#17fd3d" size="5" speed="2" bg="#343a40"
                        objectbg="#999793" opacity="80" disableScrolling="false" name="dots"></loader>

                </template>
            </template>
        </WDModal>




    </div>
</template>

<script>
    import CommonUtil from "@/utils/CommonUtil";
	import _ from 'lodash';
    import ApiServiceError from "@/plugins/api-service-error";

    export default {
        inject: ['bookService'],
        data() {
            return {
                fields: [
                    { key: 'checked', label: '선택' },
                    { key: 'registerDtm', label: '등록/수정 날짜' },
                    { key: 'bookId', label: '콘텐츠 ID' },
                    { key: 'name', label: '콘텐츠 이름' },
                    { key: 'imageList', label: '이미지' },
                    { key: 'listPrice', label: '가격' },
                    { key: 'displayYn', label: '홈화면 노출' },
                ],
                items: [
                ],
                showModalPreloader: false,

	            dragDisabled: true,
                searchParams: {
                    registerDtm: ['', ''],
	                registerStartDtm: '',
	                registerEndDtm: '',
                    displayYn: '',
                    //
	                page: 1,
	                perPage: 10,
	                totalCount: 0,
                },
                insertParams: {
					isUpdate: false,
                    bookId: '',
                    name: '',
                    listPrice: '0',
                    displayYn: 'y',

	                imageList: [],
	                removePrevImageList: [],
                },
	            uploadFile: {
		            mainImageFile: {},
		            imageFileList: [],
	            },

                selectedRow: [],
            }
        },
        methods: {

            initSearchParam() {

                this.searchParams = {
                    registerDtm: ['', ''],
                    registerStartDtm: '',
                    registerEndDtm: '',
                    displayYn: '',
                    //
                    page: 1,
                    perPage: 10,
                    totalCount: 0,
                }

            },

			getDisplayExistingFile(imageType){
				const result = [];
				this.insertParams.imageList.forEach(iter => {
					if(iter.imageType === imageType){
						result.push(iter);
					}
				})
				return result;
			},

            showInsertContentsModal() {
	            this.insertParams.isUpdate = false;
                this.$refs['insertContentsModal'].show();
            },
	        showUpdateContentsModal(item) {
		        this.insertParams = _.cloneDeep(item);
		        this.insertParams.removePrevImageList = [];
		        this.insertParams.isUpdate = true;
				this.$refs['insertContentsModal'].show();
	        },
            closeInsertContentsModal() {
				// 초기화
				this.insertParams = {
					isUpdate: false,

					name: '',
					listPrice: '0',
					bookId: '',
					displayYn: 'y',

					imageList: [],
					removePrevImageList: [],
				};
				this.uploadFile = {
					mainImageFile: {},
					imageFileList: [],
				}

                this.$refs['insertContentsModal'].close();
            },
            setRowChecked(items) {
                for(let i=0; i<items.length; i++) {
                    items[i].checked = false;
                }
            },
            async changeItems(newItems) {
				// 탭/섹션 검색시에만 기능 동작
            },
            changeChecked(val, item) {
                if(val) {

                    if(!this.selectedRow.includes(item.bookId)) {
                        this.selectedRow.push(item.bookId);
                        this.selectedRow.sort();
                    }

                } else {

                    for(let i=0; i<this.selectedRow.length; i++) {
                        if(this.selectedRow[i] === item.bookId) {
                            this.selectedRow.splice(i, 1);
                        }
                    }

                }
            },

	        async changeExposure(changeData, data) {
                console.log('changeExposure: changeDate, date: ',changeData, data)
            },
            deleteContents() {
                if(this.selectedRow.length < 1) {
                    this.$showAlert(
                        {
                            title: '알림',
                            content: '삭제할 콘텐츠를 선택해주세요.',
                            callback: () => {},
                            okBtnName: '확인'
                        }
                    )
                    return;
                }


	            this.$showConfirm(
		            {
			            title: '콘텐츠 삭제',
			            content: '콘텐츠를 삭제하면 콘텐츠들이 프론트에서 노출되지 않습니다. 삭제하시겠습니까?',
			            callback: async (msg) => {
				            if(msg === 'ok') {
					            await this.apiDeleteBook();
					            this.selectedRow = [];
					            await this.searchBookList(1);
				            }
			            },
			            okBtnName: '확인',
			            cancelBtnName: '취소'
		            }
	            )
            },

	        removePrevImageFile(val){
				this.insertParams.removePrevImageList.push(val);
	        },

	        async insertUpdateContents() {
		        // await this.$showLoading();
                this.showModalPreloader = true;

				let result = true;
				if(this.insertParams.isUpdate) result = await this.updateContents();
				else result = await this.insertContents();

				// await this.$hideLoading();
                this.showModalPreloader = false;

				if(!result) return false;

		        await this.searchBookList(this.searchParams.page);
		        this.closeInsertContentsModal();
	        },
            async insertContents() {
				if( !this.validateParams() ) return false;
				if( !this.validateUploadFile() ) return false;

                try {
                    const result = await this.apiInsertBook();
                } catch ( e ) {
                    if(e instanceof ApiServiceError) {
                        this.$showAlert({
                            title: '알림',
                            content: result.errorMessage,
                            callback: () => {},
                            okBtnName: '확인'
                        });
                    } else {
                        throw e;
                    }
                    return false;
                }
				return true;
            },
	        async updateContents() {
				console.warn('update params', this.insertParams);
		        if( !this.validateParams() ) return false;
				try {
                    const result = await this.apiUpdateBook();
                } catch ( e ) {
                    if(e instanceof ApiServiceError) {
                        this.$showAlert({
                            title: '알림',
                            content: result.errorMessage,
                            callback: () => {},
                            okBtnName: '확인'
                        });
                    } else {
                        throw e;
                    }
                    return false;
                }
				return true;
	        },
	        validateParams() {
				if( isNaN(Number(this.insertParams.listPrice)) ){
					this.$showAlert(
						{
							title: '알림',
							content: `숫자 입력필드는 숫자만 입력해 주세요.`,
							callback: () => {},
							okBtnName: '확인'
						}
					)
					return false;
				}

				return CommonUtil.validateRequired(this, 'insertParams', 'bookId', '콘텐츠 ID')
					&& CommonUtil.validateDatabaseId(this, 'insertParams', 'bookId', '콘텐츠 ID')
					&& CommonUtil.validateStringLength(this, 'insertParams', 'bookId', '콘텐츠 ID', 20)
					&& CommonUtil.validateRequired(this, 'insertParams', 'name', '콘텐츠 이름')
					&& CommonUtil.validateStringLength(this, 'insertParams', 'name', '콘텐츠 이름', 30)
					&& CommonUtil.validateRequired(this, 'insertParams', 'listPrice', '원 가격')
					&& CommonUtil.validateRequired(this, 'insertParams', 'displayYn', '홈 화면 노출')
	        },


            validateUploadFile() {
                return CommonUtil.validateRequired(this, 'uploadFile', 'mainImageFile', '심볼/패키지 이미지');
            },

	        // init 탭 및 섹션 검색 옵션
			async initData(){

			},

	        async searchBookList(page){
				this.searchParams.page = page;
				await this.apiGetBookList();

				// 탭 겁색시에만 드래그 가능
	        },
	        async apiGetBookList(){
				const response = await this.bookService.listBook( this.searchParams );
				console.warn(response);
				this.items = response.list;
				this.searchParams.totalCount = response.totalCount;
	        },

	        async apiInsertBook() {
				const response = await this.bookService.insertBook(this.insertParams, this.uploadFile);
				return response;
	        },

	        async apiUpdateBook() {
				const response = await this.bookService.updateBook(this.insertParams, this.uploadFile);
				return response;
	        },

	        async apiDeleteBook() {
		        const response = await this.bookService.deleteBook(this.selectedRow);
	        },
        },
        async mounted() {

            this.initSearchParam();
			await this.initData();
			await this.searchBookList(1);

            this.setRowChecked(this.items);
        },
        computed: {

        },
        watch: {
        },
    }
</script>

<style scoped lang="scss">
    .excel-box {
        width: 300px !important;
        position: absolute;
        text-align: center;
        font-weight: bold;
        color: #3db13c;
        font-size: 14px;
    }

    .last-updated {
        color: #e70606;
        font-weight: bold;
        font-size: 15px;
    }

    .loader-text {
        position: fixed;
    }

    .mp3-uploader {
        font-size: 12px;
    }

    .upload-btn {
        font-size: 13px;
        padding: 2px 15px 2px 15px;
        margin-right: 10px;
        border: 1px solid #bcb5b5;
    }
</style>
