<template>
  <div class="profile-page row">
    <div class="col-md-12 my-4">
      <div class="card">
        <div class="cover-img border rounded">
        </div>
        <div class="card-body">
          <div class="card-title">
            <img class="profile-pic" :src="profile.picture" alt="profile-picture" height="150" width="150">
            <h2 class="border-bottom border-dark">
              <p class="text-end" v-if="profile.graduated">
                <i class="mdi mdi-account-school"></i>
              </p>{{ profile.name }} <br>
              <h5>{{ profile.class }}</h5>
            </h2>
          </div>
          <p>{{ profile.bio }}</p>
          <div class="fs-5 d-flex justify-content-evenly">
            <a v-if="profile.github" class="text-dark" :href="profile.github" title="github">
              <i class="mdi mdi-github f-28"></i>
            </a>
            <a v-if="profile.linkedin" class="text-dark" :href="profile.linkedin" title="linkedin">
              <i class="mdi mdi-linkedin f-28"></i>
            </a>
            <a v-if="profile.resume" class="text-dark" :href="profile.resume" title="resume">
              <i class="mdi mdi-newspaper-variant-outline f-28"></i>
            </a>
            <a class="text-dark" href="https://www.gmail.com" title="email">
              <i class="mdi mdi-email f-28"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class=container>
      <div class="row justify-content-center">
        <div class="col-10">
          <div class="text-end d-flex justify-content-between mt-4">
            <button :disabled="!nextPage" @click="changePage(nextPage)" class="btn btn-outline w-25 btn-border">
              <i class="mdi mdi-arrow-left-drop-circle"></i> Newer Posts
            </button>
            <button :disabled="!previousPage" @click="changePage(previousPage)" class="btn btn-outline w-25 btn-border">
              Older Posts
              <i class="mdi mdi-arrow-right-drop-circle"></i>
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
import { router } from '../router';
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
        Pop.error('This profile does not exist')
        router.push({ name: 'Home' })
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