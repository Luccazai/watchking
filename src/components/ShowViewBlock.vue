<script>
export default {
  name: 'BaseShowViewBlock',
  props: {
    fieldName: String,
    fieldValue: [Number, String, Object],
    fieldCurrency: String,
  },
  methods: {
    getType() {
      console.log(this.fieldName, typeof this.fieldValue);
      return (typeof this.fieldValue);
    },
  },
};
</script>

<template>
  <template v-if="getType() === 'string'">
    <div class="grid grid-cols-2 w-full md:w-3/4 my-5">
      <div class="flex items-center justify-center">
        <p class="md:text-xl text-complementaryColor font-semibold text-center">
          {{ fieldName }}
        </p>
      </div>
      <div class="col-span-1 my-2">
        <p class="text-center">
          {{ fieldValue }}
        </p>
      </div>
    </div>
  </template>
  <template v-if="getType() === 'number'">
    <div class="grid grid-cols-2 w-full md:w-3/4 my-5">
      <div class="flex items-center justify-center">
        <p class="md:text-xl text-complementaryColor font-semibold text-center">
          {{ fieldName }}
        </p>
      </div>
      <div class="col-span-1 my-2">
        <p class="text-center" v-if="fieldCurrency">
          {{ $n(fieldValue, 'decimal', 'en') }} {{ fieldCurrency }}
        </p>
        <p class="text-center" v-if="!fieldCurrency">
          {{ fieldValue }}
        </p>
      </div>
    </div>
  </template>
  <template v-if="getType() === 'object'">
    <div class="grid grid-cols-2 my-5 w-full md:w-3/4">
      <div class="col-span-1 mx-auto">
        <p class="md:text-xl text-complementaryColor font-semibold">
          {{ fieldName }}
        </p>
      </div>
      <div class="col-span-1 flex justify-center items-center mx-auto flex-wrap">
        <router-link
        :to="{ name: 'genre', params: { genre: item } }"
        class="hover:text-complementaryColor mx-1
        transition duration-500 hover:font-semibold underline"
        v-for="(item) in fieldValue" :key="item">
          {{ item }}
        </router-link>
      </div>
    </div>
  </template>
</template>
