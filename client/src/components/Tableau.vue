<!-- <template>
    <div>
      <h1 class="text-2xl font-bold mb-4">Liste des Utilisateurs</h1>
      
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b">Nom</th>
            <th class="py-2 px-4 border-b">Email</th>
            <th class="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user._id">
            <td class="py-2 px-4 border-b">{{ user.name }}</td>
            <td class="py-2 px-4 border-b">{{ user.email }}</td>
            <td class="py-2 px-4 border-b">
              <button @click="editUser(user)" class="bg-blue-500 text-white py-1 px-3 rounded">Modifier</button>
              <button @click="deleteUser(user._id)" class="bg-red-500 text-white py-1 px-3 rounded ml-2">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>

import Cookies from 'js-cookie';

  export default {
    data() {
      return {
        users: [], 
      };
    },
    methods: {
      async fetchUsers() {
        const jwtToken = Cookies.get("jwtToken");

        try {
            const response = await fetch('http://localhost:5000/api/users', {
                method: 'GET',
                credentials: 'include', 
                headers: {
                  'content-type': 'application/json',
                  'Authorization': `Bearer ${jwtToken}`,
                  'Accept': '*/*'
                }
            });

            if (!response.ok) {
            throw new Error('Erreur lors de la récupération des utilisateurs');
            }

            const data = await response.json();
            this.users = data; 
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs', error);
        }
        },
      async deleteUser(id) {
        try {
          const response = await fetch(`http://localhost:5000/api/users/${id}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error('Erreur lors de la suppression de l\'utilisateur');
          }
          this.fetchUsers();
        } catch (error) {
          console.error('Erreur lors de la suppression de l\'utilisateur', error);
        }
      },
      editUser(user) {
        console.log('Modifier l\'utilisateur :', user);
      },
    },
    mounted() {
      this.fetchUsers();
    },
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;
  }
  </style>
   -->

   <template>
    <div class="relative">
      <!-- Table Controls -->
      <div class="flex justify-between mb-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher..."
          class="p-2 border rounded w-1/3"
        />
        <button
          @click="exportCSV"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Exporter en CSV
        </button>
      </div>
  
      <!-- Table -->
      <table class="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                @change="toggleSelectAll"
                :checked="isAllSelected"
                class="cursor-pointer"
              />
            </th>
            <th
              v-for="(col, index) in columns"
              :key="index"
              class="cursor-pointer"
              @click="sortTable(col.key)"
            >
              {{ col.label }}
              <span v-if="sortedColumn === col.key">
                {{ sortDirection === 'asc' ? '⬆️' : '⬇️' }}
              </span>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in paginatedData"
            :key="item.id"
            :class="{'bg-gray-100': selectedRows.includes(item.id)}"
          >
            <td>
              <input
                type="checkbox"
                :value="item.id"
                v-model="selectedRows"
                class="cursor-pointer"
              />
            </td>
            <td v-for="(col, index) in columns" :key="index">
              {{ item[col.key] }}
            </td>
            <td>
              <button
                class="px-2 py-1 bg-green-500 text-white rounded"
                @click="viewItem(item)"
              >
                Voir
              </button>
              <button
                class="px-2 py-1 bg-yellow-500 text-white rounded"
                @click="editItem(item)"
              >
                Modifier
              </button>
              <button
                class="px-2 py-1 bg-red-500 text-white rounded"
                @click="deleteItem(item.id)"
              >
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Pagination -->
      <div class="flex justify-between items-center mt-4">
        <button
          :disabled="currentPage === 1"
          @click="prevPage"
          class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Précédent
        </button>
        <span>Page {{ currentPage }} sur {{ totalPages }}</span>
        <button
          :disabled="currentPage === totalPages"
          @click="nextPage"
          class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      data: { type: Array, required: true },
      columns: { type: Array, required: true },
    },
    data() {
      return {
        searchQuery: '',
        sortedColumn: '',
        sortDirection: 'asc',
        currentPage: 1,
        rowsPerPage: 10,
        selectedRows: [],
      };
    },
    computed: {
      filteredData() {
        if (!this.searchQuery) return this.data;
  
        return this.data.filter((row) =>
          Object.values(row).some((val) =>
            val.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        );
      },
      sortedData() {
        if (!this.sortedColumn) return this.filteredData;
  
        return [...this.filteredData].sort((a, b) => {
          const modifier = this.sortDirection === 'asc' ? 1 : -1;
          if (a[this.sortedColumn] < b[this.sortedColumn]) return -1 * modifier;
          if (a[this.sortedColumn] > b[this.sortedColumn]) return 1 * modifier;
          return 0;
        });
      },
      paginatedData() {
        const start = (this.currentPage - 1) * this.rowsPerPage;
        return this.sortedData.slice(start, start + this.rowsPerPage);
      },
      totalPages() {
        return Math.ceil(this.filteredData.length / this.rowsPerPage);
      },
      isAllSelected() {
        return this.selectedRows.length === this.data.length;
      },
    },
    methods: {
      sortTable(column) {
        if (this.sortedColumn === column) {
          this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
          this.sortedColumn = column;
          this.sortDirection = 'asc';
        }
      },
      prevPage() {
        if (this.currentPage > 1) this.currentPage--;
      },
      nextPage() {
        if (this.currentPage < this.totalPages) this.currentPage++;
      },
      toggleSelectAll() {
        if (this.isAllSelected) {
          this.selectedRows = [];
        } else {
          this.selectedRows = this.data.map((row) => row.id);
        }
      },
      viewItem(item) {
        alert(`Visualisation : ${JSON.stringify(item)}`);
      },
      editItem(item) {
        alert(`Modification : ${JSON.stringify(item)}`);
      },
      deleteItem(id) {
        alert(`Suppression de l'élément avec l'ID : ${id}`);
      },
      exportCSV() {
        const headers = this.columns.map((col) => col.label);
        const rows = this.selectedRows.length
          ? this.data.filter((row) => this.selectedRows.includes(row.id))
          : this.data;
  
        const csvContent = [
          headers.join(','),
          ...rows.map((row) =>
            this.columns.map((col) => row[col.key]).join(',')
          ),
        ].join('\n');
  
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
    },
  };
  </script>
  
  <style scoped>
  .disabled {
    pointer-events: none;
    opacity: 0.5;
  }
  </style>
  