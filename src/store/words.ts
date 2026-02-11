import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  runTransaction,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../services/firebase';
import { normalizeWord, validateWord } from '../services/words/wordRules';

export type WordItem = { id: string; value: string };

type WordsApiError = { status: 'CUSTOM_ERROR'; data: string };

export const wordsApi = createApi({
  reducerPath: 'wordsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Words'],
  endpoints: (builder) => ({
    getWords: builder.query<WordItem[], void>({
      queryFn: async () => ({ data: [] }),
      async onCacheEntryAdded(_arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        await cacheDataLoaded;

        const wordsQuery = query(collection(db, 'words'));
        const unsubscribe = onSnapshot(
          wordsQuery,
          (snapshot) => {
            const words: WordItem[] = snapshot.docs.map((docSnap) => ({
              id: docSnap.id,
              value: String(docSnap.data().value ?? docSnap.id),
            }));

            updateCachedData((draft) => {
              draft.length = 0;
              draft.push(...words);
            });
          },
          (error) => {
            console.error('Firestore words snapshot error:', error);
          }
        );

        await cacheEntryRemoved;
        unsubscribe();
      },
      providesTags: ['Words'],
    }),

    addWord: builder.mutation<void, string>({
      async queryFn(input): Promise<{ data: void } | { error: WordsApiError }> {
        const validation = validateWord(input);
        if (!validation.ok) return { error: { status: 'CUSTOM_ERROR', data: validation.reason } };

        const word = validation.value;
        const wordRef = doc(db, 'words', word);

        try {
          await runTransaction(db, async (transaction) => {
            const existingDoc = await transaction.get(wordRef);
            if (existingDoc.exists()) {
              throw new Error('This word already exists.');
            }
            transaction.set(wordRef, { value: word, createdAt: serverTimestamp() });
          });

          return { data: undefined };
        } catch (e) {
          const message = e instanceof Error ? e.message : 'An unknown error occurred.';
          return { error: { status: 'CUSTOM_ERROR', data: message } };
        }
      },
      invalidatesTags: ['Words'],
    }),

    deleteWord: builder.mutation<void, string>({
      async queryFn(id): Promise<{ data: void } | { error: WordsApiError }> {
        const wordId = normalizeWord(id);
        if (!wordId) return { error: { status: 'CUSTOM_ERROR', data: 'Missing identifier.' } };

        try {
          await deleteDoc(doc(db, 'words', wordId));
          return { data: undefined };
        } catch (e) {
          const message = e instanceof Error ? e.message : 'An unknown error occurred.';
          return { error: { status: 'CUSTOM_ERROR', data: message } };
        }
      },
      invalidatesTags: ['Words'],
    }),
  }),
});

export const { useGetWordsQuery, useAddWordMutation, useDeleteWordMutation } = wordsApi;
