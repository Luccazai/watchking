<script>

import { auth } from '@/includes/firebase';

export default {
  name: 'ShowViewWatchlistButton',
  data() {
    return {
      isOnWatchlist: false,
      isWatched: false,
      docID: '',
      buttonText: 'Add to Watchlist',
      buttonStyle: 'bg-primaryColor',
    };
  },
  methods: {
    async manageWatchlist() {
      if (!this.$store.getters.isUserLoggedIn) {
        this.$router.push('/login');
      }

      const requisition = {
        showID: this.showIDProp,
        userID: auth.currentUser.uid,
      };

      if (!this.isOnWatchlist) {
        try {
          const response = await this.$store.dispatch('addToWatchlist', requisition);
          this.docID = response.id;
          this.isOnWatchlist = true;
          this.buttonText = 'On Watchlist';
          this.buttonStyle = 'bg-yellow-400';
        } catch (err) {
          console.log(err);
        }
        return;
      }

      if (this.isOnWatchlist && !this.isWatched) {
        try {
          await this.$store.dispatch('markAsWatched', this.docID);
          this.isWatched = true;
          this.buttonText = 'Watched';
          this.buttonStyle = 'bg-cyan-400';
        } catch (err) {
          console.log(err);
        }
        return;
      }

      if (this.isOnWatchlist && this.isWatched) {
        try {
          await this.$store.dispatch('removeFromWatchlist', this.docID);
          this.isWatched = false;
          this.isOnWatchlist = false;
          this.buttonText = 'Add to Watchlist';
          this.buttonStyle = 'bg-primaryColor';
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
  async mounted() {
    if (!this.$store.getters.isUserLoggedIn) {
      return;
    }

    this.showIDProp = this.$route.params.id;

    const payload = {
      showID: this.showIDProp,
      userID: auth.currentUser.uid,
    };

    try {
      const isOnList = await this.$store.dispatch('isOnWatchlist', payload);

      if (isOnList.length === 0) {
        return;
      }

      if (isOnList.length > 0) {
        this.isOnWatchlist = true;
        this.docID = isOnList[0].docID;
        this.buttonStyle = 'bg-yellow-400';
        this.buttonText = 'On Watchlist';
      }

      if (isOnList[0].watched) {
        this.isWatched = true;
        this.buttonStyle = 'bg-cyan-400';
        this.buttonText = 'Watched';
      }
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<template>
  <div
  class="w-full flex justify-center items-center rounded-lg transition-colors duration-500"
  :class="buttonStyle" >
    <button
    type="button"
    @click.prevent="manageWatchlist"
    class="w-full h-full py-3">
      <p class="text-white font-semibold text-xl">
        {{ buttonText }}
      </p>
    </button>
  </div>
</template>
