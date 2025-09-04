import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

const STORAGE_KEY = "pizza_cart_v1";

export const useCartStore = defineStore("cart", () => {
  const items = ref(load());

  const totalQty = computed(() => items.value.reduce((s, i) => s + i.qty, 0));
  const totalPrice = computed(() =>
    items.value.reduce((s, i) => s + i.qty * Number(i.price), 0),
  );

  function add(pizza, qty = 1) {
    // Добавление позиции
    qty = clampInt(qty, 1, 99);
    const found = this.items.find((i) => i.id === pizza.id);
    if (found) found.qty = clampInt(found.qty + qty, 1, 99);
    else
      this.items.push({
        id: pizza.id,
        name: pizza.name,
        price: Number(pizza.price),
        image_url: pizza.image_url || "",
        qty,
      });
  }

  function setQty(id, qty) {
    // Установка количества
    qty = clampInt(qty, 1, 99);
    const it = items.value.find((i) => i.id === id);
    if (it) it.qty = qty;
  }

  function remove(id) {
    // Удаление позиции
    this.items = this.items.filter((i) => i.id !== id);
  }

  function clear() {
    // Очистка корзины
    this.items = [];
  }

  function toOrderItems() {
    return items.value.map((i) => ({
      pizza_id: i.id,
      qty: i.qty,
    }));
  }

  watch(items, persist, { deep: true });

  return {
    items,
    totalQty,
    totalPrice,
    add,
    setQty,
    remove,
    clear,
    toOrderItems,
  };
});

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persist(val) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
}

function clampInt(v, min, max) {
  v = parseInt(v ?? 0, 10);
  if (Number.isNaN(v)) v = min;
  return Math.max(min, Math.min(max, v));
}