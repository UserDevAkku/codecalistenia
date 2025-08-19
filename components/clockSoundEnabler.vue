<template>
    <div class="flex flex-center m-4">
        <q-dialog v-model="props.isEnable" persistent>
            <q-card
                :class="[props.isEnable ? 'p-4' : 'p-4', 'flex flex-center relative p-8 shadow-5 bg-black ring-2 ring-gray-600 ring-inset-2  border border-black  h-[15%] lg:h-[25%]  w-[60%] lg:w-[15%]']">
                <Icon @click="close_popup" class="absolute font-300 bottom-0 right-0" icon="mdiDelete" color="yellow"
                    size="2rem" />
                <button @click="!isActive.status ? isActive.status = true : isActive.status = false"
                    :class="[isActive.status ? 'bg-green-600  ring-green-700  border-green-500 transition-all delay-20 duration-200 translate-y-0  scale-150 ' : !isActive.status ? 'bg-red-600  ring-red-700  border-red-500 transition-all delay-10 duration-100 translate-y-0  scale-80' : '', 'ring-1 h-8 w-15 lg:h-10 lg:w-15 font-robto 2xl ring-inset-2 rounded-2xl border-2 text-sm lg:text-xs text-white']">
                    <Icon :icon="isActive.status ? 'mdiVolumeHigh' : 'mdiVolumeOff'" size="2rem" color="black" />
                </button>
            </q-card>
        </q-dialog>
    </div>
</template>
<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue';
const props = defineProps({
    isEnable: Boolean,
})
const emits = defineEmits('update:isEnable');
const isActive = ref({
    status: null,
    text: 'Disabled',
})
const close_popup = () => {
    
    emits('update:isEnable', false);
}




</script>