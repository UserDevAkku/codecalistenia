<template>
    <q-layout class="flex flex-center bg-white">
        <q-card v-if="isVisible === true" class="my-card  bg-white q-pa-sm" align="center">
            <q-img class="image-dimensions" :src="UserData.file" />
            <q-file class="q-ma-md " accept="image/*" v-model="formdata.file" dense hide-bottom-space
                label="Attachment " clearable :rules="[
                    val => !!val || 'File is required']">
                <template v-slot:prepend>
                    <Icon icon="mdiAttachment" />
                </template>
            </q-file>
            <q-btn size="12px" class="shadow-2 bg-blue q-my-lg text-white" :flat="false" label="Update" dense
                @click="update"></q-btn>
        </q-card>
    </q-layout>
</template>
<script setup>
import { onMounted } from 'vue';
import { useQuasar } from "quasar";
const $q = useQuasar();
const valid = ref({
    Status: '',
    msg: '',
});
//close dialog
const closeDialog = () => {
    emits('closeDialog', false);
}
const showNotification = () => {
    if (valid.value.Status === true) {
        $q.notify({
            message: valid.value.msg,
            color: 'positive',
            position: 'top',
            icon: 'check_circle',
            timeout: 1000,
        });
    }
    if (valid.value.Status === false) {
        $q.notify({
            message: valid.value.msg,
            color: 'negative',
            position: 'top',
            icon: 'check_circle',
            timeout: 1000,
        });
    }
}
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const isVisible = ref(false);
const UserData = ref({});
const api = useNuxtApp().$axios;
const user_id = route.params.id;
// const userData = route.state.userdata;
const formdata = ref({
    file: null,
});
const getUserdata = async () => {
    const { data } = await api.get(`user/${user_id}`);
    if (data.success === true) {
        UserData.value = data.user;
        console.log(UserData.value);
    }
    else {
        alert('user details fetching failed');

    }
}
onMounted(async () => {
    await getUserdata();
    if (UserData.value != null) {
        isVisible.value = true;
    }
})
const update = async () => {
    try {

        if (formdata.value) {
            const { data } = await api.post(`updateUser/${user_id}`, formdata.value, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            if (data.success === true) {
                UserData.value = data.user;
                router.push('/auth/users');
                return showNotification(valid.value.Status = true, valid.value.msg = data.message);
            }
            else {
                return showNotification(valid.value.Status = false, valid.value.msg = data.message);
            }
        }
        else
            return showNotification(valid.value.Status = false, valid.value.msg = 'File is required');

    }
    catch (error) {
        return showNotification(valid.value.Status = false, valid.value.msg = error);
    }

}


</script>
<style scoped>
.image-dimensions {
    width: 100%;
    height: 100%;
}

.my-card {
    width: 300px;
    height:400px;
}
</style>