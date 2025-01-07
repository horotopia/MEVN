<template>
    <Table
        v-if="!formEdit.isVisible"
        :options="{
            header: {
                title: 'Liste des commandes',
            },
            search: true
        }"
        :fields="fields"
        :data="tableData"
        :itemsPerPage="5"
    >
        <template #userId="{ item }">
            <span>{{ item.userId?.name }}</span>
        </template>
        <template #items="{ item }">
            <span>{{
                item.items?.length
                    ? item.items.map((i, index) => `${i?.productId?.name} x${i.quantity}`).join(', ')
                    : 'Aucun article'
            }}</span>
        </template>
        <template #action="{ item }">
            <button class="btn btn-primary px-4" @click="editItem(item)">Edit</button>
            <button class="btn btn-danger" @click="deleteItem(item)">Delete</button>
        </template>
    </Table>
    <Form
        v-else
        :visible="formEdit.isVisible"
        :text="{ title: 'Modifier un produit', submit: 'Enregistrer' }"
        :forms="getForms()"
        @submit="handleSubmit"
    >
        <template #footer>
            <button type="button" class="p-1.5 rounded-md" :style="{ backgroundColor: 'red', color: '#fff' }" @click="formEdit.isVisible = false; formEdit.item = null">Annuler</button>
        </template>
    </Form>
    <ModalForm
        v-if="modalDelete.item"
        :visible="modalDelete.isVisible"
        :text="{
            title: `Etes-vous sûr de vouloir supprimer '${modalDelete.item?.name}' ?`,
            submit: {
                text: 'Supprimer', color: 'orange'
            },
            close: {
                text: 'Annuler', color: 'red'
            }
        }"
        :item="{
            id: modalDelete.item?._id,
            email: modalDelete.item?.email,
        }"
        :disableFields="['id', 'email']"
        @close="closeModal"
        @submit="handleDelete"
    />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Table from '../../components/Table.vue';
import ModalForm from '../../components/ModalForm.vue';
import Form from '../../components/forms/Form.vue';

const __VITE_API_URL__ = import.meta.env.VITE_API_URL;

const urlApi = `${__VITE_API_URL__}/api/orders/u/${userId}`;

const fields = ref([]);
const tableData = ref([]);
const disableKey = ref([
    '_id', 'password', 'createdAt', 'updatedAt'
]);

const formEdit = ref({
    isVisible: false,
    item: null
})

const modalDelete = ref({
    isVisible: false,
    item: null
})

async function fetchUsers() {
    const jwtToken = localStorage.getItem('jwtToken');
    console.log('JWT Token:', jwtToken);

    try {
        const response = await fetch(urlApi, {
            method: 'GET',
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
        console.error('Erreur lors de la récupération des utilisateurs', error);
    }
}

async function updateUser(item) {
    if (!item._id) {
        return;
    }

    const jwtToken = localStorage.getItem('jwtToken');

    delete item.createdAt;
    delete item.updatedAt;
    delete item.password;

    try {
        const response = await fetch(`${urlApi}/${item._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(item),
        });

        if (!response.ok) {
            if (response.status === 401) {
                console.error('Jeton expiré ou non valide');
                return;
            }
            throw new Error('Erreur lors de la mise à jour de l\'utilisateur');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
    }
}

async function deleteUser(item) {
    if (!item?._id) {
        return;
    }

    const jwtToken = localStorage.getItem('jwtToken');

    try {
        const response = await fetch(`${urlApi}/${item._id}`, {
            method: 'DELETE',
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
            throw new Error('Erreur lors de la suppression de l\'utilisateur');
        }

        const data = await response.json();

        const index = tableData.value.findIndex(i => i._id === item._id);

        tableData.value[index] = data;

        return item;
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur', error);
    }
}

onMounted(() => {
    fetchUsers();
});

function getForms() {
    return formEdit.forms;
}

function editItem(item) {
    delete item.password;

    formEdit.value = {
        isVisible: true,
        item: item
    }

    formEdit.forms = [
        {
            type: 'text',
            key: '_id',
            value: item._id,
            disabled: true,
            placeholder: 'ID',
            label: 'Identifiant unique du produit',
            columns: {
                container: 'w-1/2'
            }
        },
        {
            type: 'text',
            key: 'name',
            value: item.name,
            placeholder: 'Nom du produit',
            label: 'Nom du produit',
            max: 100,
            columns: 6,
            columns: {
                container: 'w-1/2'
            }
        }
    ]
}

function deleteItem(item) {
    modalDelete.value = {
        isVisible: true,
        item: item
    }
}

function closeModal() {
    formEdit.value = {
        isVisible: false,
        item: null
    }
    modalDelete.value = {
        isVisible: false,
        item: null
    }
}

function handleSubmit(updatedItem) {
    const index = tableData.value.findIndex(i => i._id === updatedItem._id);

    if (index !== -1) {
        tableData.value[index] = updatedItem;
    }

    updateUser(updatedItem);

    closeModal();
}

function handleDelete() {
    deleteUser(modalDelete.value.item);

    closeModal();
}
</script>
