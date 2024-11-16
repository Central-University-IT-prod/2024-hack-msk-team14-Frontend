<script setup lang="ts">
const props = defineProps({
  error: Object
})
useHead({
  htmlAttrs: {
    class: "h-full"
  },
  bodyAttrs: {
    class: "h-full"
  },
  style: ["#__nuxt { height: 100%; }"]
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="min-h-full bg-white py-16 px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
    <div class="mx-auto max-w-max">
      <main class="sm:flex">
        <p class="text-4xl font-bold tracking-tight text-indigo-600 sm:text-5xl">{{ error.statusCode }}</p>
        <div class="sm:ml-6">
          <div class="sm:border-l sm:border-gray-200 sm:pl-6">
            <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Страница не найдена</h1>
            <p class="mt-1 text-base text-gray-500">Пожалуйста проверьте URL страницы или вернитесь назад!</p>
          </div>
          <div class="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
            <button @click="handleError" class="inline-flex items-center rounded-md border border-transparent bg-primary-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">Вернуться назад</button>
            <a href="/support" class="inline-flex items-center rounded-md border border-transparent bg-primary-100 px-4 py-2 text-sm font-medium text-primary-800 hover:bg-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">Поддержка</a>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>