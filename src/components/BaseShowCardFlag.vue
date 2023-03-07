<script>

import { auth } from '@/includes/firebase';

export default {
  name: 'BaseShowCardFlag',
  props: {
    showIDProp: String,
  },
  data() {
    return {
      isOnWatchlist: false,
      isWatched: false,
      docID: '',
    };
  },
  methods: {
    async manageWatchlist() {
      if (!this.$store.getters.isUserLoggedIn) {
        return;
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
        } catch (err) {
          console.log(err);
        }
        return;
      }

      if (this.isOnWatchlist && !this.isWatched) {
        try {
          await this.$store.dispatch('markAsWatched', this.docID);
          this.isWatched = true;
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
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
  async created() {
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
      }

      if (isOnList[0].watched) {
        this.isWatched = true;
      }
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<template>
  <div>
    <button type="button" @click.prevent="manageWatchlist">
      <span class="fa-stack text-xl">
        <i
        class="fa-solid fa-bookmark fa-stack-2x"
        :class="{
          'text-primaryColor': !isOnWatchlist,
          'text-yellow-400': !isWatched && isOnWatchlist,
          'text-cyan-400': isWatched && isOnWatchlist,
          }" >
        </i>
        <i
        class="fa-solid fa-stack-1x fa-inverse"
        :class="{
          'fa-plus': !isOnWatchlist,
          'fa-eye': !isWatched && isOnWatchlist,
          'fa-check': isWatched && isOnWatchlist,
          }">
      </i>
      </span>
    </button>
  </div>
</template>
