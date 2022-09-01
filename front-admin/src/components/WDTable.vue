<!--
    용도 : Table Component
    Bootstrap Vue Component 참조 : https://bootstrap-vue.org/docs/components/table

    [ options json 사용 ]
        fields: [
            {
                key: 'last_name',
                sortable: true
            },
            {
                key: 'first_name',
                sortable: false
            },
            {
                key: 'age',
                sortable: true,
            }
        ],
        items: [
            { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
            { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
            { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
            { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
-->

<template>
    <b-table ref="selectableTable"
             table-class="text-nowrap"
             responsive
             striped
             hover
             :sticky-header="stickyHeader"
             :selectable="selectable"
             :select-mode="selectMode"
             @row-selected="onRowSelected"
             :fields="fields"
             :items="items">

        <!-- slot -->
        <template v-for="slot in Object.keys($scopedSlots)"
                  v-slot:[toCellName(slot)]="props">
            <slot v-bind="props"
                  :name="slot" />
        </template>

    </b-table>
</template>

<script>
    export default {
        name: "WDTable",
        data() {
            return {

            }
        },
        props: {
            fields:{
                type: Array,
                default: () => [],
            },
            items:{
                type: Array,
                default: () => [],
            },
            stickyHeader: {
                type: Boolean,
                default: false
            },
            selectable: {
                type: Boolean,
                default: true
            },
            selectMode: {
                type: String,
                default: 'single',
                description: 'multi | single | range'
            }
        },
        methods: {
            onRowSelected(v) {
                this.$emit('rowSelected', v);
            },
            selectAllRows() {
                this.$refs.selectableTable.selectAllRows();
            },
            clearSelected() {
                this.$refs.selectableTable.clearSelected();
            },
            toCellName (slot) {
                return `cell(${slot})`
            }
        }
    }
</script>

<style scoped lang="scss">

</style>