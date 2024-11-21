<template>
    <NavBarLog />
      <router-view />
    <FooTer />
  </template>
  
<script>
    import NavBarLog from '../components/NavBarLog.vue';
    import FooTer from '../components/FooTer.vue';

  export default {
    components: { NavBarLog, FooTer },
  };
</script>
  