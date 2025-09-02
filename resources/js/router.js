import { createRouter, createWebHistory } from 'vue-router';
import Catalog from './pages/Catalog.vue';
import Cart from './pages/Cart.vue';
import Checkout from './pages/Checkout.vue';

export default createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', component: Catalog},
		{ path: '/cart', component: Cart},
		{ path: '/checkout', component: Checkout},
	]
});