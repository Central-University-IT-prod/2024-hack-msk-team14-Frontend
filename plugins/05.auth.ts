import { useAuthStore } from "~/store/auth"

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    const auth = useAuthStore()
    const $afetch = $fetch.create({ 
        baseURL: config.public.baseURL,
        onRequest({ options }) {
            console.log("I'm here!", auth.token)
            if (auth.token) {
                options.headers.set('Authorization', 'Bearer ' + auth.token)
            }
        }
    })
    return {
      provide: {
        afetch: $afetch
      }
    }
  })
  