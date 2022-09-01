<!--
    용도 : Datepicker Group Component

    입출력: { startDateTime: '20210913120000', endDateTime: '20210915130000' } // 14자리 날짜

-->

<template>
    <div class="date-group">

        <!-- Start Date -->
        <!-- 주석처리 :max="new Date()" -->
        <WDDatepickerModel v-model="startDate"
                      :disabled="disabled"
        />
        <WDSelectBox v-if="timeSelect"
                     :options="timeOptions"
                     v-model="startTime" />

        <span class="dash">~</span>

        <!-- End Date -->
        <!-- 주석처리 :max="new Date()" -->
        <WDDatepickerModel v-model="endDate"
                      :disabled="disabled"
        />
        <WDSelectBox v-if="timeSelect"
                     :options="timeOptions"
                     v-model="endTime" />
    </div>
</template>

<script>
    import CommonUtil from "@/utils/CommonUtil";

    export default {
        name: "WDDatepickerGroupModel",
        // v-model setting:
        model: {
            prop: 'value',
            event: 'input'
        },
        data() {
            return {
                timeOptions: [
                    { text: '00시', value: '00'},
                    { text: '01시', value: '01'},
                    { text: '02시', value: '02'},
                    { text: '03시', value: '03'},
                    { text: '04시', value: '04'},
                    { text: '05시', value: '05'},
                    { text: '06시', value: '06'},
                    { text: '07시', value: '07'},
                    { text: '08시', value: '08'},
                    { text: '09시', value: '09'},
                    { text: '10시', value: '10'},
                    { text: '11시', value: '11'},
                    { text: '12시', value: '12'},
                    { text: '13시', value: '13'},
                    { text: '14시', value: '14'},
                    { text: '15시', value: '15'},
                    { text: '16시', value: '16'},
                    { text: '17시', value: '17'},
                    { text: '18시', value: '18'},
                    { text: '19시', value: '19'},
                    { text: '20시', value: '20'},
                    { text: '21시', value: '21'},
                    { text: '22시', value: '22'},
                    { text: '23시', value: '23'},
                    { text: '24시', value: '24'},
                ],
                //startTime: '00',
                //endTime: '00',
            }
        },
        props: {
            value: {type: Object, default: null},  // {startDateTime, endDateTime}

            timeSelect: { // 잠시 timeSelect 지원안함. TODO//dev
                type: Boolean,
                default: true,
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            // v-model:   계산이 중복되는것 같아 watch 방식이 더 좋을수 있겠다.
            startDate: {
                get: function() {
                    CommonUtil.log('>> startDate: get: this.value ', this.value);
                    if(this.value) {
                        return this.value.startDateTime.substring(0,8);
                    }
                    return '';
                },
                set: function(val) {
                    CommonUtil.log('>> startDate: set: val ', val);
                    let _startDateTime = '';
                    if(val) {
                        let _startTime = this.startTime || '00';
                        _startDateTime = val + _startTime + '0000';
                    }
                    const payload = this.value || {};
                    this.$emit('input', {...payload, startDateTime: _startDateTime});
                }
            },
            startTime: {
                get: function() {
                    CommonUtil.log('>> startTime: get: this.value ', this.value);
                    if(this.value) {
                        return this.value.startDateTime.substring(8,10);
                    }
                    return '';
                },
                set: function(val) {
                    CommonUtil.log('>> startTime: set: val ', val);
                    let _startDateTime = '';
                    if(val && this.startDate ) { // 날짜 있어야 값 줌
                        _startDateTime = this.startDate + val + '0000';
                    }
                    const payload = this.value || {};
                    this.$emit('input', {...payload, startDateTime: _startDateTime});
                }
            },
            endDate: {
                get: function() {
                    if(this.value) {
                        return this.value.endDateTime.substring(0,8);
                    }
                    return '';
                },
                set: function(val) {
                    let _endDateTime = '';
                    if(val) {
                        let _endTime = this.endTime || '00';
                        _endDateTime = val + _endTime  + '0000';
                    }
                    const payload = this.value || {};
                    this.$emit('input', {...payload, endDateTime: _endDateTime});
                }
            },
            endTime: {
                get: function() {
                    if(this.value) {
                        return this.value.endDateTime.substring(8,10);
                    }
                    return '';
                },
                set: function(val) {
                    let _endDateTime = '';
                    if(val && this.endDate ) { // 날짜 있어야 값 줌
                        _endDateTime = this.endDate + val + '0000';
                    }
                    const payload = this.value || {};
                    this.$emit('input', {...payload, endDateTime: _endDateTime});
                }
            },
        },
    }
</script>

<style scoped lang="scss">

</style>
