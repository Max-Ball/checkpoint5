<template>
  <div class="card text-dark my-4">
    <div class="card-body">
      <div class="text-center my-5">
        <img class="profile-pic" :src="account.picture" alt="profile-pic">
      </div>
      <div class="border-bottom">
        <h3 class="m-0">
          {{ account.name }}
        </h3>
        <h6>
          {{ account.class }}
        </h6>
      </div>
      <div class="fs-5">
        <a class="text-dark" :href="account.github">
          <i class="mdi mdi-github f-28"></i> Max-Ball<br>
        </a>
        <i class="mdi mdi-linkedin f-28"></i> Linked {{ account.linkedin }}<br>
        <i class="mdi mdi-newspaper-variant-outline f-28"></i> Resume {{ account.resume }}

      </div>

    </div>
  </div>
</template>



<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState';

export default {

  setup() {

    return {
      account: computed(() => AppState.account)
    };
  },
};
</script>



<style>
</style>