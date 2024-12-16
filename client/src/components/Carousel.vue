<template>
  <div class="relative w-full">
    <button
      @click="prev"
      class="absolute left-[-4rem] top-1/2 transform -translate-y-1/2 text-black hover:text-gray-600 transition-colors z-10"
    >
      <span class="text-8xl font-bold">‹</span>
    </button>
    <button
      @click="next"
      class="absolute right-[-4rem] top-1/2 transform -translate-y-1/2 text-black hover:text-gray-600 transition-colors z-10"
    >
      <span class="text-8xl font-bold">›</span>
    </button>

    <div class="relative overflow-hidden rounded-[30px] border-4 border-black bg-white aspect-[3.4/1] w-full shadow-[0_8px_30px_rgb(0,0,0,0.3)]">
      <transition-group name="slide">
        <div
          v-for="(image, index) in images"
          :key="index"
          v-show="currentIndex === index"
          class="absolute inset-0 w-full h-full cursor-pointer"
          @click="navigateToDetails(index)"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            class="w-full h-full object-fill"
          />
        </div>
      </transition-group>
    </div>

    <div class="flex justify-center space-x-4 mt-6">
      <button
        v-for="(_, index) in images"
        :key="index"
        @click="goToSlide(index)"
        class="w-16 h-2 rounded-sm transition-all duration-300"
        :class="[
          currentIndex === index ? 'bg-gray-600' : 'bg-gray-400'
        ]"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageCarrousel',
  data() {
    return {
      currentIndex: 0,
      images: [
        {
          src: new URL('@/assets/img/carousel/pack ectoplasma.png', import.meta.url).href,
          alt: 'Pack Ectoplasma',
          path: '/pack/ectoplasma'
        },
        {
          src: new URL('@/assets/img/carousel/pack pikachu.png', import.meta.url).href,
          alt: 'Pack Pikachu',
          path: '/pack/pikachu'
        },
        {
          src: new URL('@/assets/img/carousel/pack pingoleon.png', import.meta.url).href,
          alt: 'Pack Pingoléon',
        }
      ],
      intervalId: null,
      touchStartX: 0,
      touchEndX: 0
    }
  },
  methods: {
    next() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length
    },
    prev() {
      this.currentIndex = this.currentIndex === 0 
        ? this.images.length - 1 
        : this.currentIndex - 1
    },
    goToSlide(index) {
      this.currentIndex = index
    },
    startAutoPlay() {
      if (!this.intervalId) {
        this.intervalId = setInterval(this.next, 5000)
      }
    },
    stopAutoPlay() {
      if (this.intervalId) {
        clearInterval(this.intervalId)
        this.intervalId = null
      }
    },
    handleTouchStart(e) {
      this.touchStartX = e.touches[0].clientX
    },
    handleTouchEnd(e) {
      this.touchEndX = e.changedTouches[0].clientX
      this.handleSwipe()
    },
    handleSwipe() {
      const difference = this.touchStartX - this.touchEndX
      if (Math.abs(difference) > 50) {
        if (difference > 0) {
          this.next()
        } else {
          this.prev()
        }
      }
    },
    navigateToDetails(index) {
      this.$router.push(this.images[index].path)
    }
  },
  mounted() {
    this.startAutoPlay()
    this.$el.addEventListener('touchstart', this.handleTouchStart)
    this.$el.addEventListener('touchend', this.handleTouchEnd)
  },
  beforeUnmount() {
    this.stopAutoPlay()
    this.$el.removeEventListener('touchstart', this.handleTouchStart)
    this.$el.removeEventListener('touchend', this.handleTouchEnd)
  }
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style> 