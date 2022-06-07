import { defineStore } from 'pinia';
import {
  getAuth, createUserWithEmailAndPassword, onAuthStateChanged,
  signOut, signInWithEmailAndPassword, updateProfile,
} from 'firebase/auth';
import {
  collection, addDoc,
} from 'firebase/firestore';
import db from '@/firebase';

import useLocalStorage from '@/composables/useLocalStorage';

const { item: userId } = useLocalStorage('user_id');

const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      name: '',
      email: '',
      uid: '',
    },
  }),
  getters: {
    isAuth: () => !!userId.value,
  },
  actions: {
    async register({ email, password, name }: any) {
      try {
        const auth = getAuth();
        const { item } = useLocalStorage('user_id');
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        this.user = { name: '', email: user.email as string, uid: user.uid };
        item.value = user.uid;
        const colRef = collection(db, 'userProfiles');
        await addDoc(colRef, {
          name,
          user_id: item.value,
        });
        return Promise.resolve(this.user);
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async signIn({ email, password }: any) {
      try {
        const auth = getAuth();
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        this.user = { name: '', email: user.email as string, uid: user.uid };
        userId.value = user.uid;
        return Promise.resolve(this.user);
      } catch (e) {
        console.log(e);
        return Promise.reject(e);
      }
    },
    async signOut() {
      try {
        const auth = getAuth();
        await signOut(auth);
        userId.value = null;
      } catch (e) {
        console.log(e);
      }
    },
    setUserData({ email, uid }: any) {
      this.user.email = email;
      this.user.uid = uid;
    },
    async onAuthStateChanged() {
      const auth = getAuth();

      return onAuthStateChanged(auth, (user) => {
        if (user) {
          userId.value = user.uid;
          this.setUserData({ email: user.email, uid: user.uid });
        } else {
          this.$reset();
          userId.value = null;
        }

        return user;
      });
    },
  },
});

export default useUserStore;
