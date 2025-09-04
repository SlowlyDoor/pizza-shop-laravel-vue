import { reactive, watchEffect } from 'vue';
import { useCartStore } from '../stores/cart';
import { fmtMoney } from '../../utils/money';

export function useCartPage() {
  const cart = useCartStore();
  const qtyLocal = reactive({});

  watchEffect(() => {
    cart.items
        .forEach((it) => {
            if (qtyLocal[it.id] == null) qtyLocal[it.id] = it.qty;
        });
  });

  return {
    cart,
    qtyLocal,
    fmtMoney
  };
}