<template>
  <q-layout view="hHh Lpr lff" container style="height: 100vh" class="shadow-2 bg-black">
    <q-header>
      <q-toolbar class='gap-1'>
        <q-btn no-caps label="Home" icon="home" class="bg-black  text-white text-h7 shadow-4" @click="goToHome"></q-btn>
        <q-btn no-caps label="Home" icon="home" class="bg-black text-white text-h7 shadow-4" @click="logout_fn"></q-btn>
        <q-space />
        <q-input v-model="searchValue" @blur="searchUser" placeholder="Search user by ID" color="grey" borderless dense
          class="bg-white q-pl-sm q-ma-md">
          <template v-slot:prepend>
            <Icon icon="mdiAccount" />
          </template>
        </q-input>
        <q-btn no-caps label="Create" icon="add" class="bg-black text-white text-h7 shadow-4"
          @click="createUser"></q-btn>
      </q-toolbar>
    </q-header>
    <div class="row q-px-lg text-h5 text-center q-pa-sm text-uppercase bg-cyan">
      <q-space />
    </div>
    <q-page-container class="row">
      <q-page class="q-pl-sm">
        <div class="row col-md-12 q-pl-lg">
          <User v-for="user in users" :key="user.id" :userdata="user" :isVerifyDialog="isVerifyDialog"
            @update:isVerifyDialog="OpenVerifyDialog" :isUserVerified="isUserVerified" :selectedUserId="selectedUserId"
            @update:selectedUserId="handleselectedUserId" :userDeleted="userDeleted"
            @update:userDeleted="handledeleteUser" />
          <!-- <User  v-for="user in users" :key="user.id" :userdata="user" @deleteUser="handledeleteUser"
              :editUser="editUser" @update:editUser="isEditUser = true" :selectedUser="selectedUser"
              @update:selectedUser="handleSelectedUserdata"/> -->
        </div>
      </q-page>
    </q-page-container>
    <div class="row justify-center q-pa-lg">
      <q-pagination v-if="isUserHave === true" v-model="current" :max="5" input input-class="text-orange-10" />
    </div>
    <VerifyUser :isVerifyDialog="isVerifyDialog" @update:isVerifyDialog="CloseVerifyDialog"
      :isUserVerified="isUserVerified" @update:isUserVerified="handleisUserVerified" :selectedUserId="selectedUserId" />
    <CreateUser :isCreateDialog="isCreateDialog" @update:isCreateDialog="handleCreateDialog" :isUserId="isUserIdcopied"
      @update:isUserId="handleCopyId" />
    <!-- <EditeUser :selectedUser="selectedUser" :editUser="isEditUser" @update:editUser="isEditUser = true"
        @closeDialog="handleCloseDialog" :updatedUsers="updatedUsers" @update:updatedUsers="Handleupdatedusers" /> -->
  </q-layout>
</template>
<createUser />
<script setup>
// const logout_fn=()=>{
//   cookie.value=null;
//   alert('user logged out');
//   navigateTo('/auth/login');
// }
// 
// import { useRouter } from 'vue-router';
// import { useCookie } from '#app';
// const cookie = useCookie('token');
// const router = useRouter();
const api = useNuxtApp().$axios;
import { ref, watch, computed } from 'vue'
const users = ref([]);
let searchValue = ref('');
const isUserVerified = ref(false);
const userDeleted = ref(false);
const selectedUserId = ref({});
const isCreateDialog = ref(false);
const handleCreateDialog = (updatedValue) => {
  isCreateDialog.value = updatedValue;
}
const isVerifyDialog = ref(false);
const OpenVerifyDialog = (updatedValue) => {
  isVerifyDialog.value = updatedValue;
}
const CloseVerifyDialog = (updatedValue) => {
  isVerifyDialog.value = updatedValue;
}
const handleisUserVerified = (updatedValue) => {
  isUserVerified.value = updatedValue;
}
const handleselectedUserId = (updatedValue) => {
  selectedUserId.value = updatedValue;
}

const current = ref('1');
const drawerLeft = ref(false);
const drawerRight = ref(false);
// const users = ref([]); 
// Reactive array to hold users
const isUserHave = ref(false);

const handleCopyId = (updatedValue) => {
  isUserIdcopied.value = updatedValue;
}
const createUser = () => {
  isCreateDialog.value = true;
}

const props = defineProps({
  userdata: Object,
  editUser: { type: Boolean, default: false }
});

const handledeleteUser = (updatedValue) => {
  userDeleted.value = updatedValue;
  if (userDeleted.value === true && selectedUserId.value != null) {
    users.value = users.value.filter((user) => {
      return user.id != selectedUserId.value;
    })
  }
}
const handleCloseDialog = (updatedValue) => {
  isEditUser.value = updatedValue;
}
//updated users changes
const Handleupdatedusers = (UpdatedUsersData) => {
  updatedUsers.value = UpdatedUsersData;
  users.value = updatedUsers.value;
}

const handleSelectedUserdata = (selectedUserData) => {
  selectedUser.value = selectedUserData;
}
// const deletedUserStatus = (userDeleted) => {
// }
// watch(() => userDeleted.value, () => {
//   deletedUserStatus(userDeleted);
// })

// const searchUser = () => {
//   users.value = users.value.filter((user) => {
//     return user.uid === searchValue.value;
//   })

// }

// const updateArray = () => {

//   users.value=props.userdata;
//   // if (props.userdata) {
//   //   const searchValue = ref('6');
//   //   userFound.value = props.userdata.filter((userdata) =>
//   //     Object.values(userdata).some(value => value.toString() === searchValue.value)
//   //   );
//   //   props.userdata = userFound.value;
//   // }
//   // else {
//   //   return user;
//   // }
// };


const getAllusers = async () => {
  const { data } = await api.get('users');
  users.value = data;
}
watch(() => isCreateDialog.value === false, async () => {
  await getAllusers();

})

onMounted(async () => {
  await getAllusers();
})

const goToHome = () => {
  navigateTo('/');
  cookie.value = null;

}

watch(() => searchValue.value, () => {

})
</script>