<template>
    <Table
        v-if="!formEdit.isVisible"
        :options="{
            header: {
                title: 'Liste des produits'
            },
            search: true
        }"
        :fields="fields"
        :data="tableData"
        :itemsPerPage="5"
    >
        <template #pictures="{ item }">
            <span>
                {{ item.pictures.length }}
            </span>
        </template>
        <template #action="{ item }">
            <button class="btn btn-primary pr-4" @click="editItem(item)">Edit</button>
            <button class="btn btn-danger" @click="deleteItem(item)">Delete</button>
        </template>
    </Table>

    <Form
        v-if="formEdit.isVisible"
        :visible="formEdit.isVisible"
        :text="{ title: 'Modifier un produit', submit: 'Enregistrer' }"
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
                        :server="`http://localhost:5000/api/upload/products/${formEdit.item._id}`"
                        :media="getData()"
                        location="http://localhost:5000/uploads/products"
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

import Uploader from '../../components/Uploader.vue';

const urlApi = 'http://localhost:5000/api/product';
const urlApiPicture = 'http://localhost:5000/api/pictures';

const fields = ref([]);
const tableData = ref([]);
const disableKey = ref([
    '_id', 'createdAt', 'updatedAt'
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

const getData = () => {
    post.value.media.saved = formEdit.value.item.pictures.map(picture => {
        return {
            _id: picture._id,
            name: picture.userId + '/' + picture.name,
        }
    }) || []

    return post.value.media.saved
}

const onSubmit = () => {
    isLoading.value = true;
    console.log('Submit');
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

    console.log('Added:', media);

    const pictures = {
        productId: formEdit.value.item._id,
        name: media.name
    }

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
                productId: formEdit.value.item._id,
                description: "product picture"
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

    console.log('Removed:', post.value.media.removed);

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

async function fetchProducts() {
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
            throw new Error('Erreur lors de la récupération des produits');
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

async function updateProduct(item) {
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
            throw new Error('Erreur lors de la mise à jour du produit');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Erreur lors de la mise à jour du produit', error);
    }
}

async function deleteProduct(item) {
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
            throw new Error('Erreur lors de la suppression du produit', error);
        }

        const data = await response.json();

        const index = tableData.value.findIndex(i => i._id === item._id);

        tableData.value[index] = data;

        return item;
    } catch (error) {
        console.error('Erreur lors de la suppression du produit', error);
    }
}

onMounted(() => {
    fetchProducts();
});

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
        },
        {
            type: 'textarea',
            key: 'description',
            content: item.description,
            placeholder: 'Description du produit',
            label: 'Description du produit',
            max: 500,
        },
        {
            type: 'textarea',
            key: 'Tout savoir',
            content: item.toutSavoir,
            placeholder: 'Tout savoir sur le produit',
            label: 'Tout savoir sur le produit',
            max: 500,
        },
        {
            type: 'textarea',
            key: 'Habitat',
            content: item.habitat,
            placeholder: 'Habitat du produit',
            label: 'Habitat du produit',
            max: 500,
        },
        {
            type: 'select',
            key: 'type',
            value: item.type,
            options: [
                { value: 'combat', text: 'Combat' },
                { value: 'acier', text: 'Acier' },
                { value: 'eau', text: 'Eau' },
                { value: 'féé', text: 'Féé' },
                { value: 'normal', text: 'Normal' },
                { value: 'psy', text: 'Psy' },
                { value: 'vol', text: 'Vol' },
                { value: 'spectre', text: 'Spectre' },
                { value: 'poison', text: 'Poison' },
                { value: 'feu', text: 'Feu' },
                { value: 'électrique', text: 'Électrique' },
                { value: 'plante', text: 'Plante' },
            ],
            label: 'Type du produit',
        },
        {
            type: 'radio',
            key: 'evolutionLevel',
            value: item.evolutionLevel,
            placeholder: 'Niveau d\'évolution',
            label: 'Niveau d\'évolution',
            items: [
                {
                    value: 1,
                    text: '1'
                },
                {
                    value: 2,
                    text: '2'
                },
                {
                    value: 3,
                    text: '3'
                }
            ]
        },
        {
            type: 'text',
            key: 'evolutionReference',
            value: item.evolutionReference,
            placeholder: 'Référence d\'évolution',
            label: 'Référence d\'évolution',
            max: 100,
            columns: {
                container: 'w-1/3'
            }
        },
        {
            type: 'number',
            key: 'weight',
            value: item.weight,
            placeholder: 'Poids du produit',
            label: 'Poids du produit',
            min: 0,
            columns: {
                container: 'w-1/3'
            }
        },
        {
            type: 'number',
            key: 'height',
            value: item.height,
            placeholder: 'Taille du produit',
            label: 'Taille du produit',
            min: 0,
            columns: {
                container: 'w-1/3'
            }
        },
        {
            type: 'number',
            key: 'age',
            value: item.age,
            placeholder: 'Age du produit',
            label: 'Age du produit',
            min: 0,
            columns: {
                container: 'w-1/3'
            }
        },
        {
            type: 'number',
            key: 'price',
            value: item.price,
            placeholder: 'Prix du produit',
            label: 'Prix du produit',
            min: 0,
            columns: {
                container: 'w-1/3'
            }
        },
        {
            type: 'text',
            key: 'stock',
            value: item.stock,
            placeholder: 'Stock du produit',
            label: 'Stock du produit',
            min: 0,
            columns: {
                container: 'w-1/3'
            }
        },
        {
            type: 'select',
            key: 'category',
            value: item.category,
            placeholder: 'Catégorie du produit',
            label: 'Catégorie du produit',
            options: [
                { value: 'pokémon', text: 'Pokémon' },
                { value: 'pokéball', text: 'Pokéball' },
                { value: 'baie', text: 'Baie' },
                { value: 'objets', text: 'Objets' },
                { value: 'médicaments', text: 'Médicaments' },
            ],
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

function getForms() {
    return formEdit.forms;
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
    const data = {};
    for(const key in updatedItem) {
        data[updatedItem[key].key] = updatedItem[key].value || updatedItem[key].content;
    }

    const index = tableData.value.findIndex(i => i._id === data._id);

    if (index !== -1) {
        tableData.value[index] = data;
    }

    updateProduct(data);

    closeModal();
}

function handleDelete() {
    deleteProduct(modalDelete.value.item);

    closeModal();
}
</script>
