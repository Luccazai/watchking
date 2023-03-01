import { auth, db } from '@/includes/firebase';
import {
  createUserWithEmailAndPassword, updateProfile,
  signInWithEmailAndPassword, signOut,
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

export default {
  state: {
    isUserLoggedIn: false,
  },
  getters: {
    isUserLoggedIn: (state) => state.isUserLoggedIn,
    getUserID: () => auth.currentUser.uid,
  },
  mutations: {
    toggleAuthState(state) {
      state.isUserLoggedIn = !state.isUserLoggedIn;
      console.log('Logged: ', state.isUserLoggedIn);
    },
  },
  actions: {
    async register({ dispatch }, payload) {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password,
      );

      await setDoc(doc(db, 'users', userCred.user.uid), {
        name: payload.name,
        email: payload.email,
        uid: userCred.user.uid,
      });

      await updateProfile(auth.currentUser, {
        displayName: payload.name,
      });

      dispatch('login', payload);
    },

    async login({ commit }, payload) {
      await signInWithEmailAndPassword(
        auth,
        payload.email,
        payload.password,
      );

      commit('toggleAuthState');
      console.log(auth.currentUser);
      window.location.reload();
    },

    init_login({ commit }) {
      const user = auth.currentUser;

      if (user) {
        commit('toggleAuthState');
      }
    },

    async logout({ commit }) {
      await signOut(auth);
      commit('toggleAuthState');
      window.location.reload();
      this.$router.push('/');
    },
  },
};
