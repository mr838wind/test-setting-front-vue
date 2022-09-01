<!--
    용도 : Datepicker Group Component
-->

<template>
    <div class="date-group">

        <!-- Start Date -->
        <!-- 주석처리 :max="new Date()" -->
        <WDDatepicker v-model="periodDate[0]"
                      :disabled="disabled"
        />
        <WDSelectBox v-if="timeSelect"
                     :options="timeOptions"
                     :value="startTime" />

        <span class="dash">~</span>

        <!-- End Date -->
        <!-- 주석처리 :max="new Date()" -->
        <WDDatepicker v-model="periodDate[1]"
                      :disabled="disabled"
        />
        <WDSelectBox v-if="timeSelect"
                     :options="timeOptions"
                     :value="endTime" />
    </div>
</template>

<script>
    export default {
        name: "WDDatepickerGroup",
        model: {
            prop: 'periodDate'
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
                startTime: '00',
                endTime: '00'
            }
        },
        props: {

            periodDate: {
                type: Array,
                default: () => [ new Date(new Date().setMonth(new Date().getMonth() - 1)), new Date() ]
            },

            timeSelect: {
                type: Boolean,
                default: true
            },
            disabled: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
