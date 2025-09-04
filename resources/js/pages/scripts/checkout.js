import axios from 'axios';
import {ref, computed } from 'vue';
import { useCartStore } from '../stores/cart';
import { fmtMoney } from '../../utils/money';
import { isValidName, isValidAddress, isValidPhone } from '../../utils/validators';

export function useCheckout() {
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

  const validName    = computed(() => isValidName(full_name.value));
  const validAddress = computed(() => isValidAddress(address.value));
  const validPhone   = computed(() => isValidPhone(phone.value));

  const formValid = computed(() => 
    cart.items.length > 0 && validName.value && validAddress.value && validPhone.value
  );

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

  return {
    cart,
    full_name,
    address,
    phone,
    comment,
    ok,
    error,
    validName,
    validAddress,
    validPhone,
    formValid,
    submit,
    fmtMoney
  };
}