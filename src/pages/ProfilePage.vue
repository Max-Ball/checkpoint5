<template>
  <div class="profile-page">
    <div class="cover-img">
      <div>
        <img :src="profile.picture" alt="" height="120">
        <h3>{{ profile.name }}</h3>
        <p v-if="profile.graduated">
          <i class="mdi mdi-account-school"></i>
        </p>
        <h6> {{ profile.body }} </h6>
        <p>{{ profile.bio }}</p>
        <a href="">{{ profile.github }}</a>
        <a href="">{{ profile.linkedin }}</a>
        <h4>{{ profile.class }}</h4>
        <h5>{{ profile.email }}</h5>
        <h6>{{ profile.resume }}</h6>
      </div>
    </div>
    <div class=container>
      <div class="row justify-content-center">
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
        <div class="col-md-10 my-3" v-for="p in posts" :key="p.id">
          <PostCard :post="p" />
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import PostCard from '../components/PostCard.vue';
import { postsService } from '../services/PostsService';
import { profilesService } from '../services/ProfilesService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
  setup() {
    const route = useRoute()

    async function getProfileById() {
      try {
        await profilesService.getProfileById(route.params.profileId)
      } catch (error) {
        logger.error('[getting profile by id]', error)
        Pop.error(error)
      }
    }

    async function getPostsByProfileId() {
      try {
        await postsService.getPostsByProfileId(route.params.profileId)
      } catch (error) {
        logger.error('[getting posts by profile]', error)
        Pop.error(error)
      }
    }


    onMounted(() => {
      getProfileById()
      getPostsByProfileId()
    })

    return {
      profile: computed(() => AppState.activeProfile),
      posts: computed(() => AppState.posts),
      cover: computed(() => `url(${AppState.activeProfile?.coverImg})`),
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
  components: { PostCard }
};
</script>



<style lang="scss" scoped>
.cover-img {
  height: 300px;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  display: grid;
  place-content: center;
  color: aliceblue;
  background-image: v-bind(cover);
}
</style>