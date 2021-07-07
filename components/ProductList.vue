<template lang="pug">
  section.product-list
    article(v-for="product in products" class="product-cart")
      img(:src="product.image" class="product-cart__image")
      h3(class="product-cart__title") {{ product.name }}
      span(class="product-cart__price") {{ `$${product.price} (USD)` }}
      .product-cart__icons-container
        span(class="product-cart__review") {{ reviews(product.review) }}
        NuxtLink(:to="`/product/${product._id}`" class="product-cart__see") 👁
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    products: {
      type: Array,
      required: true,
    },
  },

  computed: {
    reviews() {
      return (review: number): string => {
        const max = 5
        const b = '★'.repeat(review)
        const w = '☆'.repeat(max - review)
        return b + w
      }
    },
  },
})
</script>

<style lang="scss">
.product-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
.product-cart {
  width: 12rem;
  margin: 0.5rem;
  padding: 8px;
  border-radius: 8px;
  box-shadow: black 0px 0px 4px 0px;
  text-align: left;
  &__image {
    width: 11rem;
    height: 7.32rem;
    border-radius: 0.5rem;
    background-color: grey;
  }
  &__title {
    margin-bottom: 4px;
    white-space: nowrap;
    font-size: 0.9rem;
    overflow: hidden;
  }
  // &__price {
  //   // ☆
  // }
  &__icons-container {
    display: flex;
    align-items: center;
  }
  // &__review {
  //   // ☆
  // }
  &__see {
    margin-left: 4.5rem;
    width: auto;
    height: 0;
    font-size: 1.5rem;
    line-height: 0px;
    text-decoration-line: none;
    color: black;
    cursor: pointer;

    :link {
      text-decoration: inherit;
      color: inherit;
      cursor: auto;
    }
    :visited {
      text-decoration: inherit;
      color: inherit;
      cursor: auto;
    }
  }
}
@media only screen and (max-width: 768px) {
  .product-list {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
@media only screen and (max-width: 665px) {
  .product-list {
    grid-template-columns: 1fr 1fr;
  }
}
@media only screen and (max-width: 426px) {
  .product-list {
    grid-template-columns: 1fr;
  }
}
</style>
