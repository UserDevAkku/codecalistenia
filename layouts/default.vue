<template>
    <q-layout view="hHh Lpr lff" class="h-screen">
        <q-header class="bg-black">
            <div class="m-4 flex flex-center">
                <q-card>
                    <img src="/public/codecalistenia.jpg" class="shadow-8 ring-2 ring-gray-500 rounded-lg" />
                </q-card>
            </div>
            <q-toolbar
                :class="[isDark ? 'bg-[#61641d] text-white' : 'bg-[white] text-black', 'cursor-pointer flex flex-center p-0']">
                <q-bar class="col-12 col-md-12 ring-2 ring-cyan-400 bg-black row justify-between">
                    <div class="col-3  col-10  col-md-2 bg-white">
                        <q-btn @click="drawer = !drawer" icon="mdi-menu" size="30px" color="black" />
                    </div>
                    <q-space/>
                        <q-list class="col-4  grid grid-cols-7 list-none place-items-center">
                            <li class="text-white text-sm">{{ time.hr }}:{{ time.min }}:{{ time.sec
                            }}
                            </li>
                            <li><q-btn round flat dense class="p-0" :icon="isPC ? 'mdi-laptop' : 'mdi-cellphone-basic'"
                                    color="white" />
                            </li>
                            <li><q-btn round flat dense class="p-0" :icon="isOnline ? 'mdi-wifi' : 'mdi-web-remove'"
                                    color="white" />
                            </li>
                            <li>
                                <q-btn id="whatsapp" round flat dense class="p-0 text-bold" icon="mdi-whatsapp"
                                    color="green" @click="socialMedias_handler('whatsapp');" />
                            </li>
                            <li>
                                <q-btn id="instagram" round flat dense class="p-0 text-bold" icon="mdi-instagram"
                                    color="red" @click="socialMedias_handler('instagram');" />
                            </li>
                            <li>
                                <q-btn id="facebook" round flat dense class="p-0 text-bold" icon="mdi-facebook"
                                    color="blue" @click="socialMedias_handler('facebook');" />
                            </li>
                            <li v-if="battery.batteryPercentage"
                                class="flex flex-col-reverse  h-4 w-2 gap-1 text-[.5rem] rounded-bl-md rounded-br-md ring-1 ring-white">
                                <div :class="[battery.chargingStatus ? 'battery' : 'bg-white', 'rounded-bl-md rounded-br-md w-2']"
                                    :style="{ height: battery.batteryPercentage + '%' }">
                                    <img v-if="battery.chargingStatus" src="/assets/bg/flash.png"
                                        class="relative top-1 h-2 object-cover object-center" />
                                </div>
                                <span>{{ battery.batteryPercentage + '' + '%' }}</span>
                            </li>
                        </q-list>
                </q-bar>
                <!-- <q-toolbar-title @click="redirectTo_Home" class="text-shadow-lg">codecalistenia.com</q-toolbar-title> -->
            </q-toolbar>
        </q-header>

        <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="500" bordered
            :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
            <q-scroll-area class="fit">
                <q-list>
                    <template v-for="(menuItem, index) in menuList" :key="index">
                        <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
                            <q-item-section avatar>
                                <q-icon :name="menuItem.icon" />
                            </q-item-section>
                            <q-item-section>
                                {{ menuItem.label }}
                            </q-item-section>
                        </q-item>
                        <q-separator :key="'sep' + index" v-if="menuItem.separator" />
                    </template>

                </q-list>
            </q-scroll-area>
        </q-drawer>
        <Icon color="black" v-if="isOnline" icon="mdiWifi" size="15px" class="text-bold" />
        <Icon color="black" v-if="!isOnline" icon="mdiWebRemove" size="15px" class="text-bold" />
        <Icon color="blue" v-if="isPC" icon="mdiMicrosoftWindows" size="20px" class="text-bold" />
        <Icon color="black" v-if="isMobile" icon="mdiCellphoneBasic" size="20px" class="text-bold" />
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
                <NuxtPage />
            </q-page>
        </q-page-container>
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
            class="flex justify-evenly text-sm sm:text-md md:text-base lg:text-lg text-bold text-[#696969] font-sans ">
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
                <q-list>

                    <template v-for="(menuItem, index) in menuList" :key="index">
                        <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
                            <q-item-section avatar>
                                <q-icon :name="menuItem.icon" />
                            </q-item-section>
                            <q-item-section>
                                {{ menuItem.label }}
                            </q-item-section>
                        </q-item>
                        <q-separator :key="'sep' + index" v-if="menuItem.separator" />
                    </template>

