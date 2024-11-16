<script setup lang="ts">

const props = defineProps({
  label: String,
  placeholder: String
})

const text = defineModel<String>()

</script>

<template>
<div class="flex flex-col">
  <label for="input" class="text-lg mb-2 font-bold"> {{props.label}}</label>

  <input v-model="text" id="input" class="bg-secondaryBg rounded-xl p-2 " :placeholder="props.placeholder">
</div>
</template>

<style scoped>

</style>