import { defineStore } from 'pinia'
import type { EventApi, SumDebt } from '~/utils/types'

export const useCacheStore = defineStore({
  id: 'evtsCache',
  persist: {
    storage: piniaPluginPersistedstate.cookies({
      sameSite: 'strict',
      secure: false,
      maxAge: 31557600
    }),
  },
  state: () => ({
    events: [] as EventApi[],
    debtData: {} as Record<string, Record<number, SumDebt>>
  }),
  actions: {
    async retrieveEvt(evt: string) {
      const { $afetch } = useNuxtApp()
      return await $afetch<EventApi>('/event/' + evt)
      // const promise = $afetch<EventApi>('/event/' + evt).then((evtData) => {
      //   const idx = this.events.findIndex((event) => event.id == evt)
      //   if (idx == -1) {
      //     this.events.push(evtData)
      //   } else {
      //     this.events[idx] = evtData
      //   }
      // })
      // const el = this.events.find((event) => event.id == evt)
      // if (el) {
      //   return el
      // }
      // await promise
      // return this.events.find((event) => event.id == evt)
    },
    async retrieveEvts() {
      const { $afetch } = useNuxtApp()
      return await $afetch<Array<EventApi>>('/event/my')

      // const promise = $afetch<Array<EventApi>>('/event/my').then((cntn) => {
      //   this.events = cntn
      // })
      // if (this.events.length > 0) return this.events
      // await promise
      // return this.events
    },
    async retrieveCache(id: string) {
      const { $afetch } = useNuxtApp()

      const promise = $afetch<{
        debts: Record<number, SumDebt>
      }>(`/event/${id}/myDebt`).then((cntn) => {
        this.debtData[id] = cntn
      })
      if (this.debtData[id]) return this.debtData[id]
      await promise
      return this.debtData[id]
    }
  }
})