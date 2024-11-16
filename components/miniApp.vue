<script lang="ts" setup>
import {MainButton, useWebAppPopup, useWebApp} from 'vue-tg'

const {showAlert} = useWebAppPopup()
</script>

<template>
  <div class="bg-bg text-text p-4 rounded">
    <h1 class="text-2xl font-bold">Основной заголовок</h1>
    <p class="text-hint">Это подсказка, отображающая цвет hint</p>
    <a href="#" class="text-link">Ссылка</a>
  </div>
  <p class="text"> 123123123</p>
  <button class="bg-button text-buttonText px-4 py-2 rounded-md hover:bg-link">
    Нажми меня
  </button>
  <section class="bg-sectionBg p-6 rounded-lg">
    <h2 class="text-sectionHeaderText text-xl font-semibold">Заголовок секции</h2>
    <p class="text-subtitleText">Это текст подзаголовка</p>
  </section>
  <div class="bg-secondaryBg p-4">
    <p class="text-accentText">Акцентированный текст</p>
    <hr class="border-t border-sectionSeparator my-2">
    <p class="text-destructiveText">Текст для деструктивного действия</p>
  </div>
  <NuxtLink to="/newEventView"> new Event View</NuxtLink>
  <footer class="bg-bottomBarBg p-3 text-center">
    <p class="text-hint">Нижняя панель</p>
  </footer>
</template>
