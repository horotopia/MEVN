<script setup>
import { ref, onMounted } from 'vue';
import Header from '@/components/Dashboard/Header.vue'
import Sidebar from '@/components/Dashboard/Sidebar.vue'

const userRole = ref('');

onMounted(() => {
  userRole.value = localStorage.getItem('userRole');
});

</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <Sidebar />
    <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <Header />
      <main>
        <div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>