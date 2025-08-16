<template>
    <div class="w-full sm:w-[70%] md:w-[60%] lg:w-[50%] flex flex-center">
        <q-card class="w-[90%] space-y-5 sm:space-y-4 md:space-y-4 lg:space-y-3 shadow-0 ">
            <p class="grid place-items-center text-2xl">
                <span class=" text-black text-center font-sans">Sign up with us.</span>
            </p>
            <p
                :class="[props.IsModeApplied === false ? 'text-black border-black' : ' text-white  border-white', 'rounded-tl-md  rounded-bl-md border-l-4 w-full font-sans  bg-gray-100 p-2 text-sm sm:text-sm md:text-base lg:text-base']">
                Already have an account?<label>
                    <a @click="login_fn"
                        :class="[props.IsModeApplied === false ? 'text-black' : 'text-white', 'font-sans']">
                        Log in here</a></label>
            </p>
            <label
                :class="[props.IsModeApplied === false ? 'text-[#595959]' : 'text-[#ffffff]', 'text-bold font-sans flex relative']">USERNAME
                <input @input="validation_fn('username')" placeholder="Username" type="text" v-model="formdata.username"
                    :class="[props.IsModeApplied === false ? 'text-black' : 'text-black', 'w-full ring-1 ring-gray-200 focus:ring-1  focus:ring-[#41fdfe] focus:ring-offset  rounded-md h-10 p-3 outline-0 placeholder:text-gray-400']" />
                <span v-if="IsStatus.username.Visibility" class="text-red gap-1 flex flex-center my-1">
                    <Icon size="1.2rem" color="red" icon="mdiAlertCircle" />
                    {{ IsStatus.username.err }}
                </span>

            </label>
            <label
                :class="[props.IsModeApplied === false ? 'text-[#595959]' : 'text-[#ffffff]', 'text-bold font-sans flex relative']">EMAIL
                <input @input="validation_fn('email')" placeholder="Email" type="text" v-model="formdata.email"
                    :class="[props.IsModeApplied === false ? 'text-black' : 'text-black', formdata.email ? 'bg-[#ffffff]' : 'bg-white', , 'w-full ring-1 ring-gray-200 focus:ring-1  focus:ring-[#41fdfe] focus:ring-offset rounded-md h-10 p-3 outline-0 placeholder:text-gray-400']" />
                <span v-if="IsStatus.email.Visibility" class="text-red gap-1 flex flex-center my-1">
                    <Icon size="1.2rem" color="red" icon="mdiAlertCircle" />
                    {{ IsStatus.email.err }}
                </span>
            </label>
            <label
                :class="[props.IsModeApplied === false ? 'text-[#595959]' : 'text-[#525252]', 'text-bold font-sans flex relative']">PASSWORD
                <input @input="validation_fn('password')" placeholder="Password"
                    :type="IsPassVisible ? 'password' : 'text'" v-model="formdata.password"
                    :class="[props.IsModeApplied === false ? 'text-black' : 'text-black', 'w-full ring-1 ring-gray-200 focus:ring-1  focus:ring-[#41fdfe] focus:ring-offset rounded-md h-10 p-3 outline-0 placeholder:text-gray-400']" />
                <span v-if="IsStatus.password.Visibility" class="text-red gap-1 flex flex-center my-1">
                    <Icon size="1.2rem" color="red" icon="mdiAlertCircle" />
                    {{ IsStatus.password.err }}
                </span>

                <Icon @click="IsPassVisible = false" v-if="IsPassVisible === true" color="black" size="1.3rem"
                    icon="mdiEye" class="absolute top-9 right-2" />
                <Icon @click="IsPassVisible = true" v-else-if="!IsPassVisible" color="black" size="1.3rem"
                    icon="mdiEyeOff" class="absolute top-9 right-2" />

            </label>
            <label
                :class="[props.IsModeApplied === false ? 'text-[#595959]' : 'text-[#525252]', 'text-bold font-sans flex relative']">CONFIRM
                PASSWORD
                <input @input="validation_fn('confirm_password')" placeholder="Confirm password"
                    :type="IsConfirmPassVisible ? 'password' : 'text'" v-model="formdata.confirm_password"
                    :class="[props.IsModeApplied === false ? 'text-black' : 'text-black', 'w-full ring-1 ring-gray-200 focus:ring-1  focus:ring-[#41fdfe] focus:ring-offset rounded-md h-10 p-3 outline-0 placeholder:text-gray-400']" />

                <span v-if="IsStatus.confirm_password.Visibility"
                    :class="[!IsStatus.confirm_password.correct ? 'text-red' : 'text-green', 'gap-1 flex flex-center my-1']">
                    <Icon v-if="!IsStatus.confirm_password.correct" size="1.2rem" color="red" icon="mdiAlertCircle" />
                    <Icon v-else-if="IsStatus.confirm_password.correct" size="1rem" color="green"
                        icon="mdiCheckCircle" />
                    {{ IsStatus.confirm_password.err }}
                </span>

                <Icon @click="IsConfirmPassVisible = false" v-if="IsConfirmPassVisible" color="black" size="1.3rem"
                    icon="mdiEye" class="absolute top-9 right-2" />
                <Icon @click="IsConfirmPassVisible = true" v-else-if="!IsConfirmPassVisible" color="black" size="1.3rem"
                    icon="mdiEyeOff" class="absolute top-9 right-2" />

            </label>

            <div class="flex flex-center">
                <AccountsGoogleLogin />
            </div>
            <button
                :class="[props.IsModeApplied === false ? 'focus:bg-blue-900' : 'focus:bg-blue-900', hide.status ? 'text-white' : 'text-blue-900', 'font-robto mx-auto  bg-blue-500 rounded-md text-sm sm:text-xl  md:text-lg lg:text-base h-8 ring-1 ring-gray-400 relative  flex flex-center w-[20%]']"
                type="button " @click="signup">Signup
                <div class="absolute">
                    <q-spinner-facebook v-if="spinner" color="white" size="1.4rem" />
                </div>
            </button>
        </q-card>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue';
