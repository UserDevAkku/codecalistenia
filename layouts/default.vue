<template>
    <q-layout v-if="hideThepage" class="h-full">
        <q-header :class="[!deviceInfo.pc ? 'bg-yellow' : 'bg-black', 'h-[100px]']">
            <q-bar :class="[deviceInfo.pc ? 'h-24 p-4 bg-[#C9CDCF]' : 'h-14 p-1 bg-[#000047]', 'row justify-between']">
                <div
                    :class="[deviceInfo.pc ? 'bg-[rgb(201,205,207)] ring-1 border-spacing-9  border-2 border-black ring-white ring-inset-3  shadow-white' : 'shadow-4   ring-inset-4 ring-1 bg-[#000047]', 'p-2 gap-x-1 gap-1 flex flex-center rounded-tl-2xl rounded-tr-2xl']">
                    <Icon :icon="[deviceInfo.pc ? 'mdiMicrosoftWindows' : 'mdiCellphone']"
                        :color="[deviceInfo.pc ? 'brown' : 'cyan']"
                        class="text-lg sm:text-lg md:text-lg lg:text-2xl" />
                    <Icon icon="mdiCalendarMonth" color="red" class="text-lg sm:text-lg md:text-lg lg:text-2xl" />
                    <span
                        :class="[deviceInfo.pc ? 'text-black' : 'text-pink-500', 'font-sans text-bold text-lg sm:text-lg md:text-lg lg:text-2xl']">
                        {{ calender.days[calenderDataHandlers.day] }},{{ ' ' }}{{ calender.date }}{{
                            calender.months[calenderDataHandlers.month] }}{{ calender.year }}
                    </span>
                </div>
                 <div
                    :class="[deviceInfo.pc ? 'bg-[rgb(201,205,207)] ring-1 border-spacing-9  border-2 border-black ring-white ring-inset-3  shadow-white' : 'shadow-4   ring-inset-4 ring-1 bg-[#000047]', 'p-2 gap-x-1 gap-1 flex flex-center rounded-tl-2xl rounded-tr-2xl']">
                    <Icon icon="mdiClock" class="text-lg sm:text-lg md:text-lg lg:text-2xl"
                        :color="deviceInfo.pc ? 'black' : 'green'" />
                    <span
                        :class="[deviceInfo.pc ? 'text-red' : 'text-white', 'text-bold  text-lg sm:text-lg md:text-lg lg:text-2xl']">{{
                            time.hr }}:{{
                            time.min }}:{{
                            time.sec
                        }}</span>

                    <Icon :icon="deviceInfo.internet ? 'mdiWifiStrength4' : 'mdiWebRemove'"
                        :color="deviceInfo.pc ? 'blue' : 'yellow'" class="text-lg sm:text-lg md:text-lg lg:text-2xl" />
                    <div
                        :class="[deviceInfo.pc ? 'h-8 w-5 ring-2' : 'h-4 ring-1 w-2', 'flex flex-col-reverse  bg-[#000047]  ring-gray-400 ring-offset rounded-bl-sm rounded-br-sm']">
                        <div :class="[deviceInfo.pc ? 'battery' : 'bg-[#00ffff]', 'w-5 rounded-bl-sm rounded-br-sm relative']"
                            :style="{ height: deviceInfo.battery.level + '%' }">
                            <img v-if="deviceInfo.battery.charging_status === true" src="/assets/bg/flash.png"
                                class="absolute h-3 bottom-2 right-1" />
                        </div>
                    </div>
                </div>
            </q-bar>
            <q-toolbar>
                <Icon flat @click="drawer = !drawer" round dense icon="menu" />
                <q-toolbar-title>Header</q-toolbar-title>
            </q-toolbar>
        </q-header>
        <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="500"
            :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
            <q-scroll-area class="fit">
                <q-list class="flex flex-center bg-red">
                    <template v-for="(menuItem, index) in menuList" :key="index">
                        <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple></q-item>
                        <q-item-section avatar>
                            <q-icon :name="menuItem.icon" />
                        </q-item-section>
                        <q-item-section>
                            {{ menuItem.label }}
                        </q-item-section>

                        <q-separator :key="'sep' + index" v-if="menuItem.separator" />
                    </template>

                </q-list>
            </q-scroll-area>
        </q-drawer>
        <!-- <Icon color="black" icon="mdiMenu" size="50px" />
        <input class="h-8 ring-1 ring-gray-400 focus:ring-cyan-300  outline-0 rounded-lg px-2 w-full"
            placeholder="Search here" type="text" />
        <button @click="login_fn"
            class="p-1 w-full bg-blue-700 text-white text-bold font-sans ring-1 ring-gray-400 shadow-0 rounded-lg focus:bg-blue-500">Log
            In</button>
        <Icon icon="mdiToggleSwitch" size="55px" />
        <NuxtLink to="/" class="routes">
            Home
        </NuxtLink>
        <NuxtLink to="/users" class="routes">
            Users
        </NuxtLink>
        <NuxtLink to="/About" class="routes">
            About
        </NuxtLink>
        <NuxtLink to="/Contact-Us" class="routes">
            Contact us
        </NuxtLink> --> --> -->
        <q-page-container>
            <q-page class="flex flex-center">
                <h1>hello</h1>
                <ClockSoundEnabler :isEnable="isEnable" @update:isEnable="close_popup" />
                <NuxtPage />
            </q-page>
        </q-page-container>
        <!-- <q-footer class="bg-white p-2 shadow-5 border-l-cyan-600 rounded-tl-2xl rounded-tr-2xl border-r-cyan-600 ">
            <q-toolbar class="flex flex-center h-5">
                <q-list class="list-none flex flex-center space-x-6 w-full relative">
                    <li>
                        <Icon id="instagram" class="p-0 text-bold" icon="mdiInstagram" color="red"
                            @click="handleSocialnetworks('instagram');" size="1.5rem" />
                    </li>
                    <li>
                        <Icon id="facebook" class="p-0 text-bold" icon="mdiFacebook" color="blue"
                            @click="handleSocialnetworks('facebook');" size="1.5rem" />
                    </li>
                    <li :class="[deviceInfo.pc ? 'absolute right-1 bottom-8' : 'absolute right-1 bottom-14']">
                        <Icon id="instagram" class="p-0 text-bold" icon="mdiWechat" color="green"
                            @click="handleSocialnetworks('whatsapp');" :size="deviceInfo.pc ? '4rem' : '3rem'" />
                    </li>
                </q-list>
            </q-toolbar>
        </q-footer> -->
    </q-layout>
