import { defineStore } from 'pinia';
import {
  collection, addDoc, deleteDoc, doc, updateDoc,
} from 'firebase/firestore';
import useLocalStorage from '@/composables/useLocalStorage';
import useFirestoreCollection from '@/composables/useFirestoreCollection';
import db from '@/firebase';

const useStoryStore = defineStore('story', {
  state: () => ({
    myStories: [],
    stories: [],
  }),
  getters: {
  },
  actions: {
    getMyStories() {
      const { item } = useLocalStorage('user_id');
      const result = useFirestoreCollection('stories', ['user_id', '==', item.value]);

      this.myStories = result as any;
    },
    getAllStories() {
      const result = useFirestoreCollection('stories');

      this.stories = result as any;
    },
    async updateStory(data: any) {
      try {
        const colRef = doc(db, 'stories', data.id);
        const response = await updateDoc(colRef, data);
        return Promise.resolve(response);
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async deleteStory(storyId: string) {
      try {
        const colRef = doc(db, 'stories', storyId);
        const response = await deleteDoc(colRef);
        return Promise.resolve(response);
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async create(data: any) {
      try {
        const { item } = useLocalStorage('user_id');
        const colRef = collection(db, 'stories');
        const response = await addDoc(colRef, {
          ...data,
          user_id: item.value,
        });
        console.log(response);
        return Promise.resolve(response);
      } catch (e) {
        return Promise.reject(e);
      }
    },
  },
});

export default useStoryStore;
