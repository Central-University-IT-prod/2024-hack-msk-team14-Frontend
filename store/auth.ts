import { defineStore } from 'pinia'
import { type User } from '~/utils/types'

export const useAuthStore = defineStore({
  id: 'auth',
  persist: {
    storage: piniaPluginPersistedstate.cookies({
      sameSite: 'strict',
      secure: false,
      maxAge: 31557600
    }),
  },
  state: () => ({
    user: undefined as User | undefined,
    token: '' as string | undefined
  }),
  actions: {
    login(token: string, unsafeData: WebAppInitData) {
      if (token.length == 128) {
        this.user = {
          telegramId: unsafeData.user.id,
          firstName: unsafeData.user.first_name,
          lastName: unsafeData.user.last_name,
          username: unsafeData.user?.username,
        }
        this.token = token
      }
    }
  }
})