<template>
  <div class="row justify-content-center">
    <div class="col-md-12">
      <div class="row justify-content-between">
        <PostForm />
        <div class="text-end d-flex justify-content-between">
          <button :disabled="!nextPage" @click="changePage(nextPage)" class="btn btn-outline w-25 btn-border">
            <i class="mdi mdi-arrow-left-drop-circle"></i> Newer Posts
          </button>
          <button :disabled="!previousPage" @click="changePage(previousPage)" class="btn btn-outline w-25 btn-border">
            Older Posts
            <i class="mdi mdi-arrow-right-drop-circle"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-12" v-for="p in posts" :key="p.id">
      <PostCard :post="p" />
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState';
import { postsService } from '../services/PostsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import PostCard from '../components/PostCard.vue';
import PostForm from '../components/PostForm.vue';

export default {
  setup() {
    async function getPosts() {
      try {
        await postsService.getPosts();
      }
      catch (error) {
        logger.error("[getting posts]", error);
        Pop.error(error);
      }
    };


    onMounted(() => {
      getPosts();
    });

    return {
      posts: computed(() => AppState.posts),
      nextPage: computed(() => AppState.nextPage),
      previousPage: computed(() => AppState.previousPage),


      async changePage(url) {
        try {
          await postsService.changePage(url)
        } catch (error) {
          logger.error('[changing page]')
          Pop.error(error)
        }
      }
    };
  },
  components: { PostCard, PostForm }
}
</script>






<style scoped lang="scss">
.profile-bar {
  height: 100vh;
}

.btn-border:hover {
  border: none !important;
}
</style>
