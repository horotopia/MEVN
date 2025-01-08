<template>
    <Table
        v-if="!formView.isVisible"
        :options="{
            header: {
                title: 'Liste des commandes',
            },
            search: true,
            export: true
        }"
        :fields="fields"
        :data="tableData"
        :itemsPerPage="5"
        @rowSelected="rowSelected"
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
    </Table>

    <Form
        v-if="formView.isVisible"
        :visible="formView.isVisible"
        :text="{ title: 'Modifier un produit', submit: '' }"
        :forms="getForms()"
    >
        <template #footer>
            <button type="button" class="p-1.5 rounded-md" :style="{ backgroundColor: '#1d2632', color: '#fff' }" @click="formView.isVisible = false; formView.item = null">Retour</button>
        </template>
    </Form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Table from '../../components/Table.vue';
import Form from '../../components/forms/Form.vue';

const __VITE_API_URL__ = import.meta.env.VITE_API_URL;
const userId = JSON.parse(localStorage.getItem('user'))._id;

const urlApi = `${__VITE_API_URL__}/api/orders/u/${userId}`;

const fields = ref([]);
const tableData = ref([]);
const disableKey = ref([
    '_id', 'password', 'createdAt', 'userId'
]);

const formView = ref({
    isVisible: false,
    item: null
});

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

        for (const key in data[0]) {
            if (!disableKey.value.includes(key)) {
                fields.value.push({ key, label: key.charAt(0).toUpperCase() + key.slice(1) });
            }
        }

        for (const item of data) {
            tableData.value.push(item);
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs', error);
    }
}

onMounted(() => {
    fetchOrders();
});

const rowSelected = (item) => {

    formView.value = {
        isVisible: true,
        item: item
    }

    formView.forms = [
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
            type: 'custom',
            key: 'custom_delete',
            columns: {
                container: 'w-2/3'
            }
        }
    ]

    for(const key in item.items) {
        formView.forms.push(
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
                disabled: true,
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
                disabled: true,
                placeholder: 'Prix',
                label: 'Prix',
                columns: {
                    container: 'w-1/5'
                }
            },
            {
                type: 'custom',
                key: 'custom_delete',
                columns: {
                    container: 'w-2/5'
                }
            }
        )
    }

    formView.forms.push({
        type: 'text',
        key: 'total',
        value: item.totalAmount,
        disabled: true,
        placeholder: 'Total',
        label: 'Total',
        columns: {
            container: 'w-1/3'
        }
    },
    {
        type: 'text',
        key: 'status',
        value: item.status,
        disabled: true,
        placeholder: 'Statut',
        label: 'Statut',
        value: (item.status === 'pending' ? 'En attente' : (item.status === 'completed' ? 'Terminée' : 'Annulée')),
        columns: {
            container: 'w-1/3'
        }
    })
};

function getForms() {
    return formView.forms;
}
</script>
