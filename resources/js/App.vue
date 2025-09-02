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

<style>
	.container {
		max-width: 960px;
		margin: 0 auto;
		padding: 16px;
	}
	.cart-link {
		float: right;
	}
	.pizza-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
	}
	.card {
		border: 1px, solid, #eee;
		border-radius: 12px;
		padding: 12px;
	}
	img {
		max-width: 25%;
		border-radius: 8px;
	}
	.error {
		border-color: #e33;
		background: #fee;
	}
</style>