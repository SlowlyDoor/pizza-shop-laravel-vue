<template>
  <section class="wrap">
    <h2 class="title">Каталог</h2>

    <div class="pizza-grid">
      <article class="card pizza" v-for="p in pizzas" :key="p.id">
        <img class="thumb" :src="p.image_url" :alt="p.name">
        <h3 class="name">{{ p.name }}</h3>
        <p class="desc">{{ p.description }}</p>
        <p class="price">
          <strong>{{ fmt(p.price) }}</strong>
        </p>

        <div class="controls">
          <input 
            v-imask-int
            type="text" 
            class="qty" 
            v-model.lazy="qtyMap[p.id]" 
            inputmode="numeric"
            :class="{ error: !validQty(qtyMap[p.id]) }" 
            placeholder="1"
          >
          <button 
            class="btn" 
            :disabled="!validQty(qtyMap[p.id])" 
            @click="addToCart(p)"
          >В корзину</button>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
  import { useCatalog } from './scripts/catalog';
  const {
    pizzas,
    qtyMap,
    addToCart,
    isValidQty,
    fmtMoney
  } = useCatalog();
</script>