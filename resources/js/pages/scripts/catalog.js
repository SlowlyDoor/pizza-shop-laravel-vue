import axios from 'axios';
import { ref, reactive, onMounted } from 'vue';
import { useCartStore } from '../stores/cart';
import IMask from 'imask';

const pizzas = ref([]);
const qtyMap = reactive({});
const cart = useCartStore();

onMounted(async () => {
  axios.defaults
      .headers
      .common['Accept'] = 'application/json';
  const { data } = await axios.get('/api/pizzas');
  pizzas.value = data;
  data.forEach((p) => (qtyMap[p.id] = qtyMap[p.id] ?? 1));
});

function addToCart(p) {
  const q = Number(qtyMap[p.id] || 1);
  if (!validQty(q)) return;
  cart.add(p, q);
}