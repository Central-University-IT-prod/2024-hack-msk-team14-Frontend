<script setup lang="ts">

import {Switch} from "@headlessui/vue";
import {BackButton, MainButton} from "vue-tg";
import {useCacheStore} from "~/store/evtsCache";
import ExpensesGroup from "~/components/event/ExpensesGroup.vue";
import QrScanner from "~/components/event/qrScanner.vue";
import type {EventApi, Lender} from "~/utils/types";

const name = ref<String>('')
const expenseGroups = ref<Array<{
  data: Array<{name: string, amount: number}>,
  name: string
}>>([])
 // expenses = ref<Array<{name: string, amount: number}>>([])

const DOMAIN = 'https://prodeli.teamnoco.de'

const editing = ref<Array<boolean>>([])
  
const error = ref<Boolean>()

const cache  = useCacheStore()
const route =  useRoute()
const id = route.params.id
const res: EventApi | undefined = await cache.retrieveEvt(route.params.id);
const testEvent: EventApi = {
  name: 'test',
  itemGroups:[
    {
      name: 'Fart',
      items:[
        {
          id: 'string',
          groupId: 'string',
          name: 'string',
          price: 1000,
          quantity: 1,
          lender: null
        }
      ]
    }
  ]
}
if (res){
  name.value = res.name;
  res.itemGroups.forEach(group => {
    let groupData : Array<{name: string, amount: number}> = []

    group.items.forEach(item => {
      groupData.push({name: item.name, amount: item.price});
    })

    console.log(expenseGroups.value)

      expenseGroups.value.push({
        name: group.name,
        data: groupData
      })
  })
}
// expenses.value = res.operationGroups.operations;
//
// console.log(toRaw(expenses.value), res)

const disallowEdit = ref<Boolean>(false)
const equalDivision = ref<Boolean>(false)

const router = useRouter()
const debt = ref({})
const isDebtsOpen = ref(false);

const onDebtOpen = () => {
  debt.value = cache.retrieveCache(id)
  isDebtsOpen.value = !isDebtsOpen.value
}

const { $afetch } = useNuxtApp()
const validateSubmit = async () => {
  if (!!name && expenseGroups.value.length === 0) {
    error.value = true
    return false;
  }
  await $afetch(`/event/${id}/lock`, { method: "POST"}).then(() => {
    cache.retrieveEvt(id)
  })
}

const goBack = () => {
  router.push('/event/events')
}

</script>

<template>

<div class="w-full p-4 text-text mb-14 flex flex-col">

<div class="text-center w-full h-0 opacity-0 rounded-xl bg-destructiveText transition-all duration-200" :class="{'h-1/4 opacity-100 p-2 mb-2': error}">
  <p class="text-text none-select">Произошла ошибка. Заполните все поля</p>
</div>

<h1 class="font-extrabold text-2xl none-select">
  Редактирование
</h1>

<TitledInput class="my-4" placeholder="Введите название для мероприятия" label="Название" v-model = "name"></TitledInput>

<label class="font-bold text-lg my-2 text-text none-select"> Траты </label>

  <ExpensesGroup v-model="expenseGroups"></ExpensesGroup>
  <QrScanner v-model="expenseGroups"></QrScanner>

<div class="mt-4 p-2 flex gap-4">
  <Switch 
    v-model="equalDivision"
    :class="equalDivision ? 'bg-button' : 'bg-bg'"
    class="relative inline-flex h-6 min-w-11 w-11 items-center rounded-full border-2 border-secondaryBg"
    >

    <span
        :class="equalDivision ? 'translate-x-6' : 'translate-x-1'"
        class="inline-block h-4 w-4 transform rounded-full bg-white transition"
    />
  </Switch>
  <span class="self-center none-select"> Использовать равное разделение</span>
</div>
<div class=" p-2 flex gap-4">
  <Switch
    v-model="disallowEdit"
    :class="disallowEdit ? 'bg-button' : 'bg-bg'"
    class="relative inline-flex h-6 min-w-11 w-11 items-center rounded-full border-2 border-secondaryBg"
    >

    <span
        :class="disallowEdit ? 'translate-x-6' : 'translate-x-1'"
        class="inline-block h-4 w-4 transform rounded-full bg-white transition"
    />
  </Switch>
  <span class="self-center none-select"> Запретить редактирование всем кроме автора</span>
</div>

  <div class="flex flex-col">
    <h2 class="mt-4 font-bold text-lg none-select">
      Ссылка
    </h2>
<!--    <div class="w-full mt-2 h-1/4 cursor-text link-select">-->
<!--      {{ DOMAIN + route.path }}-->
<!--    </div>-->
    <button class="bg-button p-2 w-full rounded-xl"> Копировать ссылку для приглашения</button>
  </div>

  <button class="bg-button p-2 w-full rounded-xl mt-2" @click="onDebtOpen" >Показать долги</button>
  <div v-if="isDebtsOpen">
    <Debts :debts="debt" :userList="res.members" />
  </div>
</div>

<BackButton @click="goBack"></BackButton>
<ClientOnly>
<MainButton key="buttonKey" ref="mainButton" @click="validateSubmit" text="Подтвердить (Необратимо)"></MainButton>
</ClientOnly>
</template>

<style scoped>

.none-select{
  -webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

.link-select{
  user-select: all;
}

</style>