const hide = ref({
    status: true,
});
const props = defineProps({
    IsModeApplied: Boolean
})
const spinner = ref(false);
import { useQuasar } from 'quasar';
const $q = useQuasar();
const api = useNuxtApp().$axios;
const formdata = ref({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
})
const Isvalid = ref({
    errMsg: '',
    succMsg: '',
    status: null
})

const notify = () => {
    $q.notify({
        message: Isvalid.value.status ? Isvalid.value.succMsg : Isvalid.value.errMsg,
        position: 'top',
        color: Isvalid.value.status || !props.IsModeApplied ? 'white' : 'black',
        icon: Isvalid.value.status ? 'check_circle' : 'error',
        timeout: '1000',
        textColor: Isvalid.value.status ? 'green' : 'red',
        iconColor: Isvalid.value.status ? 'green' : 'red',
        iconSize: '30px',
        classes: 'max-w-[60%] text-bold text-center text-[15px] font-sans shadow-0 font-300 pa-1  rounded-3xl',
    })
}
//sleep helper to delay the action here ex: api delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
//close
const signup = async () => {
    const { data } = await api.post('signup', formdata.value);
    if (data.success === true) {
        alert('success')
        navigateTo('/auth/login');
        return notify(Isvalid.value.status = true, Isvalid.value.succMsg = data.message);
    }
    // try {
    //     if (formdata.value) {
    //         if (!formdata.value.username) {
    //             return notify(Isvalid.value.status = false, Isvalid.value.errMsg = 'Username is required');
    //         }
    //         if (!formdata.value.email) {
    //             return notify(Isvalid.value.status = false, Isvalid.value.errMsg = 'Email is required');
    //         }
    //         else if (!formdata.value.password) {
    //             return notify(Isvalid.value.status = false, Isvalid.value.errMsg = 'Password is required');
    //         }
    //         else if (!formdata.value.confirm_password) {
    //             return notify(Isvalid.value.status = false, Isvalid.value.errMsg = 'Confirm Password is required');
    //         }
    //         else if (formdata.value.confirm_password !== formdata.value.password) {
    //             return notify(Isvalid.value.status = false, Isvalid.value.errMsg = "Password doesn't match");
    //         }
    //         hide.value.status = false;
    //         emits('update:spinner', true);
    //         await sleep(4000);
    //         const { data } = await api.post('signup', formdata.value);
    //         if (data.success === true) {
    //             navigateTo('/auth/login');
    //             return notify(Isvalid.value.status = true, Isvalid.value.succMsg = data.message);
    //         }
    //         emits('update:spinner', false);
    //         hide.value.status = true;
    //         return notify(Isvalid.value.status = false, Isvalid.value.errMsg = data.message);
    //     }
    // }
    // catch (error) {
    //     return notify(Isvalid.value.status = false, Isvalid.value.errMsg = data.message);
    // }
}
const login_fn = () => {
    navigateTo('/auth/login');
}

const IsPassVisible = ref(true);
const IsConfirmPassVisible = ref(true);

const IsStatus = ref({
    username: {
        err: null,
        Visibility: null,
    },
    email: {
        err: null,
        Visibility: null,
    },
    password: {
        err: null,
        Visibility: null,
    },
    confirm_password: {
        err: null,
        correct: null,
        Visibility: null,
    }
})
const validation_fn = (field) => {
    const fields = {
        username: "Username is required",
        email: "email is required",
        password: "password is required",
        confirm_password: "confirm_password is required"
    }
    if (field in fields) {
        if (!formdata.value[field]) {
            IsStatus.value[field].Visibility = true;
            IsStatus.value[field].err = fields[field];
        }
        else {
            IsStatus.value[field].Visibility = false;
        }
    }

    if (field === 'confirm_password') {
        if (formdata.value.password && formdata.value.confirm_password) {
            if (formdata.value.password || formdata.value.confirm_password) {
                if (formdata.value.confirm_password === formdata.value.password || formdata.value.password === formdata.value.confirm_password) {
                    IsStatus.value.confirm_password.Visibility = true;
                    IsStatus.value.confirm_password.correct = true;
                    IsStatus.value.confirm_password.err = "Password matched"
                }
                else {
                    IsStatus.value.confirm_password.Visibility = true;
                    IsStatus.value.confirm_password.err = "Password does not match"
                    IsStatus.value.confirm_password.correct = false;

                }
            }
        }
    }
}
</script>