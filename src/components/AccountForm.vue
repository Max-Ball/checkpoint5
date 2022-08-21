<template>
  <form class="card account-form" @submit.prevent="handleSubmit()">
    <div class="card-body text-start">
      <div>
        <label for="name">Name:</label>
        <input class="form-control" type="text" name="name" v-model="editable.name" required>
      </div>
      <div>
        <label for="picture">Picture:</label>
        <input class="form-control" type="text" name="picture" v-model="editable.picture" required>
      </div>
      <div>
        <label for="cover-img">Cover Image:</label>
        <input class="form-control" type="text" name="cover-img" v-model="editable.coverImg" required>
      </div>
      <div>
        <label for="bio">Bio:</label>
        <textarea class="container-fluid" name="bio" cols="80" rows="4" v-model="editable.bio" required></textarea>
      </div>
      <div>
        <label for="github">Github profile:</label>
        <input class="form-control" type="text" name="github" v-model="editable.github" required>
      </div>
      <div>
        <label for="linkedin">LinkedIn Profile:</label>
        <input class="form-control" type="text" name="linkedin" v-model="editable.linkedin" required>
      </div>
      <div>
        <label for="resume">Resume:</label>
        <input class="form-control" type="text" name="resume" v-model="editable.resume" required>
      </div>
      <div>
        <label for="class">Class:</label>
        <input class="form-control" type="text" name="class" v-model="editable.class" required>
      </div>
      <div>
        <label for="graduated">Graduated?</label><br>
        <input type="checkbox" name="class" v-model="editable.graduated">
      </div>
      <div>
        <button type="submit" class="btn btn-primary w-100 my-3">Save Account</button>
      </div>
    </div>
  </form>
</template>



<script>
import { computed } from '@vue/reactivity';
import { ref, watchEffect } from 'vue';
import { AppState } from '../AppState';
import { router } from '../router';
import { accountService } from '../services/AccountService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
  setup() {
    const editable = ref({})
    watchEffect(() => {
      if (!AppState.account) {
        return
      } editable.value = { ...AppState.account }
    })

    return {
      editable,
      account: computed(() => AppState.account),
      async handleSubmit() {
        try {
          await accountService.editAccount(editable.value)
          editable.value = {}
        } catch (error) {
          logger.error('[handling submit]', error)
          Pop.error(error)
        }
      }
    };
  },
};
</script>



<style>
</style>