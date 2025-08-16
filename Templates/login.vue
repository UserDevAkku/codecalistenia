<template>
    <q-card class="grid gap-y-4 text-lg grid-cols-1 w-[40%] h-[100%] place-items-center">
        <p>Log in with Codecalistenia.</p>

        <p>Don't yet have an account?</p>

        <input type="text"
            class="w-[90%] p-2 ring-1 ring-gray-400 focus:ring-2 outline-0 focus:ring-offset focus:border focus:border-cyan-200 focus:ring-indigo-200 rounded-md" />

        <input type="password"
            class="w-[90%] p-2 ring-1 ring-gray-400 focus:ring-2 outline-0 focus:ring-offset focus:border focus:border-cyan-200 focus:ring-indigo-200 rounded-md" />



        <button class="place-self-center" type="button" @click="login_fn">Login
        </button>
    </q-card>
</template>