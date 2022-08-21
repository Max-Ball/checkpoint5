<template>
  <div class="col-md-12 my-4">
    <div class="card">
      <div class="cover-img border rounded">
      </div>
      <div class="card-body">
        <div class="card-title d-flex justify-content-between border-bottom">
          <img class="profile-pic" :src="account.picture" alt="profile-picture" height="150" width="150">
          <h2>
            <p class="text-end" v-if="account.graduated">
              <i class="mdi mdi-account-school"></i>
            </p>{{ account.name }} <br>
            <h5 class="text-end">{{ account.class }}</h5>
          </h2>
        </div>
        <p>{{ account.bio }}</p>
        <div class="fs-5 d-flex justify-content-evenly">
          <a class="text-dark" :href="account.github" title="github">
            <i class="mdi mdi-github f-28"></i>
          </a>
          <a class="text-dark" :href="account.linkedin" title="linkedin">
            <i class="mdi mdi-linkedin f-28"></i>
          </a>
          <a class="text-dark" :href="account.resume" title="resume">
            <i class="mdi mdi-newspaper-variant-outline f-28"></i>
          </a>
          <a class="text-dark" href="https://www.gmail.com" title="email">
            <i class="mdi mdi-email f-28"></i>
          </a>
        </div>
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
      account: computed(() => AppState.account),
      cover: computed(() => `url(${AppState.account?.coverImg})`)
    };
  },
};
</script>



<style lang="scss" scoped>
.cover-img {
  height: 300px;
  background-position: center;
  background-size: cover;
  display: grid;
  place-content: center;
  color: aliceblue;
  background-image: v-bind(cover);
}

.profile-pic {
  border-radius: 50%;
  border: 3px solid #3a5a40;
  transform: translateY(-75px);
}
</style>