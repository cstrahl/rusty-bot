import type { DocumentReference } from '@google-cloud/firestore';

import type { DBGetFn, DBSetFn } from './types.js';

export function useGetFactory<T extends object>(
  refFactory: () => DocumentReference
): DBGetFn<T> {
  const docRef = refFactory();

  return async () => {
    const docSnapshot = await docRef.get();
    return (docSnapshot.data() as T | undefined) ?? null;
  };
}

export function useSetFactory<T extends object>(
  refFactory: () => DocumentReference
): DBSetFn<T> {
  const docRef = refFactory();

  return async (value: Partial<T>) => {
    await docRef.set({ ...value }, { merge: true });
  };
}
