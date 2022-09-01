<!--
    용도 : Table Draggable Component

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
    <b-table-simple table-class="text-nowrap"
                    responsive
                    striped
                    hover>
        <b-thead>
            <b-tr>
                <b-th v-for="field in fields">
                    {{ field.label }}
                </b-th>
            </b-tr>
        </b-thead>

        <transition-group is="draggable"
                          tag="tbody"
                          v-model="componentItems"
                          :disabled="disabled"
                          @change="onChange"
                          animation="200">
            <b-tr v-for="item in componentItems"
                  :key="item[tableKey]">

                <!-- Slot -->
                <slot name="row-data"
                      :row="item" />

            </b-tr>
        </transition-group>

    </b-table-simple>
</template>

<script>
    import draggable from 'vuedraggable'

    export default {
        name: "WDTableDraggable",
        model: {
            event: 'change'
        },
        components: {
            draggable,
        },
        data() {
            return {
                componentItems: this.items
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
            tableKey:{
                type: String,
                default: ''
            },
	        // 드래그 막기 옵션
            disabled: {
				type: Boolean,
		        default: false,
	        }
        },
        methods: {
            onChange() {
                this.$emit('change', this.componentItems);
            }
        },
        watch: {
            items(newVal) {
                this.componentItems = newVal;
            }
        }
    }
</script>

<style scoped lang="scss">

</style>