</template>

<!-- <div>
            <div @click="home_fn" class="h-full flex flex-center w-[20%] bg-transparent">
                <img c
            lass="h-12 w-[100%] object-cover object-center" />
            </div>
            <q-space />
            
            <q-space />
            <div class="flex flex-center cursor-pointer">
                <div class="bg-[#dcdcdc] rounded-lg space-x-2 flex flex-center h-[60%] w-[80%] ring-1 ring-gray-400">
                                    </div>
            </div>
        </div>
        </q-bar>
        <q-toolbar
            class="flex justify-evenly text-lg sm:text-md md:text-lg lg:text-2xl text-bold text-[#696969] font-sans ">
            <Icon icon="mdiMenu" @click="drawer = !drawer" color="black" size="40px" />
            <div class="w-[100%] flex flex-center justify-evenly">
                <NuxtLink to="/auth/login" class="routes">
                    Home
                </NuxtLink>
                <NuxtLink to="/auth/login" class="routes">
                    Dashboard
                </NuxtLink>
                <NuxtLink to="/auth/login" class="routes">
                    Users
                </NuxtLink>
                <NuxtLink to="/auth/login" class="routes">
                    About
                </NuxtLink>
                <NuxtLink to="/auth/login" class="routes">
                    Services
                </NuxtLink>
                <NuxtLink to="/auth/login" class="routes">
                    ContactUs
                </NuxtLink>
            </div>
        </q-toolbar>

        </q-header>

        <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="500" bordered
            :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
            <q-scroll-area class="fit">
                <q-list class="flex flex-center bg-red">

                    <template v-for="(menuItem, index) in menuList" :key="index">
                        <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
                            <q-item-section avatar>
                                <q-icon :name="menuItem.icon" />
                            </q-item-section>
                            <q-item-section>
                                {{ menuItem.label }}
                            </q-item-section>
                        
                        <q-separator :key="'sep' + index" v-if="menuItem.separator" />
                    </template>