</q-list>
</q-scroll-area>
</q-drawer> -->
<script setup>
import { ref, onBeforeMount } from 'vue';
const drawer = ref(false);
const api = useNuxtApp().$axios;
const battery = ref({
    batteryPercentage: "",
    chargingStatus: "",
});
const id = ref({
    whatsapp: null,
    instagram: null,
    facebook: null,
})
const isDark = ref(true);
const isPC = ref(null);
const isMobile = ref(null);
const isOnline = ref(null);
const time = ref({
    hr: null,
    min: null,
    sec: null,
});

const socialMedias_handler = (button) => {
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
const redirectTo_Home = () => {
    navigateTo('/');
}
const login_fn = () => {
    navigateTo('/auth/login');
}
/*******************************/
const startWatch = () => {
    if (process.client) {
        setInterval(() => {
            const now = new Date();
            let hours = now.getHours();
            hours = hours % 12;
            hours = hours === 0 ? 12 : hours;
            time.value.hr = hours;
            time.value.min = now.getMinutes();
            time.value.sec = String(now.getSeconds()).padStart(2, 0);
        }, 1)
    }
}
startWatch();
/*******************************/
const batteryInfo_fn = async () => {
    if (process.client) {
        setInterval(async () => {
            /*  Track Charging Status */
            let batteryInfo = await navigator.getBattery();
            battery.value.batteryPercentage = Math.round(batteryInfo.level * 100);
            battery.value.chargingStatus = batteryInfo.charging;
        }, 1)
    }

}
batteryInfo_fn();
/*******************************/
const phoneORPc = () => {
    if (process.client) {
        setInterval(() => {
            let ua = navigator.userAgent;
            let isMobpc = ua.match(/\b(Windows|Mobile)\b/);
            if (isMobpc && isMobpc[0] === 'Windows') {
                isPC.value = true;
            }
            else if (isMobpc && isMobpc[0] === 'Mobile') {
                isMobile.value = true;
            }
        }, 1);
    }
}
phoneORPc();
/*******************************/
const isInternetAccess = () => {
    if (process.client) {
        setInterval(async () => {
            const isFound = navigator.onLine;
            isOnline.value = isFound;
        }, 1)
    }
}
isInternetAccess();
/*******************************/
onBeforeMount(() => {
    const startWatch = () => {
        if (process.client) {
            setInterval(() => {
                const now = new Date();
                let hours = now.getHours();
                hours = hours % 12;
                hours = hours === 0 ? 12 : hours;
                time.value.hr = hours;
                time.value.min = now.getMinutes();
                time.value.sec = String(now.getSeconds()).padStart(2, 0);
            }, 1)
        }
    }
    startWatch();
    /*******************************/
    const batteryInfo_fn = async () => {
        if (process.client) {
            setInterval(async () => {
                /*  Track Charging Status */
                let batteryInfo = await navigator.getBattery();
                battery.value.batteryPercentage = Math.round(batteryInfo.level * 100);
                battery.value.chargingStatus = batteryInfo.charging;
            }, 1)
        }

    }
    batteryInfo_fn();
    /*******************************/
    const phoneORPc = () => {
        if (process.client) {
            setInterval(() => {
                let ua = navigator.userAgent;
                let isMobpc = ua.match(/\b(Windows|Mobile)\b/);
                if (isMobpc && isMobpc[0] === 'Windows') {
                    isPC.value = true;
                }
                else if (isMobpc && isMobpc[0] === 'Mobile') {
                    isMobile.value = true;
                }
            }, 1);
        }
    }
    phoneORPc();
    /*******************************/
    const isInternetAccess = () => {
        if (process.client) {
            setInterval(async () => {
                const isFound = navigator.onLine;
                isOnline.value = isFound;
            }, 1)
        }
    }
    isInternetAccess();
})
</script>

<style scoped>
.battery {
    background: #3dea3d;
}

.routes:hover {
    color: black;
}
</style>