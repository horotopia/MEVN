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
        </template>
    </Table>

    <div v-if="formEdit.isVisible">
        <div class="flex items-center justify-between">
            <div></div>
            <div class="ml-3">
                <div class="w-full max-w-sm relative">
                    <div class="relative">
                        <button class="p-1.5 rounded-md bg-blue-500 text-white" @click="addProduct">Ajouter un produit</button>
                    </div>
                </div>
            </div>
        </div>

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
    </div>
    <!-- <ModalForm
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
    /> -->
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Table from '../../components/Table.vue';
import ModalForm from '../../components/ModalForm.vue';
import Form from '../../components/forms/Form.vue';

const __VITE_API_URL__ = import.meta.env.VITE_API_URL;

const urlApi = `${__VITE_API_URL__}/api/orders`;

const fields = ref([]);
const tableData = ref([]);
const disableKey = ref([
    '_id', 'password', 'createdAt', 'updatedAt'
]);

const formEdit = ref({
    isVisible: false,
    item: null
})

// const modalDelete = ref({
//     isVisible: false,
//     item: null
// })

async function fetchOrders() {
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
            throw new Error('Erreur lors de la récupération des utilisateurs');
        }

        const data = await response.json();

        const fieldsTemp = [];
        const tableDataTemp = [];

        for (const key in data[0]) {
            if (!disableKey.value.includes(key)) {
                fieldsTemp.push({ key, label: key.charAt(0).toUpperCase() + key.slice(1) });
            }
        }

        fieldsTemp.push({ key: 'action', label: 'Action', exportCsv: false });

        for (const item of data) {
            tableDataTemp.push(item);
        }

        fields.value = fieldsTemp;
        tableData.value = tableDataTemp;
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs', error);
    }
}

async function updateOrder(item) {
    const jwtToken = localStorage.getItem('jwtToken');

    item.items = [];

    for(const key in item) {
        if (key.includes('_id_')) {
            const index = key.split('_')[2];
            item.items.push({
                productId: item['_id_' + index],
                quantity: item['quantity_' + index],
                price: item['price_' + index]
            });

            delete item['_id_' + index];
            delete item['quantity_' + index];
            delete item['price_' + index];
            delete item['name_' + index];
        }
    }

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
            throw new Error('Erreur lors de la mise à jour de la commande');
        }

        fetchOrders();
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la commande', error);
    }
}

onMounted(() => {
    fetchOrders();
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
            label: 'Identifiant unique de la commande',
            columns: {
                container: 'w-1/3'
            }
        },
        {
            type: 'text',
            key: 'name',
            value: item.userId.name,
            placeholder: 'Nom',
            label: 'Nom',
            columns: {
                container: 'w-1/3'
            }
        },
        {
            type: 'text',
            key: 'email',
            value: item.userId.email,
            placeholder: 'Email',
            label: 'Email',
            columns: {
                container: 'w-1/3'
            }
        }
    ]

    for(const key in item.items) {
        formEdit.forms.push(
            {
                type: 'text',
                key: '_id_' + key,
                value: item.items[key].productId._id,
                disabled: false,
                placeholder: 'Identifiant unique du produit',
                label: 'Identifiant unique du produit',
                columns: {
                    container: 'w-1/5'
                }
            },
            {
                type: 'text',
                key: 'name_' + key,
                value: item.items[key].productId.name,
                placeholder: 'Nom',
                disabled: true,
                label: 'Nom du produit',
                columns: {
                    container: 'w-1/5'
                }
            },
            {
                type: 'text',
                key: 'quantity_' + key,
                value: item.items[key].quantity,
                placeholder: 'Quantité',
                label: 'Quantité',
                columns: {
                    container: 'w-1/5'
                }
            },
            {
                type: 'text',
                key: 'price_' + key,
                value: item.items[key].price,
                placeholder: 'Prix',
                label: 'Prix',
                columns: {
                    container: 'w-1/5'
                }
            },
            {
                type: 'custom',
                key: 'custom_delete',
                // content: `<button type="button" class="p-1.5 rounded-md bg-red-500 text-white" @click="deleteItem(${key})">Supprimer</button>`,
                columns: {
                    container: 'w-1/5'
                }
            }
        )
    }

    formEdit.forms.push({
        type: 'text',
        key: 'total',
        value: item.totalAmount,
        placeholder: 'Total',
        label: 'Total',
        columns: {
            container: 'w-1/3'
        }
    },
    {
        type: 'select',
        key: 'status',
        value: item.status,
        placeholder: 'Statut',
        label: 'Statut',
        options: [
            { value: 'pending', text: 'En attente' },
            { value: 'completed', text: 'Terminée' },
            { value: 'cancelled', text: 'Annulée' }
        ],
        columns: {
            container: 'w-1/3'
        }
    })
}

function closeModal() {
    formEdit.value = {
        isVisible: false,
        item: null
    }
    // modalDelete.value = {
    //     isVisible: false,
    //     item: null
    // }
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

    updateOrder(data);

    closeModal();
}

const addProduct = () => {
    // const countItems = formEdit.forms.filter(i => i.key.includes('_id_')).length;
    const countItems = formEdit.forms.filter((i) => {
        return i.key.includes('_id_');
    })

    formEdit.forms = []
}
// function handleDelete() {
//     deleteOrder(modalDelete.value.item);

//     closeModal();
// }
</script>
