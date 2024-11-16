<template>
  <ul role="list" class="flex items-center flex-col mt-3 divide-y divide-bg w-full h-full">
    <li v-for="(event, index) in props.events" @click="editEvent(event.id)" :key="event.id" class="bg-secondaryBg flex w-11/12 h-1/4 justify-between gap-x-6 py-5 rounded-xl shadow-lg mb-2">
      <div class="flex min-w-0 gap-x-4">
        <div class="min-w-0 flex-auto">
          <p class="ml-3 text-lg font-semibold leading-6 text-text">{{ event.name }}</p>
        </div>
      </div>
      <div class="shrink-0 flex flex-col items-end">
        <p class="text-md leading-6 text-text mr-2">{{ event.totalSum }}₽</p>

      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">

const router = useRouter()

const editEvent = (id: string) => {
  router.push(`/event/${id}`)
}

const props = defineProps<{
  events: Array<EventApi>
}>()

// const computeData = computed(()=>{
//   let list = []
//
//   props.events.forEach(e => {
//     $afetch(`/event/${e.id}/isFullyPaid`).then(response => {
//       list.push(response)
//     })
//   })
//   return list
// })

// const isPaidArray = ref<Array<boolean>>([])
//
// const {$afetch} = useNuxtApp()

// props.events.forEach(e => {
//   $afetch(`/event/${e.id}/isFullyPaid`).then(response => {
//     isPaidArray.value.push(response)
//   })
// })
</script>