</q-list>
</q-scroll-area>
</q-drawer> -->
<script setup>
import { ref, watch, onBeforeMount, onBeforeUnmount, onMounted } from 'vue';


import { useQuasar, QSpinnerFacebook } from 'quasar';

const isEnable = ref(false);

const close_popup = (updatedValue) => {
    isEnable.value = updatedValue;
}

const hideThepage = ref(false);


const $q = useQuasar();

const drawer = ref(false);

const api = useNuxtApp().$axios;

const socialNetworks = ref({
    whatsapp: null,
    facebook: null,
    instagram: null,
})


const deviceInfo = ref({
    pc: null,
    internet: null,
    battery: {
        level: '',
        charging_status: null,
    }
})

let calenderDataHandlers = {
    day: null,
    month: null,
}
const calender = ref({
    date: null,
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    months: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"],
    year: null,
})

const time = ref({
    hr: '',
    min: '',
    sec: '',
})


const menuList = [
    {
        icon: 'inbox',
        label: 'Inbox',
        separator: true
    },
    {
        icon: 'send',
        label: 'Outbox',
        separator: false
    },
    {
        icon: 'delete',
        label: 'Trash',
        separator: false
    },
    {
        icon: 'error',
        label: 'Spam',
        separator: true
    },
    {
        icon: 'settings',
        label: 'Settings',
        separator: false
    },
    {
        icon: 'feedback',
        label: 'Send Feedback',
        separator: false
    },
    {
        icon: 'help',
        iconColor: 'primary',
        label: 'Help',
        separator: false
    }
]

const handleSocialnetworks = (button) => {
    if (process.client) {
        if (button === 'whatsapp') {
            window.open('https://wa.me/919818728946', '_blank');
        }
        if (button === 'instagram') {
            window.open('https://instagram.com/aakash.cali', '_blank');
        }
        if (button === 'facebook') {
            window.open('https://www.facebook.com/profile.php?id=739760575888369');
        }
    }
}

const redirectTo = (btn) => {
    if (btn === "company_logo") return navigateTo('/')
    if (btn === "login_btn") return navigateTo('/auth/login');
}


let controller_id = null;
const Controller = () => {
    if (process.client) {
        controller_id = setInterval(() => {
            const now = new Date();
            /* TIME */
            let hours = now.getHours() % 12;
            time.value.hr = hours === 0 ? 12 : hours;
            time.value.min = String(now.getMinutes()).padStart(2, 0);
            time.value.sec = String(now.getSeconds()).padStart(2, 0);
            /* CALENDER */
            calenderDataHandlers.day = now.getDay();
            calenderDataHandlers.month = now.getMonth();
            calender.value.year = now.getFullYear();
            calender.value.date = now.getDate();
            /* DEVICE_INFO */
            deviceInfo.value.internet = navigator.onLine;
            navigator.getBattery().then((batteryInfo) => {
                deviceInfo.value.battery.level = Math.round(batteryInfo.level * 100);
                deviceInfo.value.battery.charging_status = batteryInfo.charging;
                deviceInfo.value.pc = navigator.userAgent.match(/\b(Windows|Mobile)\b/)[0] === "Windows" ? "true" : "false";
            })
        }, 1000);
    }
}
Controller();

const show_fn = () => {
    if (process.client) {
        $q.loading.show({
            messageColor: "black",
            spinner: QSpinnerFacebook,
            spinnerColor: 'black',
            spinnerSize: 60,
            backgroundColor: 'cyan',
            messageColor: 'white'
        })
    }
}
onBeforeMount(() => {
    if (process.client) {
        show_fn();
        Controller();
    }
});


let hideLoder_timerID = null;
onMounted(() => {
    if (process.client) {
        hideLoder_timerID = setTimeout(() => {
            $q.loading.hide();
            hideThepage.value = true;
        }, 3000);
        isEnable.value = true;

    }
});


onBeforeUnmount(() => {
    if (process.client) {
    }
    if (hideLoder_timerID) clearTimeout(hideLoder_timerID), hideLoder_timerID = null;
});


</script>

<style scoped>
.battery {
    background: #3dea3d;
}

.routes:hover {
    color: black;
}

.shadow {
    box-shadow: 0 0 2px white;
}
</style>