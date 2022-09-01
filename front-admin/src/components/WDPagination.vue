<!--
    용도 : Pagination Component
    Bootstrap Vue Component 참조 : https://bootstrap-vue.org/docs/components/pagination
-->

<template>
    <b-pagination v-model="componentCurrentPage"
                  :total-rows="totalRowCnt"
                  :per-page="perPage"
                  :hide-ellipsis="hideEllipsis"
                  :limit="limit"
                  @change="onChange" />
</template>

<script>
    export default {
        name: "WDPagination",
        data() {
            return {
                componentCurrentPage: this.currentPage
            }
        },
        props: {
            currentPage: {
                type: Number,
                default: 1
            },
            totalRowCnt: {
                type: Number,
                default: 100,
            },
            perPage: {
                type: Number,
                default: 10,
            },
            hideEllipsis: {
                type: Boolean,
                default: true
            },
            limit: {
                type: [String, Number],
                default: 10
            }
        },
        methods: {
            onChange(v) {
                this.$emit('change', v);
            }
        },
        watch: {
            currentPage(newVal) {
                this.componentCurrentPage = newVal;
            }
        }
    }
</script>

<style scoped lang="scss">

</style>