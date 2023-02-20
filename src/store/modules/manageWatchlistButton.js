import { db } from '@/includes/firebase';
import {
  addDoc, collection, where, getDocs, query,
  doc, updateDoc, deleteDoc,
} from 'firebase/firestore';

export default {
  actions: {
    async addToWatchlist(ctx, payload) {
      const response = await addDoc(collection(db, 'user-movie'), {
        userID: payload.userID,
        movieID: payload.showID,
        watched: false,
      });

      return response;
    },

    async isOnWatchlist(ctx, payload) {
      const q = query(
        collection(db, 'user-movie'),
        where('userID', '==', payload.userID),
        where('movieID', '==', payload.showID),
      );

      const queryResult = await getDocs(q);
      const resultReturn = [];

      queryResult.forEach((result) => {
        resultReturn.push({
          docID: result.id,
          ...result.data(),
        });
      });

      return (resultReturn);
    },

    async moviesOnWatchlist(ctx, payload) {
      const q = query(
        collection(db, 'user-movie'),
        where('userID', '==', payload),
      );

      const queryResult = await getDocs(q);
      console.log(queryResult);
      return queryResult;
    },

    async markAsWatched(ctx, payload) {
      const docReference = doc(db, 'user-movie', payload);
      await updateDoc(docReference, {
        watched: true,
      });
    },

    async removeFromWatchlist(ctx, payload) {
      const docReference = doc(db, 'user-movie', payload);
      await deleteDoc(docReference);
    },
  },
};
