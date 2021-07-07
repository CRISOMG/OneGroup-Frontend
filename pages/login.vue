<template lang="pug">
  .container-auth
    h1 Login
    br
    form.form(@submit.prevent="login")
      p.form__input-container
        label(for="login-email") Email
        input(type="email" required id="login-email" placeholder="Email" v-model="email")
      p.form__input-container
        label(for="password") Password
        input(:type="typeOfInputPassword" required id="password" placeholder="Password" v-model="password")
        .show-password
          input(type="checkbox" id="checkbox" @click="toggleShow")
          label(for="checkbox") Show Password
      p.form__footer
        input(type="submit" :disabled="loading" value="Send")
        NuxtLink(to="sing-up"  class="go-sing-up") Go Register
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'auth',

  data() {
    return {
      email: '',
      password: '',
      error: false,
      showPassword: false,
      loading: false,
    }
  },

  head: {
    title: 'login',
  },

  computed: {
    typeOfInputPassword(): String {
      return this.showPassword ? 'text' : 'password'
    },
  },

  methods: {
    async login() {
      if (!this.loading) {
        try {
          this.loading = true
          const user = await this.$axios.$post('/api/login', {
            email: this.email,
            password: this.password,
          })

          this.$store.commit('user/add', user)
          this.$router.push('/')
          this.loading = false
        } catch (error) {
          this.loading = false
        }
      }
    },
    toggleShow() {
      this.showPassword = !this.showPassword
    },
  },
})
</script>

<style lang="scss">
.go-sing-up {
  color: #7f828b;
  text-decoration: none;
}
</style>
