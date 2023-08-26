<script setup>
import { RouterLink, RouterView } from 'vue-router'


</script>

<template>

  <RouterView />
  <div class="language-switch" style="position: fixed; top: 10px; left: 10px; z-index: 99999;">
    <button @click="switchLanguage('en')" class="btn btn-primary mcap-btn-primary">English</button>
    <button @click="switchLanguage('fr')" class="btn btn-primary mcap-btn-primary">Français</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    switchLanguage(lang) {
      this.$i18n.locale = lang;
    }
  }
}
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
  .language-switch {
    position: fixed !important;
    top: 10px !important; 
    left: 10px !important; 
    z-index: 99999 !important; 
}

}
</style>
