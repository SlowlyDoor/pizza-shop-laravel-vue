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
            v-model.number="qtyMap[p.id]" 
            inputmode="numeric"
            :class="{error: !validQty(qtyMap[p.id])}" 
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
  import axios from 'axios';
  import { ref, reactive, onMounted } from 'vue';
  import { useCartStore } from '../stores/cart';
  import IMask from 'imask';

  const pizzas = ref([]);
  const qtyMap = reactive({});
  const cart = useCartStore();

  onMounted(async () => {
    axios.defaults
        .headers
        .common['Accept'] = 'application/json';
    const { data } = await axios.get('/api/pizzas');
    pizzas.value = data;
    data.forEach((p) => (qtyMap[p.id] = qtyMap[p.id] ?? 1));
  });

  function addToCart(p) {
    const q = Number(qtyMap[p.id] || 1);
    if (!validQty(q)) return;
    cart.add(p, q);
  }

  function validQty(v) {
    const n = Number(v);
    return Number.isInteger(n) && n >= 1 && n <= 99;
  }

  function fmt(x) {
    return Number(x).toLocaleString('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    });
  }

  const vImaskInt = {
    mounted(el) {
      el._mask = IMask(el, {
          mask: Number,
          min: 1,
          max: 99,
          scale: 0,
          radix: ',',
          thousandsSeparator: ''
      });
    },
    unmounted(el) {
      el._mask?.destroy?.();
    },
  };
</script>