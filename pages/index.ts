import { useWebApp } from "vue-tg"
import { useAuthStore } from "~/store/auth"
import type { LoginResponse } from "~/utils/types"

export default defineComponent({
  async setup () {
    definePageMeta({
        layout: "headless"
    })
    const renderContent = ref("Loading...")
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
            renderContent.value = 'Пожалуйста зайдите с клиента телеграм!'
        } else {
            const { $api } = useNuxtApp()
            console.log(body)
            $api<LoginResponse>('/auth/sign-in', {
                method: "POST",
                body
            }).then((response) => {
                console.log('A1', response)
                const router = useRouter()
                const auth = useAuthStore()
                auth.login(response.token, data.initDataUnsafe)
                
                if (response.isNew) {
                    router.push('/greeting')
                } else {
                    router.push('/event/events')
                }
            }).catch((err) => {
                console.log('B1', err)
                renderContent.value = 'Не удалось войти в ваш телеграм аккаунт, пожалуйста, зайдите снова!'
            })
        }
    }
    return () => h('div', { class: 'flex justify-center items-center h-full' }, h('h1', { class: 'text-2xl text-text' }, renderContent.value))
  }
})