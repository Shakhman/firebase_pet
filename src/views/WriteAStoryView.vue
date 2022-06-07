<template>
  <div class="register">
    <n-h1>
      <n-text type="primary">
        Write A Story
      </n-text>
    </n-h1>
    <StoryForm @submit="onSubmit"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import StoryForm from '@/components/StoryForm.vue';
import useStoryStore from '@/store/story';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'WriteAStory',
  components: {
    StoryForm,
  },
  setup() {
    const store = useStoryStore();
    const router = useRouter();

    const onSubmit = (form: any) => {
      store.create(form).then(() => {
        router.push({ name: 'my-stories' });
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
