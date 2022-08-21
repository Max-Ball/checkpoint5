<template>
  <nav class="navbar navbar-expand-lg nav-custom px-3">
    <div class="col-md-3">
      <Login />
    </div>
    <div class="col-md-5">
      <router-link class="navbar-brand d-flex justify-content-center" :to="{ name: 'Home' }">
        <h1><b>The NETWORK</b></h1>
      </router-link>
    </div>
    <div class="col-md-4">
      <form @submit.prevent="search()">
        <div class="input-group">
          <input type="search" class="form-control" required v-model="query" />
          <label class="form-label" for="form1"></label>
          <button type="submit" class="btn btn-primary">
            <i class="mdi mdi-magnify"></i>
          </button>
        </div>
      </form>
    </div>
    <div class="collapse navbar-collapse justify-content-end" id="navbarText">
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue';
import { postsService } from '../services/PostsService';
import { profilesService } from '../services/ProfilesService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import Login from './Login.vue';
export default {
  setup() {
    const query = ref('')
    return {
      query,
      async search() {
        try {
          await postsService.search(query.value)
          await profilesService.search(query.value)
          query.value = ''
        } catch (error) {
          logger.error('[searching]', error)
          Pop.error(error)
        }
      }
    };
  },
  components: { Login }
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.nav-custom {
  background: rgb(233, 237, 201);
  background: linear-gradient(90deg, rgba(233, 237, 201, 1) 0%, rgba(58, 90, 64, 1) 80%);
}
</style>
