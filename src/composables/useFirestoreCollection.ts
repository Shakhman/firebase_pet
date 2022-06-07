import { ref, watchEffect } from 'vue';
import {
  collection, onSnapshot, query, where, WhereFilterOp,
} from 'firebase/firestore';
import db from '@/firebase';

export default (c: string, q?: [string, WhereFilterOp, string]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const documents = ref<any[]>([]);

  let colRef = collection(db, c);

  if (q) {
    colRef = query(colRef, where(...q)) as any;
  }

  const unsub = onSnapshot(colRef, (snapshot) => {
    const results: any[] = [];

    snapshot.docs.forEach((d) => {
      results.push({ ...d.data(), id: d.id });
    });

    documents.value = results;
  });

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return documents;
};
