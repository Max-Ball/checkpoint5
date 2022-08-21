<template>
  <div class="col-md-12">
    <div class="card my-4 elevation-4">
      <div class="card-body d-flex pb-1">
        <div class="pe-3">
          <img class="profile-pic" :src="account.picture" alt="profile image" height="75" width="75">
        </div>
        <form @submit.prevent="handleSubmit()">
          <textarea class="container-fluid" name="body" placeholder="Write here to create a post" cols="80" rows="4"
            v-model="editable.body"></textarea>
          <div class="d-flex justify-content-between align-items-end m">
            <i class="mdi mdi-image-multiple f-20" data-bs-toggle="collapse" data-bs-target="#image-collapse"
              role="button" aria-expanded="false" aria-controls="image-collapse">
              <span class="fs-6 px-1 text-dark">Add Image/Video</span>
            </i>
            <button class="btn btn-outline btn-border">
              <div class="selectable d-flex align-items-end" type="submit">
                <i class="mdi mdi-send f-20 send">
                </i>
                <span class="fs-6">Post</span>
              </div>
            </button>
          </div>
          <div class="collapse" id="image-collapse">
            <div class="card card-body">
              <input type="text" placeholder="add an image" v-model="editable.imgUrl" />
            </div>
          </div>
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
          editable.value = {}
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
.send {
  transform: rotate(-45deg);
}

.btn-border:hover {
  border: none !important;
}

.profile-pic {
  border-radius: 50%;
  border: 2px solid #3a5a40;
}
</style>