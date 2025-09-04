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
              {{ fmtMoney(it.qty * it.price)}}
            </strong>
          </div>
        </div>

        <input 
          v-imask-int
          type="text" 
          class="qty"  
          v-model.lazy="qtyLocal[it.id]" 
          inputmode="numeric"
          :class="{ error: !validQty(qtyLocal[it.id]) }"
        >
        <button class="icon-btn" title="Удалить" @click="cart.remove(it.id)">Удаление</button>
      </div>
      <div class="summary card">
        <div>
          Итого: 
          <strong>{{ fmtMoney(cart.totalPrice) }}</strong>
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
  import { useCartPage } from './scripts/cart';
  const {
    cart,
    qtyLocal,
    fmtMoney
  } = useCartPage();
</script>
