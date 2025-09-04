import { reactive, watchEffect } from 'vue';
import { useCartStore } from '../stores/cart';
import IMask from 'imask';

const cart = useCartStore();
const qtyLocal = reactive({});

watchEffect(() => {
  cart.items
      .forEach((it) => {
          if (qtyLocal[it.id] == null) qtyLocal[it.id] = it.qty;
      });
});