<template>
    <div>
        <div v-for="(debt, userId) in debts">
            {{ props.userList.find((idx) => userId == idx.user.telegramId) }}
            {{ debt.theyOwe > debt.youOwe ? 
            `They owe you ${debt.theyOwe-debt.youOwe}` : 
            `You owe them ${debt.youOwe-debt.theyOwe}`}}
        </div>
    </div>
</template>

<script setup lang="ts">
import type { SumDebt } from '~/utils/types';

const props = defineProps<{
    debts: Record<number, SumDebt>,
    userList: Array<Lender>
}>()

</script>

<style scoped>

</style>