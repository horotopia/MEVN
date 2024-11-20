<template>
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
  