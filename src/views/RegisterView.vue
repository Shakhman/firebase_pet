<template>
  <div class="register">
    <n-h1>
      <n-text type="primary">
        Register
      </n-text>
    </n-h1>

    <RegisterForm @submit="onSubmit" btn-text="Register" ref="form"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RegisterForm from '@/components/RegisterForm.vue';
import useUserStore from '@/store/user';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    RegisterForm,
  },
  setup() {
    const store = useUserStore();
    const router = useRouter();

    const onSubmit = (form: any) => {
      store.register(form).then(() => {
        router.push({ name: 'home' });
      });
    };

    return {
      onSubmit,
    };
  },
});
</script>

<style lang="scss" scoped>
.register {
  padding-top: 30px;
}
</style>
