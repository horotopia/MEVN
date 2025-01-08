<template>
  <NavBar />
    <router-view />
    <Cookie />
  <FooTer />
</template>
  
  <script>
  import NavBar from '@/components/NavBar.vue';
  import FooTer from '@/components/FooTer.vue';
  import Cookie from '@/components/Cookie.vue';
  
  export default {
    components: {
      NavBar,
      FooTer,
      Cookie
    }
  };
  </script>
  