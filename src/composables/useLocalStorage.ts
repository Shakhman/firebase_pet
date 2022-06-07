import { ref, watch } from 'vue';

export default (key: string) => {
  const init = localStorage.getItem(key);

  const variable = ref(init ? JSON.parse(init) : undefined);

  watch(
    () => variable.value,
    (val) => {
      if (val) {
        localStorage.setItem(key, JSON.stringify(val));
      } else {
        localStorage.removeItem(key);
      }
    },
  );

  return { item: variable };
};
