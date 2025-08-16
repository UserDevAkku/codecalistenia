<template>
    <q-dialog v-model="props.isVerifyDialog" persistent>
        <q-card class="bg-white q-pa-sm" style="width:300px;box-shadow:0 0 10px 0px #000">
            <p class="text-h7 text-center text-capitalize text-black text-bold">User Verification</p>
            <q-input class="q-my-sm" v-model="formdata.uid" placeholder="User Id" dense hide-bottom-space :rules="[
                val => !!val || 'User Id is required',
            ]" maxlength="9">
                <template v-slot:prepend>
                    <Icon color='black' icon="mdiAccount" />
                </template>
            </q-input>
            <q-input class="q-my-sm" v-model="formdata.password" placeholder="Password" dense hide-bottom-space :rules="[
                val => !!val || 'password is required',
            ]">
                <template v-slot:prepend>
                    <Icon color='black' icon="mdiLock" />
                </template>
            </q-input>

            <q-card-actions class="row justify-between">
                <q-btn size="12px" class="shadow-2 q-my-sm bg-red q-my-sm text-white" label="Close" :flat="false" dense
                    @click="closeDialog" />
                <q-btn size="12px" class="shadow-2 bg-blue q-my-sm text-white" :flat="false" label="submit" dense
                    @click="Verify_User"></q-btn>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>


<script setup>

const id = ref('');
import { ref, watch } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
const router = useRouter();
const $q = useQuasar();
let invalid = ref({ error: '' });
let valid = ref({ success: '' });
const axios = useNuxtApp().$axios;
const props = defineProps({
    isVerifyDialog: { type: Boolean, default: false },
    isUserVerified: {
        type: Boolean,
        default: false,
    },
    selectedUserId: Object,
});
const errorNotify = (invalid) => {
    $q.notify({
        message: invalid.value.error,
        color: 'negative',
        position: 'top',
        icon: 'error',
        timeout: 3000, // 3 seconds
    });
}
const successNotify = (valid) => {
    $q.notify({
        message: valid.value.success,
        color: 'positive',
        position: 'top',
        icon: 'check_circle',
        timeout: 2000, // 3 seconds
    });
}

const formdata = ref({
    uid: null,
    password: null,
});
const resetFormdata = () => {
    formdata.value = { uid: null, password: null };
};
const emits = defineEmits(['update:isVerifyDialog', 'update:isUserVerified']);
//close dialog
const closeDialog = () => {
    emits('update:isVerifyDialog', false);
    resetFormdata();
}

//update user data 
const Verify_User = async () => {
    if (formdata.value) {
        if (!formdata.value.uid) {
            invalid.value.error = "User Id is required";
            errorNotify(invalid);
            return;
        } else if (!formdata.value.password) {
            invalid.value.error = "password is required";
            errorNotify(invalid);
            return;
        }
        try {
            const { data } = await axios.post(`verifyUser/${props.selectedUserId}`, formdata.value);
            if (data.success === true) {
                emits('update:isUserVerified', true);
                emits('update:isVerifyDialog', false);
                resetFormdata();
                return;
            } else {
                invalid.value.error = data.message;
                errorNotify(invalid);
                return;
            }
        } catch (error) {
            invalid.value.error = error;
            errorNotify(invalid);
        }
    }
    else
    {
        invalid.value.error = "Input Fields can't be empty";
        errorNotify(invalid);
    }
}

</script>