<template>
  <n-form id="story-form" :model="form">
    <n-form-item path="title" label="Title">
      <n-input placeholder="Title" v-model:value="form.title"></n-input>
    </n-form-item>
     <n-form-item>
        <n-input placeholder="Write your story"
          v-model:value="form.text"
          type="textarea"
          :autosize="{
            minRows: 10,
            maxRows: 15
          }">
        </n-input>
     </n-form-item>
    <n-form-item label="Tags" path="tags">
      <n-dynamic-tags v-model:value="form.tags" />
    </n-form-item>
    <n-button type="primary" size="large" class="story-btn"
      @click="onCreateStoryClick">
      Create a story
    </n-button>
  </n-form>
</template>

<script setup>
import {
  reactive, defineEmits, defineExpose,
} from 'vue';

const emit = defineEmits(['submit']);
const form = reactive({ title: '', text: '', tags: [] });
const onCreateStoryClick = () => {
  emit('submit', form);
};
const onUpdateLabel = (val) => {
  console.log(val);
};

defineExpose({
  form,
});
</script>

<style lang="scss" scoped>
#story-form {
  padding: 32px 25vw;
}

.story-btn {
  margin-top: 20px;
}
</style>
