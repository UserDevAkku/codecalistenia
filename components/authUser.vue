<script setup>
import { ref, watch } from 'vue';
import { copyToClipboard, useQuasar } from 'quasar';

const props = defineProps({
  copyID: { type: Boolean, default: false },
  userUid: [String, Object],
});
const emits = defineEmits(['closeDialog', 'update:copyID']);
const isCopied = ref(true);

const $q = useQuasar();
const valid = ref({ Status: '', msg: '' });

const closeDialog = () => {
  emits('closeDialog', false);
}

const showNotification = () => {
  $q.notify({
    message: valid.value.msg,
    color: valid.value.Status ? 'info' : 'negative',
    position: 'top',
    icon: 'check_circle',
    timeout: 1000,
  });
}

const copiedNotify = () => {
  if (!process.client) return; // SSR-safe
  isCopied.value = false;
  try {
    copyToClipboard(props.userUid);
    emits('update:copyID', false);
    valid.value.Status = true;
    valid.value.msg = "Id Copied";
    showNotification();
  } catch (error) {
    valid.value.Status = false;
    valid.value.msg = "Failed to copy the user Id";
    showNotification();
  }
}

watch(() => props.copyID, (val) => {
  if (val && props.userUid != null) {
    isCopied.value = true;
  }
})
</script>
