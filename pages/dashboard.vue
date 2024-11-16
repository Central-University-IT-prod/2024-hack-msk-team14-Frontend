<template>
    <div>
        <EventListMain :events="events" />
        <ClientOnly>
          <MainButton text="Создать мероприятие" />
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import { MainButton, useWebAppPopup, useWebApp} from 'vue-tg'

const events = [
  {
    id: 'ndjnc233jnbcyu',
    name: "Поход в ресторан",
    isPayed: true,
    sum: 25300,

  },
  {
    id: 'ndjnc233444cyu',
    name: "Поход в ресторан",
    isPayed: false,
    sum: 5000,

  },
]
definePageMeta({
  title: "Мероприятия"
})
</script>
