<template>
  <section class="wrap">
    <h2 class="title">Корзина</h2>

    <!-- Если корзина пустая, то показываем кнопку возвращения -->
    <div class="empty" v-if="cart.items.length === 0">
      Пусто.
      <router-link class="link" to="/">Перейти в каталог</router-link>
    </div>

    <div class="cart" v-else>
      <div class="row card" v-for="it in cart.items" :key="it.id">
        <img class="thumb" :src="it.image_url" :alt="it.name">

        <div class="info">
          <div class="name">{{ it.name }}</div>

          <div class="line">
            Стоимость позиции:
            <strong>
              {{ fmt(it.qty * it.price)}}
            </strong>
          </div>
        </div>

        <input 
          type="number" 
          class="qty"  
          v-model.number="qtyLocal[it.id]" 
          min="1" 
          max="99" 
          @input="applyQty(it.id)"
        >
        <button class="icon-btn" title="Удалить" @click="cart.remove(it.id)">Удаление</button>
      </div>
      <div class="summary card">
        <div>
          Итого: 
          <strong>{{ fmt(cart.totalPrice) }}</strong>
        </div>
        
        <div class="actions">
          <router-link class="btn" to="/">На главную</router-link>
          <button class="btn" @click="cart.clear()">Очистить корзину</button>
          <router-link class="btn accent" to="/checkout">Оформить заказ</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { reactive, watchEffect } from 'vue';
  import { useCartStore } from '../stores/cart';

  const cart = useCartStore();
  const qtyLocal = reactive({});

  watchEffect(() => {
    cart.items
        .forEach((it) => {
            if (qtyLocal[it.id] == null) qtyLocal[it.id] = it.qty;
        });
  });

  function applyQty(id) {
    const q = Number(qtyLocal[id]);
    if (Number.isInteger(q) && q >= 1 && q <= 99) {
      cart.setQty(id, q);
    } else {
      qtyLocal[id] = cart.items
          .find((i) => i.id === id)?.qty ?? 1;
    }
  }

  function fmt(x) {
    return Number(x).toLocaleString('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    });
  }
</script>

