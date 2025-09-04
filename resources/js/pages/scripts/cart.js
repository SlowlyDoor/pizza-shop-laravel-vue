import { reactive, watchEffect } from "vue";
import { useCartStore } from "../../stores/cart";
import { fmtMoney } from "../../utils/money";
import { isValidQty } from "../../utils/validators";

export function useCartPage() {
  const cart = useCartStore();
  const qtyLocal = reactive({});

  watchEffect(() => {
    cart.items.forEach((it) => {
      if (qtyLocal[it.id] == null) qtyLocal[it.id] = it.qty;
    });
  });

  function applyQty(id) {
    const q = Number(qtyLocal[id]);
    if (isValidQty(q)) {
      cart.setQty(id, q);
    } else {
      qtyLocal[id] = cart.items.find((i) => i.id === id)?.qty ?? 1;
    }
  }

  return {
    cart,
    qtyLocal,
    fmtMoney,
    isValidQty,
    applyQty,
  };
}