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
            v-model="phone" 
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


<script setup>
  import axios from 'axios';
  import {ref, computed } from 'vue';
  import { useCartStore } from '../stores/cart';
  import IMask from 'imask';

  const cart = useCartStore();

  axios.defaults
      .headers
      .common['Accept'] = 'application/json';

  const full_name = ref('');
  const address = ref('');
  const phone = ref('');
  const comment = ref('');

  const ok = ref(null);
  const error = ref('');

  const reName = /^[А-Яа-яЁё -]+$/u;
  const reAddress = /^[0-9А-Яа-яЁё\s.,;:()\/-]+$/u;
  const rePhone = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

  const validName = computed(() => full_name.value.length >= 3 && full_name.value.length <= 100 && reName.test(full_name.value));
  const validAddress = computed(() => address.value.length >= 5 && address.value.length <= 200 && reAddress.test(address.value));
  const validPhone = computed(() => rePhone.test(phone.value));

  const formValid = computed(() => cart.items.length > 0 && validName.value && validAddress.value && validPhone.value);

  async function submit() {
    error.value = '';
    ok.value = null;
    if (!formValid.value) return;

    try {
      const payload = {
        full_name: full_name.value,
        address: address.value,
        phone: phone.value,
        comment: comment.value || null,
        items: cart.toOrderItems(),
      };

      const { data } = await axios.post('api/orders', payload);
      ok.value = data;
      cart.clear();
    } catch (exception) {
      if (exception.response?.status === 422) {
        error.value = Object.values(e.response.data.errors || {})
            .flat()
            .join(' ');
      } else {
        error.value = "Не удалось оформить заказ. Попробуйте ещё раз.";
      }
    }
  }
  function fmt(x) {
    return Number(x).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 });
  }

  const vMaskPhone = {
    mounted(el) {
      el._mask = IMask(el, { mask: '+{7} (000) 000-00-00' });
    },
    unmounted(el) {
      el._mask?.destroy?.();
    },
  };
</script>