<script>

import RegisterForm from '../../components/RegisterForm.vue';

  export default {
    components: {  RegisterForm },
  };
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-grow flex flex-col items-center pt-16 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-2xl">
        <RegisterForm />
      </div>
    </div>
  </div>
</template>