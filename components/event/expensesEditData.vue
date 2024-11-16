<script setup lang="ts">

const expenses = defineModel<Array<{name:string, amount: number}>>('expenses')

const isLast = defineModel<boolean>('isLast')

const isEmpty = computed(()=>expenses.value?.length === 0)

const removeElement = (index: number) => {
  if (index > -1) {
    expenses.value?.splice(index, 1);
  }
}

const appendSpending = ()=>{
  appendFixedSpending('', 0)
}
const appendFixedSpending = (name: string, count: number)=>{
  if(!expenses.value){
    return;
  }
  expenses.value.push({
    name: name,
    amount: count
  })
}

import {ArchiveBoxIcon} from "@heroicons/vue/16/solid";
</script>

<template>
  <div class="bg-bg rounded-xl">
    <div class="flex" v-for="(item, index) in expenses">
      <div class="flex p-2 w-full">
        <input required class="w-full p-2 border-0 bg-transparent" type="text" id="name" v-model="item.name"
               placeholder="Введите название">
        <!--          <div class="bg-sectionSeparator w-0.5" v-if="!editing[index]" />-->
        <div class="flex w-40 flex-row">
          <input required class="w-full p-2 bg-transparent rounded-xl" type="number" numeric inputmode="numeric"
                 digitOnly v-model="item.amount" min="0" placeholder="Введите цену">
          <span class="py-2 w-10">₽</span>
        </div>
        <div class="bg-sectionSeparator h-0.5"/>
      </div>
      <button type="button" @click="removeElement(index)"
              class="bg-destructiveText rounded-full aspect-square size-8 my-auto mx-2">
        <ArchiveBoxIcon class="m-auto size-4 text-white"></ArchiveBoxIcon>
      </button>

    </div>
    <button @click="appendSpending" id="continue" type="button"
            class="rounded-b-xl w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            :class="{'rounded-xl': isEmpty && !isLast}">Добавить новый пункт расходов
    </button>
  </div>
</template>

<style scoped>

</style>