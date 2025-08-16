<template>
  <div>
    <AuthUser :copyID="copyID" @closeDialog="handleisIdcopied" :userUid="userUid" />
    <q-dialog v-model="props.isCreateDialog" persistent>
      <q-card class="my-card q-pa-md">
        <p class="text-subtitle1 text-center text-bold text-grey-8">Upload Your Details</p>
        <div class="row justify-evenly">
          <div class="col-12 col-md-6 q-gutter-md">
            <q-input v-model="formdata.username" label="Username" outlined dense filled :rules="[val => !!val || 'Username is required']" maxlength="12">
              <template v-slot:prepend>
                <Icon size="30px" color='black' icon="mdiAccount" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-6 q-gutter-md">
            <q-input v-model="formdata.uid" label="Id" outlined dense filled :rules="[val => !!val || 'user id is required']" maxlength="9">
              <template v-slot:prepend>
                <Icon size="30px" color='black' icon="mdiAccountKey" />
              </template>
            </q-input>
          </div>
        </div>
        <div class="row justify-evenly">
          <div class="col-12 col-md-6 q-gutter-md">
            <q-select v-model="formdata.gender" :options="genderOptions" outlined dense filled :rules="[val => !!val || 'Gender is required']" label="Gender " hide-dropdown-icon>
              <template v-slot:prepend>
                <Icon size="30px" color='black' icon="mdiHumanMale" />
              </template>
            </q-select>
          </div>
          <div class="col-12 col-md-6 q-gutter-md">
            <q-select v-model="formdata.category" :options="categoryOption" outlined dense hide-dropdown-Icon filled label="Category " clearable :rules="[val => !!val || 'Category is required']">
              <template v-slot:prepend>
                <Icon size="30px" color='black' icon="mdiSchool" />
              </template>
            </q-select>
          </div>
        </div>
        <div class="row justify-evenly">
          <div class="col-12 col-md-6 q-gutter-md">
            <q-select v-model="formdata.country" label="Country" :options="countriesOptions" outlined dense filled hide-dropdown-icon :rules="[val => !!val || 'Country is required']">
              <template v-slot:prepend>
                <img :src="flag" /><span></span>
              </template>
            </q-select>
          </div>
          <div class="col-12 col-md-6 q-gutter-md">
            <q-input v-model="formdata.phone_number" label="phone number" outlined dense filled :rules="[val => !!val || 'phone number is required']" maxlength="10">
              <template v-slot:prepend>
                <Icon color='black' size="30px" icon="mdiPhone" />
              </template>
            </q-input>
          </div>
        </div>
        <div class="row justify-evenly">
          <div class="col-12 col-md-6 q-gutter-md">
            <q-input v-model="formdata.password" label="Password" outlined dense filled :rules="[val => !!val || 'password is required']" maxlength="12">
              <template v-slot:prepend>
                <Icon size="30px" color='black' icon="mdiLock" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-6 q-gutter-md">
            <q-input v-model="confirm_Password" label="Confirm Password" outlined dense filled :rules="[val => !!val || 'confirm password is required', val => val === formdata.password || 'password does not match']" maxlength="12">
              <template v-slot:prepend>
                <Icon size="30px" color='black' icon="mdiLock" />
              </template>
            </q-input>
          </div>
        </div>
        <q-file class="q-px-sm" accept="image/*" v-model="formdata.file" outlined dense filled hide-bottom-space label="Attachment " clearable :rules="[val => !!val || 'File is required']">
          <template v-slot:prepend>
            <Icon size="30px" color='black' icon="mdiAttachment" />
          </template>
        </q-file>
        <q-card-actions class="row justify-between">
          <q-btn size="12px" class="shadow-2 q-my-sm bg-red q-my-sm text-white" label="Close" :flat="false" dense @click="closeDialog" />
          <q-btn size="12px" class="shadow-2 bg-blue q-my-sm text-white" :flat="false" label="submit" dense @click="upload_details"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import countriesNames from '~/countries-data-api/countriesNames.js';
import countriesFlags from '~/countries-data-api/countriesFlags.js';

const api = useNuxtApp().$axios;
const props = defineProps({ isCreateDialog: { type: Boolean, default: false } })
const emits = defineEmits(['update:isCreateDialog'])

import { useQuasar } from "quasar";
const $q = useQuasar();
let invalid = ref({ error: '' });
let valid = ref({ success: '' });

const errorNotify = (invalid) => {
  $q.notify({ message: invalid.value.error, color: 'negative', position: 'top', icon: 'check_circle', timeout: 3000 });
}
const successNotify = (valid) => {
  $q.notify({ message: valid.value.success, color: 'positive', position: 'top', icon: 'check_circle', timeout: 3000 });
}

const countriesOptions = ref(countriesNames);
const genderOptions = ref(['Male', 'Female']);
const categoryOption = ref(['Calisthenic', 'Yoga', 'Parkour']);

const formdata = ref({
  username: null,
  uid: null,
  gender: null,
  category: null,
  country: 'India',
  phone_number: null,
  file: null,
  password: null,
});
const confirm_Password = ref(null);

const flag = computed(() => `https://flagsapi.com/${countriesFlags[formdata.value.country]}/shiny/32.png`)

if (process.client) {
  watch(() => formdata.value.username, (newVal) => {
    if (newVal) {
      formdata.value.uid = `ID-${Math.floor(100000 + Math.random() * 900000)}`;
    }
  })
}

const userUid = ref({});
const copyID = ref(false);
const handleisIdcopied = (updatedValue) => { copyID.value = updatedValue }

const closeDialog = () => { emits('update:isCreateDialog', false) }

const upload_details = async () => {
  if (!formdata.value.username) return errorNotify({ error: 'Username is required' });
  if (!formdata.value.uid) return errorNotify({ error: 'Uid is required' });
  if (!formdata.value.gender) return errorNotify({ error: 'Gender is required' });
  if (!formdata.value.category) return errorNotify({ error: 'Category is required' });
  if (!formdata.value.country) return errorNotify({ error: 'Country is required' });
  if (!formdata.value.phone_number) return errorNotify({ error: 'Phone number is required' });
  if (!formdata.value.file) return errorNotify({ error: 'File is required' });
  if (!formdata.value.password) return errorNotify({ error: 'Password is required' });
  if (!confirm_Password.value) return errorNotify({ error: 'Confirm password is required' });
  if (confirm_Password.value !== formdata.value.password) return errorNotify({ error: 'Password does not match' });

  const { data } = await api.post('create', formdata.value, { headers: { 'Content-Type': 'multipart/form-data' } });
  if (data.isPhonenumberExists) return errorNotify({ error: 'Phone number already exists' });
  if (data.isUidExists) return errorNotify({ error: 'UID already exists' });

  if (data.success) {
    emits('update:isCreateDialog', false);
    valid.value.success = data.message;
    successNotify(valid);
    userUid.value = formdata.value.uid;
    copyID.value = true;
  }
}
</script>

<style scoped>
.my-card { width: 450px; }
.my-image { width: 100%; height: 100%; background-position: center; object-fit: contain; background-size: cover; }
</style>
