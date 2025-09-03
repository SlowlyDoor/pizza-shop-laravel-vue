import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({ 
        items: []
    }),
    getters: {
      totalQty: (s) => s.items
          .reduce((sum, i) => sum + i.qty, 0),
      totalPrice: (s) => s.items
          .reduce((sum, i) => sum + i.qty * Number(i.price), 0),
    },
    actions: {
      add(pizza, qty = 1) {
        // Добавление позиции
        qty = clampInt(qty, 1, 99)
        const found = this.items
            .find(i => i.id === pizza.id)
        if (found) found.qty = clampInt(found.qty + qty, 1, 99)
        else this.items
            .push({
                id: pizza.id,
                name: pizza.name,
                price: Number(pizza.price),
                image_url: pizza.image_url,
                qty
            })
      },
      setQty(id, qty) {
        // Установка количества
        qty = clampInt(qty, 1, 99)
        const it = this.items
            .find(i => i.id === id)
        if (it) it.qty = qty
      },
      remove(id) {
        // Удаление позиции
        this.items = this.items
            .filter(i => i.id !== id)
      },
      clear() {
        // Очистка корзины
        this.items = []
      },
    }
})

function clampInt(v, min, max) {
    v = parseInt(v ?? 0, 10)
    if (Number.isNaN(v)) v = min
    return Math.max(min, Math.min(max, v))
}