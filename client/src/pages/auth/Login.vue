<script>

import LoginForm from '../../components/LoginForm.vue';

  export default { 
    components: {
      LoginForm
    }
  }
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-grow flex flex-col items-center pt-16 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-2xl">
        <LoginForm />
      </div>
    </div>
  </div>
</template>