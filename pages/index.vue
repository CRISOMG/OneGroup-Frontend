<template lang="pug">
  div.container
    .pagination-controls
      | Page:
      button(@click="previousPage" :disabled="loading") -
      span {{ page }}
      button(@click="nextPage" :disabled="loading") +

    product-list(:products="products" v-if="!loading")
    p(v-if="products.length === 0") Page is empty

    .loader-container
      pulse-loader(:loading="loading")
    
    .link-container
      NuxtLink(to="/product/create" class="reset-link-styles") Create Product

</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ $axios, redirect, store }) {
    try {
      const { data } = await $axios('/api/products')
      const { data: user } = await $axios('/api/user/me')
      store.commit('user/add', user)

      return {
        products: data,
      }
    } catch (error) {
      redirect('/login')
    }
  },

  data() {
    return {
      products: [],
      page: 0,
      loading: false,
    }
  },

  head: {
    title: 'Home',
  },

  methods: {
    previousPage() {
      if (this.page !== 0) {
        this.loading = true
        this.page -= 1
        this.fetchProducts()
      }
    },
    nextPage() {
      this.loading = true
      this.page += 1
      this.fetchProducts()
    },
    async fetchProducts() {
      const page = this.page !== 0 ? this.page : null
      try {
        const { data } = await this.$axios('/api/products', {
          params: {
            page,
          },
        })
        this.loading = false
        this.products = data
      } catch (error) {
        if (error.isAxiosError) {
          const { response } = error
          if (response.status === 401) {
            this.$router.push('/login')
          }
        } else {
          throw new Error(error)
        }
      }
    },
  },
})
</script>

<style lang="scss">
.reset-link-styles {
  color: #7f828b;
  text-decoration: none;
}
.link-container {
  position: absolute;
  bottom: 6rem;
}

.container {
  margin: 0 auto;
  height: calc(100vh - 112px);
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  text-align: center;
}

.loader-container {
  margin-top: 11rem;
  width: auto;
  height: auto;
}

.pagination-controls {
  display: flex;
  align-items: baseline;
  margin: 1rem 0;
  span {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 1.5rem;
    height: 1.5rem;
  }
  button {
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>
