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