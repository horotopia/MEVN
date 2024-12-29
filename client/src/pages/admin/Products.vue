<template>
    <Table
        :header="header"
        :fields="fields"
        :data="tableData"
        :itemsPerPage="10"
    >
        <template #action="{ item }">
            <button class="btn btn-primary px-4" @click="editItem(item)">Edit</button>
            <button class="btn btn-danger" @click="deleteItem(item)">Delete</button>
        </template>
    </Table>
    <ModalForm
        v-if="EditItem"
        :visible="isModalEdit"
        :title="'Edit Client'"
        :item="EditItem"
        :disableFields="disableKey"
        :fieldTypes="{}"
        :selectOptions="{}"
        @close="closeModal"
        @submit="handleSubmit"
    />
    <ModalForm
        v-if="DeleteItem"
        :visible="isModalDelete"
        :title="'Delete Client'"

        @close="closeModal"
        @submit="handleSubmit"
    />
</template>

<script setup>
import { ref } from 'vue';
import Table from '../../components/Table.vue';
import ModalForm from '../../components/ModalForm.vue';

const header = ref({
    title: 'Liste des produits'
});
const fields = ref([]);
const tableData = ref([]);
const disableKey = ref([
    '_id', 'createdAt', 'updatedAt'
]);

const isModalEdit = ref(false);
const isModalDelete = ref(false);
const EditItem = ref(null);
const DeleteItem = ref(null);

async function fetchUsers() {
    const jwtToken = localStorage.getItem('jwtToken');
    console.log('JWT Token:', jwtToken);

    try {
        const response = await fetch('http://localhost:5000/api/product/', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`,
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                console.error('Jeton expiré ou non valide');
                return;
            }
            throw new Error('Erreur lors de la récupération des utilisateurs');
        }

        const data = await response.json();

        for (const key in data[0]) {
            if (!disableKey.value.includes(key)) {
                fields.value.push({ key, label: key.charAt(0).toUpperCase() + key.slice(1) });
            }
        }

        fields.value.push({ key: 'action', label: 'Action' });

        for (const item of data) {
            tableData.value.push(item);
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des produits', error);
    }
}

fetchUsers();

function editItem(item) {
    delete item.createdAt;
    delete item.updatedAt;

    EditItem.value = item;
    isModalEdit.value = true;
}

function deleteItem(item) {
    DeleteItem.value = item;
    isModalDelete.value = true;
}

function closeModal() {
    isModalEdit.value = false;
    isModalDelete.value = false;
    EditItem.value = null;
    DeleteItem.value = null;
}

function handleSubmit(updatedItem) {
    console.log('Updated item:', updatedItem);
    const index = tableData.value.findIndex(i => i._id === updatedItem._id);

    if (index !== -1) {
        tableData.value[index] = updatedItem;
    }
    closeModal();
}
</script>
