<template>
    <div class="bg-white p-6 w-full">
        <h2 class="text-xl font-bold mb-4">{{ text.title }}</h2>
        <form @submit.prevent="handleSubmit">
            <div class="flex flex-wrap">
                <div v-for="(value, key) in forms" :key="key" class="flex flex-col mb-4 px-2"
                :class="`${value.columns?.container ? `${value.columns.container}` : 'w-full'}`">
                    <label :for="key" class="block text-sm font-medium text-gray-700">{{ formData[key].label }}</label>

                    <select v-if="formData[key].type === 'select'"
                        v-model="formData[key].value"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        :id="key"
                        :name="key"
                        :disabled="formData[key].disabled"
                    >
                        <option v-for="option in formData[key].options" :key="option.value" :value="option.value">
                            {{ option.text }}
                        </option>
                    </select>

                    <textarea v-if="formData[key].type === 'textarea'" v-model="formData[key].content"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" :id="key" :type="formData[key].type"
                        :disabled="formData[key].disabled"
                        :required="formData[key].required"
                    ></textarea>

                    <div v-if="formData[key].type === 'radio'" class="flex mt-1">
                        <div v-for="(item, index) in formData[key].items" class="flex-col space-x-2 hover:text-gray-700 transition-colors duration-200 ml-2 flex-wrap">
                            <input :id="`${key}-${index}`" :name="key" type="radio" v-model="item.value" :disabled="formData[key].disabled" />
                            <label :for="`${key}-${index}`" class="ml-2">{{ item.text }}</label>
                        </div>
                    </div>

                    <input
                        v-if="formData[key].type === 'text' || formData[key].type === 'number'"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        v-model="formData[key].value"
                        :id="key"
                        :name="key"
                        :type="formData[key].type"
                        :class="formData[key].class"
                        :disabled="formData[key].disabled"
                        :required="formData[key].required"
                        :placeholder="formData[key].placeholder"
                        :min="formData[key].min"
                        :max="formData[key].max"
                    />

                    <div v-if="formData[key].type === 'custom'" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" v-html="formData[key].content"></div>

                    <span v-if="formData[key].description" class="text-gray-500 text-sm">{{ formData[key].description }}</span>
                </div>
            </div>
            <div class="flex justify-end mt-4">
                <button type="submit" class="mr-2 p-1.5 rounded-md" v-if="text.submit"
                    :style="{ backgroundColor: text.submit?.color || '#4CAF50', color: text.submit?.textColor || '#fff' }">
                    {{ text.submit?.text || text.submit }}
                </button>
                <slot name="footer"></slot>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['submit']);
const props = defineProps({
    text: {
        type: Object,
        required: false,
        default: () => ({
            title: 'Ajouter un élément',
            submit: {
                text: 'Ajouter',
                color: '#333'
            }
        })
    },
    forms: {
        type: Array,
        reqduired: true
    }
});

const formData = ref({
    ...props.forms
});

const handleSubmit = () => {
    emit('submit', formData.value);
}
</script>