<template>
  <div class="row">
    <div class="col-md-3 profile-bar bg-dark sticky">
      profile bar
    </div>
    <div class="col-md-7">
      <div class="row">
        <div class="col-md-10">
          <PostForm />
        </div>

        <div class="col-10">
          <div class="row justify-content-between mt-3 px-3">
            <button v-if="nextPage" @click="changePage(nextPage)" class="btn btn-primary w-25">
              Newer
            </button>
            <button v-if="previousPage" @click="changePage(previousPage)" class="btn btn-primary w-25">
              Older
            </button>
          </div>
        </div>
        <div class="col-md-10" v-for="p in posts" :key="p.id">
          <PostCard :post="p" />
        </div>
      </div>
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
</style>
