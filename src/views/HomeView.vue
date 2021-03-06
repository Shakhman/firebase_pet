<template>
  <div>
    <n-h1>
      <n-text type="primary">
        All Stories
      </n-text>
    </n-h1>
    <div id="my-cards">
    <n-card size="huge" v-for="story in stories" :key="story.id"
      class="card">
      <template #header>
        <div>
          {{ story.title }}
        </div>
      </template>
      <div>
        {{ story.text }}
      </div>
      <template #footer>
        <div class="flex-inline">
          <n-tag type="success" v-for="(tag, k) in story.tags" :key="k">
            {{ tag }}
          </n-tag>
        </div>
        <div class="author">
          Written by {{ story.author }}
        </div>
      </template>

      <template #action>
        <div class="flex-inline">
          <n-button>View</n-button>
        </div>
      </template>
    </n-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import useStoryStore from '@/store/story';
import { storeToRefs } from 'pinia';
import useFirestoreCollection from '@/composables/useFirestoreCollection';

export default defineComponent({
  name: 'HomeView',
  setup() {
    const userProfiles = useFirestoreCollection('userProfiles');
    const store = useStoryStore();
    store.getAllStories();

    const { stories } = storeToRefs(store);

    const compStories = computed(() => stories.value.map((story: Record<string, any>) => {
      const targetUserProfile = userProfiles.value.find((u) => u.user_id === story.user_id);
      return {
        ...story,
        author: targetUserProfile ? targetUserProfile.name : 'Unknowing user',
      };
    }));

    return {
      stories: compStories,
      userProfiles,
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

.author {
  font-size: 12px;
  text-align: left;
  color: gray;
}
</style>
