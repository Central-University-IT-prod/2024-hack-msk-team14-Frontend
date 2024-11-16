<template>
    <slot></slot>
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

