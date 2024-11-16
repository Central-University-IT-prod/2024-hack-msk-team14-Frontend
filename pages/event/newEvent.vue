<script setup lang="ts">

import {Switch} from "@headlessui/vue";
import {BackButton, MainButton} from "vue-tg";
import {SymbolKind} from "vscode-languageserver-types";
import {useAuthStore} from "~/store/auth";
import QrScanner from "~/components/event/qrScanner.vue";
import ExpensesGroup from "~/components/event/ExpensesGroup.vue";
import Array = SymbolKind.Array;
import {useCacheStore} from "~/store/evtsCache";
import type {AdditionalItemsError} from "@redocly/ajv/lib/vocabularies/applicator/additionalItems";

const name = ref<string>('')
// const expenses = ref<Array<{ name: string, amount: number }>>([])
const expensedGroup = ref<Array<{
  name: string,
  data : Array<{name:string, amount:number}>
}>>([])

const error = ref<Boolean>()

const disallowEdit = ref<Boolean>(false)
const equalDivision = ref<Boolean>(false)

const router = useRouter()
const {$afetch}   = useNuxtApp()
const store = useAuthStore()

const registerData = async () =>{
  console.log(`Current sent name : ${name.value}`)

  if(!store.user){
    error.value = true
    return;
  }

  var event : EventApi | null = null

  var id : string = ''

  await $afetch<EventApi>('/event/',{
    method: "POST",
    body: {
      name: name.value
    }
  }).then((evtData) => {
    const cache = useCacheStore()
    const idx = cache.events.findIndex((event) => event.id == evtData.id)
    if (idx == -1) {
      cache.events.push(evtData)
    } else {
      cache.events[idx] = evtData
    }
    return evtData
  }).then(response => {
    id = response.id
    event = response
  })

  if(!event){
    return;
  }

  if(!id){
    return
  }

  console.log('Fetching data from page')


  expensedGroup.value.forEach(group => {
    var itemData: any[] = []
    group.data.forEach((item) => {
      itemData.push({
        name: item.name,
        quantity: 1,
        price: item.amount,
      })
    })

    let newGroupData = {
      name: group.name,
      items: itemData
    }

    console.log(`fetching data for new item group ${newGroupData}`)

    $afetch(`/event/${id}/item/`, {
      method: "POST",
      body: newGroupData
    })
  })
  // await router.push('/event/events')
}

const disallowSwitch = ()=>{
  disallowEdit.value = !disallowEdit.value
}

const equalSwitch = ()=>{
  equalDivision.value = !equalDivision.value
}

const validateSubmit = () => {
  if (!!name && expensedGroup.value.length === 0) {
    error.value = true
    return false;
  }
  error.value = false;

  registerData()

  router.push('/event/events')
  return true
}

const goBack = () => {
  router.push('/event/events')
}

</script>

<template>

  <div class="w-full p-4 text-text mb-14 flex flex-col">

    <div class="text-center w-full h-0 opacity-0 rounded-xl bg-destructiveText transition-all duration-200"
         :class="{'h-1/4 opacity-100 p-2 mb-2': error}">
      <p class="text-text">Произошла ошибка. Зполните все поля</p>
    </div>

    <h1 class="font-extrabold text-2xl">
      Новое Мероприятие
    </h1>
    <TitledInput class="my-4" placeholder="Введите название для мероприятия" label="Название"
                 v-model="name"></TitledInput>

    <label class="font-bold text-lg my-2 text-text"> Траты </label>
<!--    <ExpensesEditData v-model="expenses"></ExpensesEditData>-->
    <ExpensesGroup v-model="expensedGroup"></ExpensesGroup>
    <QrScanner v-model="expensedGroup"></QrScanner>
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
      <span   @click="equalSwitch" class="self-center"> Использовать равное разделение</span>
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
      <span  @click="disallowSwitch" class="self-center"> Запретить редактирование всем кроме автора</span>
    </div>

  </div>
  <BackButton @click="goBack"></BackButton>
  <ClientOnly>
    <MainButton key="buttonKey" ref="mainButton" @click="validateSubmit" text="Создать новое событие"></MainButton>
  </ClientOnly>
</template>

<style scoped>

</style>