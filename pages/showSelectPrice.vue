<template>
  <h1 class="text-text text-center font-semibold mt-6 mb-6">Bыберите товары, за которые вы заплатите</h1>

  <div class="flex flex-col items-center m-0">
    <div v-for="(item, index) in products" :key="index" :class="item.selected ? 'border-2 border-solid border-accentText transition-all duration-300' : ''" class="bg-secondaryBg flex w-11/12 h-1/4 justify-between gap-x-6 py-5 rounded-md text-text shadow-lg mb-2 p-3">
        <Switch
        @click="() => {
          countTotal(item.selected, item.price)
        }"
          v-model="item.selected"
          :class="item.selected ? 'bg-button' : 'bg-bg'"
          class="relative inline-flex mr  min-w-6 w-6 items-center rounded-full switch border-2 border-solid border-text"
      >
      </Switch>
      <span class="product-name text-text">{{ item.name }}</span>
      <span class="product-price text-text">{{ item.price }} ₽</span>
    </div>

    <p class="mt-6 font-bold text-text text-lg">
      Итог: {{ totalSum }} ₽
    </p>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {Switch} from "@headlessui/vue";
import {useWebApp, useWebAppMainButton} from 'vue-tg';
import {definePageMeta} from "#imports";

const products = ref([
  {name: "Товар_0", price: 1, selected: false},
  {name: "Товар_2", price: 100, selected: false},
  {name: "Товар_5", price: 1000, selected: false}
]);

const totalSum = <Number>ref(0)

function countTotal (isSelected: Boolean, price: Number) {
  if(!isSelected){
    totalSum.value += price;
  } else{
    totalSum.value -= price;
  }
}

const tg_main_btn = useWebAppMainButton();
const tg = useWebApp();

tg_main_btn.setMainButtonParams({
  text: "Подтвердить",
  is_visible: true
});

tg_main_btn.onMainButtonClicked(() => {
  tg.close();
});

definePageMeta({
  title: "Оплатить товары"
});
</script>


<style scoped>
/* .container {
  display: flex;
  flex-direction: column;
  background: var(--tg-theme-secondary-bg-color);
  border-radius: 8px;
  width: 90%;
  margin: auto;
  align-items: center;
}

.product-row {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--tg-theme-bottom-bar-bg-color);
  margin: 16px 0 0 0;
  width: 100%;
  width: 90%;
  justify-content: space-between;
}

.switch {
  margin-right: 8px;
}

.product-name {
  flex: 1;
  font-size: 1rem;
  margin-left: 8px;
}

.product-price {
  font-size: 1rem;
  margin-left: 8px;
  white-space: nowrap;
} */
</style>
