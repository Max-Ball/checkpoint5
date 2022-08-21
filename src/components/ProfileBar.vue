<template>
  <div class="card text-dark elevation-4 my-4">
    <div class="card-body">
      <router-link v-if="account.id" :to="{ name: 'Profile', params: { profileId: account.id } }">
        <div class="text-center my-3">
          <img class="profile-pic" :src="account.picture" alt="profile image" height="120" width="120">
        </div>
      </router-link>
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
import Login from './Login.vue';

export default {

  setup() {
    return {
      account: computed(() => AppState.account)
    };
  },
  components: { Login }
};
</script>



<style lang="scss" scoped>
.profile-pic {
  border-radius: 50%;
  border: 2px solid #3a5a40;
}

.profile-pic:hover {
  border: 3px solid #3a5a40;
}
</style>