<template>
  <div class="col-md-10">
    <div class="card">
      <div class="card-body">
        <div>
          <img class="profile-pic" :src="account.picture" alt="profile image" height="50" width="50">
        </div>
        <form @submit.prevent="handleSubmit()">
          <textarea name="body" placeholder="Write here to create a post" cols="30" rows="10"
            v-model="editable.body">Christopher Walken</textarea>
          <input type="text" placeholder="add an image" v-model="editable.imgUrl" />
          <button class="btn btn-primary">{{ editable.id ? 'Save' : 'Create' }}</button>
        </form>
      </div>
    </div>
  </div>
</template>



<script>
import { computed } from '@vue/reactivity';
import { ref, watchEffect } from 'vue';
import { AppState } from '../AppState';
import { postsService } from '../services/PostsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
  setup() {
    const editable = ref({})
    watchEffect(() => {
      if (!AppState.activePost) { return }
      editable.value = { ...AppState.activePost }
    })

    return {
      editable,
      account: computed(() => AppState.account),
      async handleSubmit() {
        try {
          if (editable.value.id) {
            await postsService.editPost(editable.value)
          } else {
            await postsService.createPost(editable.value)
          }
        } catch (error) {
          logger.error('[handling a post submit]', error)
          Pop.error(error)
        }
      }
    };
  },
};
</script>



<style>
</style>