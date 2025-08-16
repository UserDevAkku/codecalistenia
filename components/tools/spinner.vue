<template>
    <div align="center" class="absolute z-20">
        <q-spinner-ios v-if="props.spinner" color="blue" size="2rem" />
    </div>
</template>
<script setup>
const props = defineProps({
    spinner: Boolean
})
</script>