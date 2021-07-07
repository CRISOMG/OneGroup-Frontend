<template lang="pug">
  .container-auth
    h1 Register
    br
    form.form(@submit.prevent="register")
      p.form__input-container
        label(for="register-username") Username
        input(type="text" id="register-username" required placeholder="username" v-model="username")
      p.form__input-container
        label(for="register-email") Email
        input(type="email" id="register-email" required placeholder="Email" v-model="email")
      p.form__input-container
        label(for="register-password") Password
        input(:type="typeOfInputPassword" id="register-password" required placeholder="Password" v-model="password")
        .show-password
          input(type="checkbox" id="checkbox" @click="toggleShow")
          label(for="checkbox") Show Password
      p.form__footer
        input(type="submit" :disabled="loading" value="Enviar")
        NuxtLink(to="login" class="go-login") Go Login
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'auth',

  data() {
    return {
      username: '',
      email: '',
      password: '',
      showPassword: false,
      loading: false,
    }
  },

  head: {
    title: 'Sing up',
  },

  computed: {
    typeOfInputPassword(): String {
      return this.showPassword ? 'text' : 'password'
    },
  },

  methods: {
    async register() {
      if (!this.loading) {
        try {
          this.loading = true
          await this.$axios.$post('/api/sing-up', {
            username: this.username,
            email: this.email,
            password: this.password,
          })
          this.$router.push('/login')
        } catch (error) {
          this.loading = false
          if (error.isAxiosError) {
            const { request, response } = error
            if (response) {
              throw new Error(response.data.message)
            } else if (request) {
              throw new Error(request)
            }
          }
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
.go-login {
  color: #7f828b;
  text-decoration: none;
}
</style>
