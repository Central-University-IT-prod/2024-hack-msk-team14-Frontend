<script setup lang="ts">

  const name = ref<String>('')
  const email = ref<String>('')

  const fetchData = async  () => {
    $api('')
  }


</script>

<template>
  <div class="m-auto">
    <div class=""></div>
    <h1> {{name}} </h1>
  </div>
</template>

<style scoped>

</style>