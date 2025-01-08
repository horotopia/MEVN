<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <NavBarLog />
      <router-view />
    <FooTer />
  </div>
</template>
  
<script>
    import NavBarLog from '../components/NavBarLog.vue';
    import FooTer from '../components/FooTer.vue';

  export default {
    components: { NavBarLog, FooTer },
  };
</script>
