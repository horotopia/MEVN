<template>
    <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-100 z-9999">
        <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
            <form @submit.prevent="handleSubmit">
                <div v-for="(value, key) in formData" :key="key" class="mb-4">
                    <label :for="key" class="block text-sm font-medium text-gray-700">{{ key }}</label>
                    <input
                        v-if="getInputType(key) !== 'select'"
                        v-model="formData[key]"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        :id="key"
                        :type="getInputType(key)"
                        :disabled="isDisabled(key)"
                    />
                    <select
                        v-else
                        v-model="formData[key]"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        :id="key"
                        :disabled="isDisabled(key)"
                    >
                        <option v-for="option in getOptions(key)" :key="option.value" :value="option.value">
                            {{ option.text }}
                        </option>
                    </select>
                </div>
                <div class="flex justify-end mt-4">
                    <button type="button" class="btn btn-secondary mr-2" @click="close">Cancel</button>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        item: {
            type: Object,
            required: true
        },
        disableFields: {
            type: Array,
            required: false,
            default: () => []
        },
        fieldTypes: {
            type: Object,
            required: false,
            default: () => ({})
        },
        selectOptions: {
            type: Object,
            required: false,
            default: () => ({})
        }
    },
    data() {
        return {
            formData: { ...this.item }
        };
    },
    methods: {
        handleSubmit() {
            this.$emit('submit', this.formData);
        },
        close() {
            this.$emit('close');
        },
        isDisabled(key) {
            return this.disableFields.includes(key);
        },
        getInputType(key) {
            return this.fieldTypes[key] || 'text';
        },
        getOptions(key) {
            return this.selectOptions[key] || [];
        }
    }
};
</script>