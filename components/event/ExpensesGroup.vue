<script setup lang="ts">

import {ArchiveBoxIcon} from "@heroicons/vue/16/solid";
import ExpensesEditData from "~/components/event/expensesEditData.vue";

const expenseGroups = defineModel<Array<{
  data: Array<{name: string, amount: number}>,
  name: string
}>>()

const isEmpty = computed(()=>expenseGroups.value?.length === 0)

const removeElement = (index: number) => {
  if (index > -1) {
    expenseGroups.value?.splice(index, 1);
  }
}

const appendSpending = ()=>{
  expenseGroups.value?.push({
    name: `Группа ${expenseGroups.value?.length + 1}` ,
    data: []
  })
}

const arrayLength = computed(()=>expenseGroups.value.length - 1)

const indexFormat = computed(()=>{
  let list = [false]
  for(let i = 1; i < expenseGroups.value.length; i++) {
    list.push(true)
  }
  return list;
})

</script>

<template>

  <div class="bg-secondaryBg rounded-xl" :class="{'p-2' : !isEmpty}">
    <div class="flex border-accentText" v-for="(item, index) in expenseGroups" :class="indexFormat[index] ? 'rounded-none' : 'rounded-t-xl' ">
      <div class="w-full">
        <input v-model="item.name" type="text" class="p-1 my-2 bg-transparent text-md font-bold text-text">
        <ExpensesEditData class="w-full" v-model:expenses="item.data" :v-model:is-last="index == arrayLength"></ExpensesEditData>
      </div>
      <button type="button" @click="removeElement(index)"
              class="bg-destructiveText rounded-full aspect-square size-8 my-auto mx-2">
        <ArchiveBoxIcon class="m-auto size-4 text-white"></ArchiveBoxIcon>
      </button>
    </div>
    <button @click="appendSpending" id="continue" type="button"
            class="rounded-xl mt-2 rounded-r-xl w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >Добавить новую категорию
    </button>
  </div>

</template>

<style scoped>

</style>