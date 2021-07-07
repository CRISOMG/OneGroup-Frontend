<template lang="pug">
  .product-container
    .product-details
      img(:src="product.image" class="product-details__image")

      h2(class="product-details__title vertical-margin") {{ product.name  }}
      input(type="text" v-model:value="product.name")

      div.vertical-margin
        span(class="product-details__price") {{ `$${product.price} (USD)` }}
        input(type="number" min=0 max=1000000 v-model:value="product.price")

      div.vertical-margin
        button(@click="less") -
        span(class="product-details__reviews") {{ reviews }}
        button(@click="more") +

      div.buttons.vertical-margin
        button(@click="createProduct") Create

</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      product: {
        image: '/product-image.jpg',
        name: 'Nombre Del Producto',
        price: 100,
        review: 3,
      },
    }
  },

  computed: {
    reviews() {
      const review = this.product.review
      const max = 5
      const b = '★'.repeat(review)
      const w = '☆'.repeat(max - review)
      return b + w
    },
  },

  watch: {
    'product.price'(newValue, oldValue): void {
      if (newValue.length > 7) {
        this.product.price = oldValue
      } else if (newValue < 0) {
        this.product.price = 0
      }
    },
  },

  methods: {
    more() {
      // eslint-disable-next-line no-unused-expressions
      if (!(this.product.review > 4)) {
        this.product.review += 1
      }
    },

    less() {
      // eslint-disable-next-line no-unused-expressions
      if (!(this.product.review < 1)) {
        this.product.review -= 1
      }
    },
    async createProduct() {
      const { name, price, review, image } = this.product
      const sure = confirm('Are you sure do you want to create this product?')
      if (sure) {
        try {
          await this.$axios.post(`/api/product`, {
            image,
            name,
            price,
            review,
          })
          this.$router.push('/')
        } catch (error) {
          if (error.response.status === 401) {
            this.$router.push('login')
          }
        }
      }
    },
  },
})
</script>

<style lang="scss">
.product-container {
  display: block;
}
.product-details {
  width: 32rem;
  margin: 1rem auto;
  &__image {
    width: 32rem;
    height: 21.5rem;
    border-radius: 0.5rem;
    background-color: grey;
  }
  // &__title {
  // }
  &__price {
    margin-right: 4px;
  }
  // &__reviews {
  // }
}
.vertical-margin {
  margin: 0.5rem 0;
}
.buttons {
  display: flex;
  justify-content: space-between;
  width: 10rem;
  button {
    width: 4rem;
  }
}
</style>
