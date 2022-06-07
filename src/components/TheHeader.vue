<template>
  <div id="header">
    <div>
      <router-link :to="{name: 'home'}">
        <div class="logo">Logo</div>
      </router-link>
      <div class="main-nav" v-for="nav in navs" :key="nav.name">
        <n-button text @click="nav.onClick" v-if="nav.show">{{ nav.name }}</n-button>
      </div>
    </div>
    <div class="auth-btns">
      <template v-if="!isAuth">
          <n-button type="primary" @click="router.push('/sign-in')">
            Sign In
          </n-button>
          <n-button type="primary" secondary strong @click="router.push('/register')">
            Register
          </n-button>
      </template>
      <template v-else>
        <n-button type="primary" secondary strong @click="signOut">
            Sign out
        </n-button>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import useUserStore from '@/store/user';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'TheHeader',
  setup() {
    const store = useUserStore();
    const router = useRouter();
    const { isAuth } = storeToRefs(store);
    const navs = reactive([{
      name: 'Write a Story',
      onClick: () => {
        router.push({ name: 'story' });
      },
      show: isAuth,
    }, {
      name: 'My Stories',
      onClick: () => {
        router.push({ name: 'my-stories' });
      },
      show: isAuth,
    }]);

    return {
      navs,
      router,
      isAuth,
      signOut: store.signOut,
    };
  },
});
</script>

<style scoped lang="scss">
#header {
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  color: black;
  padding: 16px 20px;
  // position: fixed;
  width: 100%;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;

  .logo {
    display: inline-block;
    font-size: 18px;
    cursor: pointer;
  }

  .main-nav {
    margin-left: 100px;
    display: inline-flex;
    gap: 18px
  }

  .auth-btns {
    margin-right: 100px;
    display: inline-flex;
    text-align: right;
    gap: 18px
  }
}
</style>
