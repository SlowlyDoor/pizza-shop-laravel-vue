<template>
  <section class="wrap">
    <h2 class="title">Каталог</h2>

    <div class="pizza-grid">
      <article class="card">
        <div class="name">Тестовая пицца</div>
        <button class="btn" @click="addTest">Добавить в корзину</button>
      </article>
    </div>
  
  </section>
</template>

<script setup>
  import { useCartStore } from '../stores/cart';

  const cart = useCartStore();

  function addTest() {
    cart.add({
      id: 999,
      name: 'Тестовая',
      price: 100,
      image_url: ''
    }, 1);
  }
</script>