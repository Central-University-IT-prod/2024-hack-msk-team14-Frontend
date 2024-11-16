<template>
    <div>
        <EventListMain :events="events" />
        <ClientOnly>
          <MainButton @click="newEvent" text="Создать мероприятие" />
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import { MainButton, useWebAppPopup, useWebApp} from 'vue-tg'
import { useCacheStore } from '~/store/evtsCache';

const cache = useCacheStore()
await cache.retrieveEvts()
const events = computed(() => cache.events)
definePageMeta({
  title: "Мероприятия"
})

const router = useRouter()

const newEvent = () =>{
  router.push("/event/newEvent")
}

</script>
