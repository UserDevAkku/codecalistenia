<script setup>
import { ref, watch } from 'vue';
const api = useNuxtApp().$axios;
import { useRouter } from 'vue-router';
const router = useRouter();
import countriesFlags from '~/countries-data-api/countriesFlags.js';

const flag = ref(null);
const Tasks = ref({ edit: false, delete: false, view: false });

const props = defineProps({
  userdata: Object,
  selectedUserId: Object,
  isVerifyDialog: { type: Boolean, default: false },
  isUserVerified: { type: Boolean, default: false },
  userDeleted: { type: Boolean, default: false },
});

if (process.client) {
  if (props.userdata?.country) {
    flag.value = `https://flagsapi.com/${countriesFlags[props.userdata.country]}/shiny/64.png`
  }
}

const emits = defineEmits(['update:isVerifyDialog', 'update:selectedUserId', 'update:userDeleted']);

const verify_user = () => {
  emits('update:isVerifyDialog', true);
  emits('update:selectedUserId', props.userdata.id);
}

const EditUser = () => {
  Tasks.value.edit = true;
  verify_user();
}

const DeleteUser = async () => {
  Tasks.value.delete = true;
  verify_user();
}

watch(() => props.isUserVerified === true, async () => {
  if (Tasks.value.edit === true) {
    router.push(`/verified-user/${props.userdata.id}`);
    return;
  }
  if (Tasks.value.delete === true) {
    if (process.client) {
      const { data } = await api.delete(`delete/${props.userdata.id}`);
      if (data.success === true) {
        emits('update:userDeleted', true);
        emits('update:selectedUserId', props.userdata.id);
      }
      return alert('user deleted');
    }
  }
  if (Tasks.value.view === true) {
    ViewUser();
  }
})
</script>
