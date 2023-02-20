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
    <div class="col-span-2 flex justify-center items-center">
      <p class="md:text-xl text-complementaryColor font-semibold">
        {{ fieldName }}
      </p>
    </div>
    <div class="col-span-3 flex justify-center items-center">
      <p>
        {{ fieldValue }}
      </p>
    </div>
  </template>
  <template v-if="getType() === 'number'">
    <div class="col-span-2 flex justify-center items-center">
      <p class="md:text-xl text-complementaryColor font-semibold">
        {{ fieldName }}
      </p>
    </div>
    <div class="col-span-3 flex justify-center items-center">
      <p class="text-center" v-if="fieldCurrency">
        {{ $n(fieldValue, 'decimal', 'en') }} {{ fieldCurrency }}
      </p>
      <p class="text-center" v-if="!fieldCurrency">
        {{ fieldValue }}
      </p>
    </div>
  </template>
  <template v-if="getType() === 'object'">
    <div class="col-span-2 flex justify-center items-center">
      <p class="md:text-xl text-complementaryColor font-semibold">
        {{ fieldName }}
      </p>
    </div>
    <div class="col-span-3 flex justify-center items-center">
      <p class="text-center">
        <span v-for="(item) in fieldValue" :key="item">
          {{ item }}&nbsp;
        </span>
      </p>
    </div>
  </template>
</template>
