import { useWebApp } from "vue-tg"
import { useAuthStore } from "~/store/auth"

export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path !== '/') {
        const auth = useAuthStore()
        if (auth.token?.length != 128) {
            if (import.meta.client) {
                const data = useWebApp()

                const body = {
                    params: data.initData,
                    userId: data.initDataUnsafe?.user?.id,
                    firstName: data.initDataUnsafe?.user?.first_name,
                    lastName: data.initDataUnsafe?.user?.last_name,
                    username: data.initDataUnsafe?.user?.username
                }
                if (!body.userId) {
                    return navigateTo('/')
                } else {
                    const { $api } = useNuxtApp()
                    $api<LoginResponse>('/auth/sign-in', {
                        method: "POST",
                        body
                    }).then((response) => {
                        const router = useRouter()
                        const auth = useAuthStore()
                        auth.login(response.token, data.initDataUnsafe)
                    }).catch((err) => {
                        return navigateTo('/')
                    })
                }
            }
        }
    }
    // if (to.path) {
    //   return abortNavigation()
    // }
    // // In a real app you would probably not redirect every route to `/`
    // // however it is important to check `to.path` before redirecting or you
    // // might get an infinite redirect loop
  })
  