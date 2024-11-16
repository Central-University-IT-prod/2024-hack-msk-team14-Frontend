<template>
  <div class="w-full h-full flex py-12 ">
    <main class="m-auto h-full flex flex-col self-center justify-between items-center">
      <h1 class="text-3xl font-extrabold text-text" > Раздели Бот </h1>
        <div class="w-5/6">
          <div class= "min-h-24 flex w-full">
            <CircleStackIcon class="size-16 text-text"/>
            <div class="h-full w-full">
              <h2 class="text-md font-bold text-text">Отслеживай свои расходы</h2>
              <span class="text-md break-words text-text">Создавай записи со всеми твоими расходами - отлеживай сколько потратил</span>
            </div>
          </div>
        </div>
      <div class="w-5/6">
          <div class= "min-h-24 flex w-full">
            <ArrowPathRoundedSquareIcon class="size-16 text-text"/>
            <div class="h-full w-full">
              <h2 class="text-md font-bold text-text">Удобная система разделения</h2>
              <span class="text-md break-words text-text">Рассчитывай разделения в зависимости от потраченого</span>
            </div>
          </div>
        </div>
      <div class="w-5/6">
          <div class= "min-h-24 flex w-full">
            <CalculatorIcon class="size-16 text-text"/>
            <div class="h-full w-full">
              <h2 class="text-md font-bold text-text">Рассчитывай для разных компаний</h2>
              <span class="text-md break-words text-text">Рассчитывай сколько, кто, кому и за что должен</span>
            </div>
          </div>
        </div>
    </main>
  </div>

  <MainButton  @click="onClick" text="Начать"> </MainButton>
</template>

<script setup lang="ts">
import { MainButton } from "vue-tg";
import { ArrowPathRoundedSquareIcon, CalculatorIcon, CircleStackIcon } from "@heroicons/vue/24/solid";

definePageMeta({
  layout: 'headless',
  title: "Добро пожаловать!"
})

const router = useRouter()

const onClick = ()=>{
  router.push('/event/events')
}

</script>