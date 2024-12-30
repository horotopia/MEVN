<template>
  <transition name="fade">
    <div
      v-if="isLoading"
      class="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-75"
    >
      <div class="relative w-24 h-24 rounded-full border-4 border-black overflow-hidden animate-spin">
        <div class="absolute inset-0 bg-red-500 h-1/2"></div>
        <div class="absolute inset-0 top-1/2 bg-white h-1/2"></div>
        <div class="absolute inset-x-0 top-1/2 h-1 bg-black"></div>
        <div class="absolute top-1/2 left-1/2 w-8 h-8 bg-white border-4 border-black rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
