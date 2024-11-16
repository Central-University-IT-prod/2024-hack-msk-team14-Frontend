<template>
  <div class="flex flex-col items-center justify-between h-screen p-4">
    <div class="text-center mt-10">
      <div class="text-2xl font-medium text-buttonText">Счет</div>
      <div class="text-5xl font-bold text-accentText">1000 ₽</div>
      <dotlottie-player
        src="/money_0.json"
        background="transparent"
        speed="1"
        class="animated-image"
        :class="{ hidden: img }"
        loop autoplay></dotlottie-player>
      <dotlottie-player
        src="/money_1.json"
        background="transparent"
        speed="1"
        class="animated-image"
        :class="{ hidden: !img }"
        loop autoplay></dotlottie-player>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useWebAppMainButton, useWebApp } from 'vue-tg'
import { useHead, definePageMeta } from '#imports'

useHead({
  bodyAttrs: {
    class: "overflow-y-hidden"
  },
  script: [
    { src: "https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs", type: "module" }
  ]
})

definePageMeta({
  title: "Список мероприятий"
})

const tg_main_btn = useWebAppMainButton();
const img = ref(false);
const tg = useWebApp();

tg_main_btn.setMainButtonParams({
  text: "Я перевел",
  is_visible: true
});

tg_main_btn.onMainButtonClicked(() => {
  img.value = true;
  setTimeout(() => {
    tg.close();
  }, 4000);
});
</script>

<style scoped>
.animated-image {
  height: 300px;
}
.hidden {
  display: none;
}
</style>
