<template>
    <span :class="[status ? 'text-green-600' : 'text-black']" class="font-bold transition-colors duration-200">
        {{ props.message }}
    </span>
</template>

<script setup>
const props = defineProps({
    message: String,
    state: Boolean
})
const status = toRef(() => props.state)
</script>