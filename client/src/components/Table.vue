<script setup>
import { ref, computed, useSlots, watch } from 'vue';

const props = defineProps({
	data: {
		type: Array,
		required: true,
		default: () => []
	},
	options: {
		type: Object,
		required: false,
		default: () => ({
			header: {
				title: 'Table list',
				description: 'Description'
			},
			search: false,
            export: true
		})
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
});

const emit = defineEmits(['rowSelected']);

const slots = useSlots()

const currentPage = ref(1);
const currentItemsPerPage = ref(props.itemsPerPage);
const totalItem = ref(0);
const data = ref(props.data);
const search = ref('');

const recursiveSearch = (item, searchTerm) => {
    return Object.keys(item).some((key) => {
        if (item[key] && typeof item[key] === 'object') {
            return recursiveSearch(item[key], searchTerm);
        }
        return String(item[key]).toLowerCase().includes(searchTerm.toLowerCase());
    });
};

const dataFiltered = computed(() => {
    const start = (currentPage.value - 1) * currentItemsPerPage.value;
    const end = currentPage.value * currentItemsPerPage.value;

    const filtered = props.data.filter((item) => recursiveSearch(item, search.value));

    totalItem.value = filtered.length;

    data.value = filtered.slice(start, end);

    return data.value;
})

const totalPages = computed(() => {
    return Math.ceil(totalItem.value / currentItemsPerPage.value);
})

const startItem = computed(() => {
	return (currentPage.value - 1) * currentItemsPerPage.value + 1;
})

const endItem = computed(() => {
	return Math.min(currentPage.value * currentItemsPerPage.value, data.value.length);
})

const rowSelected = function(item) {
	emit('rowSelected', item)
}

const hasNamedSlot = function(slotName) {
	return slots[slotName] !== undefined
}

const prevPage = function() {
	if (currentPage.value > 1) {
		currentPage.value--;
	}
}

const nextPage = function() {
	if (currentPage.value < totalPages.value) {
		currentPage.value++;
	}
}

const goToPage = function(page) {
	currentPage.value = page;
}

const changeItemsPerPage = function(event) {
	const value = event.target.value;
	currentItemsPerPage.value = value === '*' ? props.data.length : parseInt(value);
	currentPage.value = 1;
}

const exportCsv = function() {
    const items = props.data

    const replacer = (key, value) => value === null ? '' : value

    let header = []
    for(const field of props.fields) {
        if (field.exportCsv !== false) {
            header.push(field.label)
        }
    }

    let csv = []
    for(const row of items) {
        let rowArray = []
        for (const field of props.fields) {
            if (field.exportCsv !== false) {
                if (!hasNamedSlot(field.key)) {
                    rowArray.push(JSON.stringify(row[field.key], replacer))
                } else {
                    rowArray.push(slots[field.key]({ item: row })[0].children)
                }
            }
        }
        csv.push(rowArray.join(';'))
    }

    csv.unshift(header.join(';'))

    const csvArray = csv.join('\r\n')

    const anchor = document.createElement('a');
    anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvArray);
    anchor.target = '_blank';
    anchor.download = 'export.csv'
    anchor.click();
}

watch(search, () => {
    currentPage.value = 1;
})
</script>

<template>
    <div class="flex flex-col h-full overflow-hidden relative text-gray-700 w-full">
        <div class="flex items-center justify-between">
            <div v-if="props.options.header">
                <h3 class="text-lg font-semibold text-slate-800">{{ props.options.header.title }}</h3>
                <p class="text-slate-500">{{ props.options.header.description }}</p>
            </div>
            <div class="flex items-center">
                <div class="ml-3" v-if="props.options.export">
                    <div class="w-full max-w-sm relative">
                        <div class="relative">
                            <button class="my-auto px-2 flex items-center bg-white rounded "
                                type="button" @click="exportCsv">
                                Exporter en csv
                            </button>
                        </div>
                    </div>
                </div>
                <div class="ml-3" v-if="props.options.search">
                    <div class="w-full max-w-sm relative">
                        <div class="relative">
                            <input
                                class="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                placeholder="Rechercher dans la liste" type="text" id="search" name="search" v-model="search" />
                            <button class="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                                type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3"
                                    stroke="currentColor" class="w-8 h-8 text-slate-600">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div
            class="bg-clip-border bg-white flex flex-col h-full overflow-y-hidden relative shadow-md rounded-sm text-gray-700 w-full pt-4">
            <table class="table-auto text-sm text-gray-500 dark:text-gray-400">
                <thead
                    class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                    <tr>
                        <th scope="col" class="px-2 py-2" v-for="(item, idx) in props.fields" :key="item.label">
                            {{ item.label }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b hover:bg-gray-50 text-left" v-for="(item, index) in dataFiltered" :key="index">
                        <td scope="row" class="font-medium text-gray-900 whitespace-nowrap px-2 py-2"
                            v-for="(field, idx) in props.fields" :key="idx" @click="rowSelected(item)">
                            <span v-if="!hasNamedSlot(field.key)" :item="item">
                                {{ item[field.key] }}
                            </span>
                            <slot v-else :name="field.key" :item="item" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
            aria-label="Table navigation">
            <div class="flex items-center flex-column flex-wrap md:flex-row">

                <span class="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                    Showing
                    <span class="font-semibold text-gray-900">{{ startItem }}-{{ endItem }}</span>
                    of
                    <span class="font-semibold text-gray-900">{{ totalItem }}</span>
                </span>

                <select @change="changeItemsPerPage($event)"
                    class="text-sm text-gray-500 bg-white border border-gray-300 rounded-lg px-3 py-1 ml-4">
                    <option :value="itemsPerPage">{{ itemsPerPage }}</option>
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
                    <button @click="goToPage(page)" :class="['flex items-center justify-center px-3 h-8 leading-tight', {
                            'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700': currentPage === page,
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
