<template>
	<header class="container">
		<h1>Pizza Shop</h1>
		<router-link to="cart" class="cart-link">Корзина ({{ cartCount}})</router-link>
	</header>
	<main class="container">
		<router-view/>
	</main>
</template>

<script setup>
	import { computed } from 'vue';
	import { useCartStore } from './stores/cart';
	const cart = useCartStore();
	const cartCount = computed(() => cart.totalQty);
</script>