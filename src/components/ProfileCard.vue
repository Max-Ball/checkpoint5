<template>
  <div class="post-card card my-3 elevation-3">
    <div class="card-body">
      <img class="profile-pic" :src="profile.picture" alt="profile image" height="60" width="60">
      <div class="ps-3">
        <h2 class="m-0">
          {{ profile.name }}
        </h2>
        <p v-if="profile.graduated">
          <i class="mdi mdi-account-school px-1"></i>
        </p>
      </div>

    </div>

  </div>
</template>



<script>

import { Profile } from '../models/Profile';

export default {
  props: {
    profile: { type: Profile, required: true }
  },

  setup() {

    return {

    };
  },
};
</script>



<style>
</style>