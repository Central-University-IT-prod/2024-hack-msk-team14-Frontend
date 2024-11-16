<script setup lang="ts">

  const props = defineProps({
    img: String,
    title: String,
    descriptionText: String
  })

</script>

<template>
  <div class= "min-h-24 flex w-full">
    <img :src="props.img" alt="" class="h-24 my-auto aspect-square object-cover" />
    <div class="h-full w-full">
      <h2 class="text-md font-bold text-text">{{title}}</h2>
      <span class="text-md break-words text-text">{{descriptionText}}</span>
    </div>
  </div>
</template>

<style scoped>

</style>