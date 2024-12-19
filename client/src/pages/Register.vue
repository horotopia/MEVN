<script>
import RegisterForm from '../components/RegisterForm.vue';

export default {
  name: 'RegisterPage',
  components: { RegisterForm },
};
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <div class="flex-grow">
      <RegisterForm />
    </div>
  </div>
</template>