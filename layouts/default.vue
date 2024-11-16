<template>
    <div class="h-full">
      <LayoutHead />
      <slot />
    </div>
</template>

<script setup>
const route = useRoute()

useHead({
  title: route.meta.title,
  htmlAttrs: {
    class: "h-full"
  },
  bodyAttrs: {
    class: "h-full"
  },
  style: ["#__nuxt { height: 100%; }"]
})
</script>

<style>
body{
  background: var(--tg-theme-section-bg-color);
}
button {
  color: var(--tg-theme-button-text-color);
  background-color: var(--tg-theme-button-color);
}
</style>
