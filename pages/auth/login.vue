<template>
    
</template>
<script setup>
import { navigateTo } from 'nuxt/app';
import { useQuasar } from 'quasar';
import { ref } from 'vue';

const props = defineProps({
    IsModeApplied: Boolean,
})
const hide = ref({
    status: true,
});
const api = useNuxtApp().$axios;
const spinner = ref(false);
const formdata = ref({
    email: '',
    password: '',
})

const $q = useQuasar();

const Isvalid = ref({
    errMsg: '',
    succMsg: '',
    status: null
})

const notify = () => {
    $q.notify({
        message: Isvalid.value.status ? Isvalid.value.succMsg : Isvalid.value.errMsg,
        position: 'top',
        color: Isvalid.value.status ? 'positive' : 'negative',
        icon: Isvalid.value.status ? 'check_circle' : 'warning',
        timeout: '1000',
        iconSize: '30px',
        classes: 'max-w-[60%] text-bold text-center text-[15px] font-sans shadow-0 font-300 pa-1  rounded-3xl',

    })
}
//sleep helper to delay the action here ex: api delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
//close

const login_fn = async () => {
    try {
        if (formdata.value) {
            if (!formdata.value.email) {
                return notify(Isvalid.value.status = false, Isvalid.value.errMsg = 'Email is required');
            }
            else if (!formdata.value.password) {
                return notify(Isvalid.value.status = false, Isvalid.value.errMsg = 'Password is required');
            }
            hide.value.status = false
            emits('update:spinner', true);
            await sleep(2000);
            const { data } = await api.post('login', formdata.value)
            if (data.success === true) {
                navigateTo('/auth/users')
                return notify(Isvalid.value.status = true, Isvalid.value.succMsg = data.message);
            }
            else {
                hide.value.status = true
                emits('update:spinner', false);
                return notify(Isvalid.value.status = false, Isvalid.value.errMsg = data.message);
            }
        }
    }
    catch (error) {
        return notify(Isvalid.value.status = false, Isvalid.value.errMsg = data.message);
    }
}
const signup_fn = () => {
    navigateTo('/auth/signup');
}

const IsPassVisible = ref(true);

const IsStatus = ref({
    email: {
        err: null,
        Visibility: null,
        icon: null,
        wrong: null,
        correct: null,
        check: null,
        status: null,
    },
    password: {
        err: null,
        Visibility: null,
        icon: null,
        correct: null,
        wrong: null,
    }
})
const validation_fn = async (field) => {
    const fields = {
        email: "Email is required",
        password: "Password is required",
    }

    if (field in fields) {
        if (!formdata.value[field]) {
            IsStatus.value[field].Visibility = true;    // Show the error message UI for this field
            IsStatus.value[field].err = fields[field];  // Set the error message text
            IsStatus.value[field].wrong = true;          // Mark this field as wrong/invalid (could be used for styling)
        } else {
            IsStatus.value[field].Visibility = false;   // Hide the error message UI
        }
    }

    if (field === 'password') {

        /* Credentials Validation */
        if (formdata.value.email) {
            const { data } = await api.post('validation', formdata.value);
            if (!data.success && data.emailErr) {
                IsStatus.value.email.status = true;
                IsStatus.value.email.Visibility = true;
                IsStatus.value.email.err = data.message;
                IsStatus.value.email.wrong = true;
                formdata.value.password = null;
            }
            else if (data.success && formdata.value.password) {
                IsStatus.value.password.Visibility = false;
            }
            else if (!data.success && formdata.value.password) {
                IsStatus.value.password.Visibility = true;
                IsStatus.value.password.wrong = true;
                IsStatus.value.email.status = true;

                IsStatus.value.password.err = data.message;
            }
        }
    }
}
</script>