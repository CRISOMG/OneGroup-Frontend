<template lang="pug">
  main
    header.header
      NuxtLink(to="/")
        img(src="/onegroup-logo.tiny.jpg" class="header__logo")
      .header__profile
        span {{ username }}
        img(src="/logout-icon.png" @click="logout"  class="header__profile-logout")
        img(src="/profile-icon.png" class="header__profile-icon")
    Nuxt
</template>
<script lang="ts">
// @ts-ignore
import Cookies from 'js-cookie'

import Vue from 'vue'

export default Vue.extend({
  computed: {
    username() {
      return this.$store.state.user.name
    },
  },

  methods: {
    logout() {
      const sure = confirm('Are you sure you want to log out?')
      if (sure) {
        Cookies.remove('token')
        this.$router.push('/login')
      }
    },
  },
})
</script>

<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0 1rem;
  background-color: black;
  &__logo {
    width: auto;
    height: 60px;
  }
  &__profile {
    display: flex;
    align-items: center;
    color: white;
    span {
      margin-right: 4px;
    }
  }
  &__profile-logout {
    display: flex;
    align-content: center;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
  }
  &__profile-icon {
    width: auto;
    height: 60px;
  }
}
</style>
