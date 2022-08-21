<template>
  <div class="container-fluid">
    <div class="row my-4 justify-content-between">
      <div class="col-md-12">
        <AccountCard />
        <AccountForm />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import AccountForm from '../components/AccountForm.vue';
import AccountCard from '../components/AccountCard.vue';
export default {
  name: "Account",
  setup() {
    return {
      account: computed(() => AppState.account)
    };
  },
  components: { AccountForm, AccountCard }
}
</script>

  <style scoped>
  </style>
