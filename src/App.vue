<template>
  <header>
    <Navbar />
  </header>
  <div class="container-fluid bg-custom">
    <div class="row" v-if="account.id">
      <div class="col-md-3">
        <ProfileBar />
      </div>
      <main class="col-md-6">
        <router-view />
      </main>
      <!-- NOTE figure out why this div isn't showing up for ads -->
      <div class="col-md-3">
        <div v-for="a in ads" :key="a.id">
          <AdCard :ad="a" />
        </div>
      </div>
    </div>
    <div class="row" v-else>
      <main class="col-md-9">
        <router-view />
      </main>
      <!-- NOTE figure out why this div isn't showing up for ads -->
      <div class="col-md-3">
        <div v-for="a in ads" :key="a.id">
          <AdCard :ad="a" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from './AppState';
import AdCard from './components/AdCard.vue';
import { adsService } from './services/AdsService';
import { logger } from './utils/Logger';
import ProfileBar from './components/ProfileBar.vue';

export default {
  name: "App",
  setup() {
    async function getAds() {
      try {
        await adsService.getAds()
      } catch (error) {
        logger.error('getting ads', error)
        Pop.error(error)
      }
    }

    onMounted(() => { getAds() })
    return {
      appState: computed(() => AppState),
      ads: computed(() => AppState.ads),
      account: computed(() => AppState.account)
    };
  },
  components: { AdCard, ProfileBar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.profile-bar {
  height: 100vh;
}

i {
  color: #3a5a40 !important;
}

.bg-custom {
  background-color: #fefae0;
}

.card {
  background-color: #e9edc9;
}
</style>
