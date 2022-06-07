<template>
  <div>
    <n-h1>
      <n-text type="primary">
        My Stories
      </n-text>
    </n-h1>
    <div id="my-cards">
    <n-card size="huge" v-for="story in myStories" :key="story.id"
      class="card">
      <template #header>
        <div contenteditable="true" @blur="((e) => story.title = e.target.textContent)">
          {{ story.title }}
        </div>
      </template>
      <div contenteditable="true" @blur="((e) => story.text = e.target.textContent)">
        {{ story.text }}
      </div>
      <template #footer>
        <div class="flex-inline">
          <n-tag type="success" v-for="(tag, k) in story.tags" :key="k">
            {{ tag }}
          </n-tag>
        </div>
      </template>

      <template #action>
        <div class="flex-inline">
          <n-button @click="deleteStory(story.id)">Delete</n-button>
          <n-button @click="updateStory(story)">Update</n-button>
        </div>
      </template>
    </n-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useStoryStore from '@/store/story';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'MyStories',
  setup() {
    const store = useStoryStore();
    store.getMyStories();

    const { myStories } = storeToRefs(store);

    return {
      myStories,
      deleteStory: store.deleteStory,
      updateStory: store.updateStory,
    };
  },
});
</script>

<style lang="scss" scoped>
#my-cards {
  padding: 32px 25vw;
}

.card {
  margin: 20px 0;
}

.flex-inline {
  display: inline-flex;
  gap: 5px;
}
</style>
