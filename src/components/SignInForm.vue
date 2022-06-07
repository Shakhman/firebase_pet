<template>
  <n-form id="register-form" :model="form">
    <n-form-item path="email" label="Email">
      <n-input placeholder="Enter your email" v-model:value="form.email"></n-input>
    </n-form-item>
    <n-form-item path="password" label="Password">
      <n-input placeholder="Enter your password" v-model:value="form.password"
      type="password">
      </n-input>
    </n-form-item>
    <n-button type="primary" size="large" class="register-btn"
      @click="onRegisterClick">
      {{ props.btnText }}
    </n-button>
  </n-form>
</template>

<script setup>
import {
  reactive, defineEmits, defineProps, defineExpose,
} from 'vue';

const props = defineProps({
  btnText: String,
});

const emit = defineEmits(['submit']);
const form = reactive({ name: '', email: '', password: '' });
const onRegisterClick = () => {
  emit('submit', form);
};

defineExpose({
  form,
});
</script>

<style lang="scss" scoped>
#register-form {
  padding: 32px 25vw;
}

.register-btn {
  margin-top: 20px;
}
</style>
