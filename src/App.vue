<template>
  <TheHeader />
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useUserStore from '@/store/user';
import { mapActions } from 'pinia';
import TheHeader from './components/TheHeader.vue';

export default defineComponent({
  components: {
    TheHeader,
  },
  methods: {
    ...mapActions(useUserStore, ['setUserData', 'onAuthStateChanged']),
  },
  created() {
    this.onAuthStateChanged();
  },
});
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
