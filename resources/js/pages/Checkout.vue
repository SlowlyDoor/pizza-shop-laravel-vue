<template>
  <section class="wrap">
    <h2 class="title">Оформление заказа</h2>

    <div class="card empty" v-if="!cart.items.length">
      Корзина пуста.
      <router-link class="link" to="/">Вернуться в каталог</router-link>
    </div>

    <form class="card form" v-else @submit.prevent="submit">
      <label class="field">
        <span class="label">ФИО*</span>
        <input 
            type="text" 
            class="input" 
            v-model.trim="full_name" 
            :class="{ error: full_name && !validName }" 
            placeholder="Иванов Иван Иванович"
        >
      </label>

      <label class="field">
        <span class="label">Адрес доставки*</span>
        <input 
            type="text" 
            class="input" 
            v-model.trim="address" 
            :class="{ error: address && !validAddress }" 
            placeholder="Киров, ул. Московская, д. 110, к. 1"
        >
      </label>

      <label class="field">
        <span class="label">Телефон*</span>
        <input 
            type="text" 
            class="input" 
            v-mask-phone
            v-model.lazy="phone" 
            :class="{ error: phone && !validPhone }"
            placeholder="+7 (___) ___-__-__"
        >
      </label>

      <label class="field">
        <span class="label">Комментарий</span>
        <textarea 
            class="input textarea" 
            v-model.trim="comment" 
            rows="3" 
            placeholder="Опционально"
        ></textarea>
      </label>

      <div class="total">
        Итого:
        <strong>{{ fmt(cart.totalPrice) }}</strong>
      </div>

      <div class="actions">
        <router-link class="btn" to="/cart">В корзину</router-link>
        <button class="btn accent" :disabled="!formValid">Оформить заказ</button>
      </div>

      <div class="alert error-text" v-if="error">{{ error }}</div>
      <div class="alert success-text" v-if="ok">Заказ №{{ ok.order_id }} оформлен.</div>
    </form>

  </section>
</template>


<script setup src="./scripts/checkout.js"></script>