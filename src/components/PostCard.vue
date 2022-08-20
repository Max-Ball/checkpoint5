<template>
  <div class="post-card card my-3 elevation-3">
    <div class="card-body">
      <div v-if="post.creator.id == account.id">
        <i class="mdi mdi-delete selectable px-3" @click="deletePost(post.id)"></i>
      </div>
      <div class="row align-items-end">
        <div class="col-md-1">

          <router-link :to="{ name: 'Profile', params: { profileId: post.creator.id } }">
            <div>
              <img class="profile-pic" :src="post.creator.picture" alt="profile image" height="50" width="50">
            </div>
          </router-link>
        </div>
        <div class="col-md-11 px-4">
          <h4>
            {{ post.creator.name }}
          </h4>
          <p v-if="post.creator.graduated">
            <i class="mdi mdi-account-school"></i>
          </p>
        </div>
      </div>
      <div class="text-end">
        {{ new Date(post.createdAt).toLocaleDateString('en-US') }}
      </div>
      <div>
        {{ post.body }}
      </div>
      <img class="img-fluid" :src="post.imgUrl" alt="post image">
      <div v-if="post.likes == false" class="text-end p-1">
        <i class="mdi mdi-heart-outline f-50 selectable" @click="likePost(post.id)"></i>
        {{ post.likes.length }}
      </div>
      <div v-else class="text-end p-1">
        <i class="mdi mdi-heart f-50 selectable" @click="likePost(post.id)"></i>
        {{ post.likes.length }}
      </div>
    </div>
  </div>
</template>



<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState';
import { Post } from '../models/Post';
import { postsService } from '../services/PostsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
  props: {
    post: { type: Post, required: true }
  },

  setup(props) {

    return {
      account: computed(() => AppState.account),

      async deletePost() {
        try {
          const yes = await Pop.confirm('Delete this post?')
          if (!yes) { return }
          await postsService.deletePost(props.post.id)
        } catch (error) {
          logger.error('[deleting post]', error)
          Pop.error(error)
        }
      },

      async likePost() {
        try {
          await postsService.likePost(props.post.id)
        } catch (error) {
          logger.error('[liking post]', error)
          Pop.error(error)
        }
      }
    };
  },
};
</script>



<style>
.profile-pic {
  border-radius: 50%;
  border: 3px solid orange;
}
</style>