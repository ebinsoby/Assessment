<script setup>
import LoginComponent from '../components/LoginComponent.vue';
import CurrencyEx from '../components/CurrencyExchange.vue'
import { useLoginDetails } from '@/stores/login'

const userStore = useLoginDetails()
</script>

<template>
  <main >
    <button v-if="userStore.isLoggedIn" class="btn btn-danger logout mcap-btn-primary"
      @click="userStore.toggleLogin()">{{$t('Logout')}}</button>
    <LoginComponent v-if="!userStore.isLoggedIn" />
    <CurrencyEx v-else />
  </main>
</template>

<style scoped>
.logout {
  float: right;
}
</style>
