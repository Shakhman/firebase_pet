<template>
  <div class="register">
    <n-h1>
      <n-text type="primary">
        Sign In
      </n-text>
    </n-h1>

    <SignInForm @submit="onSubmit" btn-text="Sign In" ref="form"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SignInForm from '@/components/SignInForm.vue';
import useUserStore from '@/store/user';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    SignInForm,
  },
  setup() {
    const store = useUserStore();
    const router = useRouter();

    const onSubmit = (form: any) => {
      store.signIn(form).then(() => {
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
