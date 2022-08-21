<template>
  <div class="card elevation-4 text-center text-dark my-4">
    <div class="card-body p-2">
      <img class="img-fluid" :src="ad.square" alt="">
      <h4>
        Click <a class="selectable" :href="ad.linkUrl">here</a> to check out {{ ad.title }}!!
        {{ ad.linkUrl }}
      </h4>
    </div>
  </div>
</template>



<script>
import { computed } from '@vue/reactivity';
import { Ad } from '../models/Ad';

export default {
  props: {
    ad: { type: Ad, required: true }
  },
  setup() {

    return {
      ads: computed(() => AppState.ads)
    };
  },
};
</script>



<style>
</style>