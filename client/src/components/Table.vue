<template>
    <div class="relative sm:rounded-lg">
        <div v-if="header">
            <h2>
                {{ header.title }}
            </h2>
            <p>
                {{ header.description }}
            </p>
        </div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3" v-for="(item, idx) in fields" :key="idx">
                        {{ item.label }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b hover:bg-gray-50" v-for="(item, index) in paginatedData" :key="index">
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" v-for="(field, idx) in fields" :key="idx" click="rowSelected(item)" >
                        <span v-if="!hasNamedSlot(field.key)" :item="item">
                            {{ item[field.key] }}
                        </span>
                        <slot v-else :name="field.key" :item="item" />
                    </td>
                </tr>
            </tbody>
        </table>
        <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
            <div class="flex items-center flex-column flex-wrap md:flex-row">

                <span class="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                    Showing
                    <span class="font-semibold text-gray-900">{{ startItem }}-{{ endItem }}</span>
                    of
                    <span class="font-semibold text-gray-900">{{ data.length }}</span>
                </span>

                <select @change="changeItemsPerPage($event)" class="text-sm text-gray-500 bg-white border border-gray-300 rounded-lg px-3 py-1 ml-4">
                    <option :value="itemsPerPage">{{itemsPerPage}}</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="*">All</option>
                </select>
            </div>

            <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                <li>
                    <button @click="prevPage" :disabled="currentPage === 1" v-show="currentPage > 1"
                        class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">Previous</button>
                </li>
                <li v-for="page in totalPages" :key="page">
                    <button @click="goToPage(page)" :class="
                        ['flex items-center justify-center px-3 h-8 leading-tight', { 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700': currentPage === page,
                        'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700': currentPage !== page,
                        'rounded-md': currentPage === 1 && page === 1,
                        },
                        ]">
                        {{ page }}
                    </button>
                </li>
                <li>
                    <button @click="nextPage" :disabled="currentPage === totalPages" v-show="currentPage !== totalPages"
                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">Next</button>
                </li>
            </ul>
        </nav>
    </div>
    <div>
        <div v-if="hasNamedSlot('footer')">
            <slot name="footer" />
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            data: {
                type: Array,
                required: true,
                default: () => []
            },
            header: {
                type: Object,
                required: false,
                default: () => null
            },
            fields: {
                type: Array,
                required: true,
                default: () => []
            },
            itemsPerPage: {
                type: Number,
                required: false,
                default: 10
            }
        },
        data() {
            return {
                currentPage: 1,
                currentItemsPerPage: this.itemsPerPage
            };
        },
        computed: {
            totalPages() {
                return Math.ceil(this.data.length / this.currentItemsPerPage);
            },
            startItem() {
                return (this.currentPage - 1) * this.currentItemsPerPage + 1;
            },
            endItem() {
                return Math.min(this.currentPage * this.currentItemsPerPage, this.data.length);
            },
            paginatedData() {
                const start = (this.currentPage - 1) * this.currentItemsPerPage;
                const end = this.currentPage * this.currentItemsPerPage;
                return this.data.slice(start, end);
            }
        },
        methods: {
            rowSelected (item) {
                console.log('Row selected:', item)
                this.$emit('rowSelected', item)
            },
            hasNamedSlot (slotName) {
                return this.$slots[slotName] !== undefined
            },
            prevPage() {
                if (this.currentPage > 1) {
                    this.currentPage--;
                }
            },
            nextPage() {
                if (this.currentPage < this.totalPages) {
                    this.currentPage++;
                }
            },
            goToPage(page) {
                this.currentPage = page;
            },
            changeItemsPerPage(event) {
                const value = event.target.value;
                this.currentItemsPerPage = value === '*' ? this.data.length : parseInt(value);
                this.currentPage = 1;
            }
        }
    }
</script>
