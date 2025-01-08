<template>
    <Table
        v-if="!formEdit.isVisible"
        :options="{
            header: {
                title: 'Liste des clients',
            },
            search: true
        }"
        :fields="fields"
        :data="tableData"
        :itemsPerPage="5"
    >
        <template #pictures="{ item }">
            <a v-if="item.pictures[0]?.name" :href="`${publicPath}/users/${item._id}/${item.pictures[0]?.name}`" class="text-decoration-none" target="_blank">
                <Avatar :fullname="item.name" :size="34"
                    :image="`${publicPath}/users/${item._id}/${item.pictures[0]?.name}`" />
            </a>
            <Avatar v-else :fullname="item.name" :size="34" />
        </template>
        <template #action="{ item }">
            <button class="btn btn-primary px-4" @click="editItem(item)">Edit</button>
            <button class="btn btn-danger" @click="deleteItem(item)">Delete</button>
        </template>
    </Table>

    <Form
        v-if="formEdit.isVisible"
        :visible="formEdit.isVisible"
        :text="{ title: 'Modifier un client', submit: 'Modifier' }"
        :forms="getForms()"
        @submit="handleSubmit"
    >
        <template #footer>
            <button type="button" class="p-1.5 rounded-md" :style="{ backgroundColor: '#1d2632', color: '#fff' }" @click="formEdit.isVisible = false; formEdit.item = null">Retour</button>
        </template>
    </Form>

    <div class="bg-white p-6 w-full" v-if="formEdit.isVisible">
        <form @submit.prevent="onSubmit" class="">
            <div class="mb-4">
                <label class="form-label">Media</label>
                <div>
                    <Uploader
                        v-if="hasResponse"
                        :server="`${__VITE_API_URL__}/api/upload/users/${formEdit.item._id}`"
                        :media="getData()"
                        :location="`${__VITE_API_URL__}/uploads/users`"
                        :max="1"
                        @init="initMedia"
                        @change="changeMedia"
                        @add="addMedia"
                        @remove="removeMedia"
                    />
                </div>
                <p v-if="errors['media.list']" class="text-danger">{{ errors['media.list'][0] }}</p>
            </div>

            <div class="flex justify-end mt-4" :disabled="isLoading">
                <button type="button" class="p-1.5 rounded-md" style="background-color: rgb(29, 38, 50); color: rgb(255, 255, 255);" @click="formEdit.isVisible = false; formEdit.item = null">Retour</button>
            </div>
        </form>
    </div>
    
    <ModalForm v-if="modalDelete.item" :visible="modalDelete.isVisible" :text="{
        title: `Etes-vous sûr de vouloir supprimer '${modalDelete.item?.name}' ?`,
        submit: {
            text: 'Supprimer', color: 'orange'
        },
        close: {
            text: 'Annuler', color: 'red'
        }
    }" :item="{
        id: modalDelete.item?._id,
        email: modalDelete.item?.email,
    }" :disableFields="['id', 'email']" @close="closeModal" @submit="handleDelete" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Table from '../../components/Table.vue';
import ModalForm from '../../components/ModalForm.vue';
import Form from '../../components/forms/Form.vue';

import Avatar from '../../components/Avatar.vue';
import Uploader from '../../components/Uploader.vue';

const __VITE_API_URL__ = import.meta.env.VITE_API_URL;

const urlApi = __VITE_API_URL__ + '/api/users';
const publicPath = __VITE_API_URL__ + '/uploads';
const urlApiPicture = __VITE_API_URL__ + '/api/pictures';

const fields = ref([]);
const tableData = ref([]);
const disableKey = ref([
    '_id', 'password', 'createdAt', 'updatedAt'
]);

const post = ref({
    id: '',
    title: '',
    content: '',
    media: {
        list: [],
        saved: [],
        added: [],
        removed: []
    }
});

const errors = ref([])
const hasResponse = ref(true)
const isLoading = ref(false)

const formEdit = ref({
    isVisible: false,
    item: null,
    forms: {}
})

const modalDelete = ref({
    isVisible: false,
    item: null
})

async function fetchUsers() {
    const jwtToken = localStorage.getItem('jwtToken');

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
            if (response.status === 403) {
                window.location.href = '/logout';
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

        fields.value.push({ key: 'action', label: 'Action', exportCsv: false });

        const index = fields.value.findIndex(field => field.key === 'pictures');
        fields.value[index].exportCsv = false;

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

const initMedia = (media) => {
    post.value.media.saved = media
    hasResponse.value = true
}

const changeMedia = (media) => {
    post.value.media.added = media
}

const addMedia = async (media) => {
    post.value.media.added.push(media)

    try {
        const jwtToken = localStorage.getItem('jwtToken');

        const response = await fetch(`${urlApiPicture}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`,
            },
            body: JSON.stringify({
                name: media.name,
                userId: formEdit.value.item._id,
                description: "product user"
            }),
        });

        if (!response.ok) {
            if (response.status === 401) {
                console.error('Jeton expiré ou non valide');
                return;
            }
            throw new Error('Erreur lors de la creation de l\'image');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Erreur lors de la creation de l\'image', error);
    }
}

const removeMedia = async (media) => {
    post.value.media.removed.push(media)

    try {
        const jwtToken = localStorage.getItem('jwtToken');

        const response = await fetch(`${urlApiPicture}/${media._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`,
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                console.error('Jeton expiré ou non valide');
                return;
            }
            throw new Error('Erreur lors de la creation de l\'image');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Erreur lors de la creation de l\'image', error);
    }
}

onMounted(() => {
    fetchUsers();
});

function getForms() {
    return formEdit.forms;
}

const getData = () => {
    post.value.media.saved = formEdit.value.item.pictures.map(picture => {
        return {
            _id: picture._id,
            name: picture.userId + '/' + picture.name,
        }
    }) || []

    return post.value.media.saved
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
            placeholder: 'Nom',
            label: 'Nom',
            columns: {
                container: 'w-1/2'
            }
        },
        {
            type: 'text',
            key: 'email',
            value: item.email,
            placeholder: 'Email',
            label: 'Email',
            columns: {
                container: 'w-1/2'
            }
        },
        {
            type: 'select',
            key: 'role',
            value: item.role,
            placeholder: 'Role',
            label: 'Role',
            columns: {
                container: 'w-1/2'
            },
            options: [
                { value: 'ROLE_USER', text: 'User' },
                { value: 'ROLE_ADMIN', text: 'Admin' }
            ]
        },
        {
            type: 'text',
            key: 'createdAt',
            value: item.createdAt,
            disabled: true,
            placeholder: 'Date de création',
            label: 'Date de création',
            columns: {
                container: 'w-1/2'
            }
        },
        {
            type: 'text',
            key: 'updatedAt',
            value: item.updatedAt,
            disabled: true,
            placeholder: 'Date de mise à jour',
            label: 'Date de mise à jour',
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
        item: null,
        forms: {}
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
