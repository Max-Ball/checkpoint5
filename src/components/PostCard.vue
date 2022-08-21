<template>
  <div class="post-card card my-3 elevation-4">
    <div class="card-body">
      <div class="text-end" v-if="post.creator.id == account.id">
        <div class="dropstart">
          <button class="btn btn-outline btn-border" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="mdi mdi-dots-horizontal f-20"></i>
          </button>
          <ul class="dropdown-menu">
            <li><i class="mdi mdi-delete fs-5 dropdown-item selectable" @click="deletePost(post.id)"></i>
            </li>
            <li><i class="mdi mdi-pencil fs-5 dropdown-item selectable"></i></li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 d-flex justify-content-start">
          <router-link :to="{ name: 'Profile', params: { profileId: post.creator.id } }">
            <div v-if="post.creator.picture">
              <img class="profile-pic" :src="post.creator.picture" alt="profile image" height="60" width="60">
            </div>
          </router-link>
          <div class="ps-3">
            <h6 class="m-0">
              {{ post.creator.name }}
            </h6>
            <div class="d-flex">
              <p id="time">
                {{ timeago.format(new Date(post.createdAt)) }}
              </p>
              <p v-if="post.creator.graduated">
                <i class="mdi mdi-account-school px-1"></i>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="my-2">
        {{ post.body }}
      </div>
      <div v-if="post.imgUrl">
        <img class="img-fluid" :src="post.imgUrl" alt="post image">
      </div>
      <div v-if="post.likes == false" class="text-end p-1">
        <i class="mdi mdi-heart-outline f-18 selectable show-likes" @click="likePost(post.id)"></i>
        <h5>{{ post.likes.length }}</h5>
      </div>
      <div v-else class="text-end p-1">
        <i class="mdi mdi-heart f-18 selectable" @click="likePost(post.id)"></i>
        <h5>{{ post.likes.length }}</h5>
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
import * as timeago from 'timeago.js';

export default {
  props: {
    post: { type: Post, required: true }
  },

  setup(props) {

    return {
      account: computed(() => AppState.account),
      timeago: computed(() => timeago),

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



<style lang="scss" scoped>
.profile-pic {
  border-radius: 50%;
  border: 2px solid #3a5a40;
}

.profile-pic:hover {
  border: 3px solid #3a5a40;
}
</style>