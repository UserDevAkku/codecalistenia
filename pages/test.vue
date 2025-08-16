<template>
    <div class="flex flex-center h-screen">
        <div class="flex flex-col-reverse h-7 w-4 ring-1 ring-black  rounded-bl-sm rounded-br-sm">
            <div class="battery" :style="{ height: battery + '%' }">
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref,onMounted } from 'vue'
const battery = ref(40);
onMounted(()=>{
    if(process.client){
        const fetchBatteryInfo=async ()=>{
            const batteryInfo=await navigator.getBattery();
            console.log(batteryInfo);
        }
        fetchBatteryInfo();
    }
})
</script>
<style scoped>
.battery {
    background: black;
}

</style>