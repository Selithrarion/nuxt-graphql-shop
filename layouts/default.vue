<template>
	<v-app>
		<v-app-bar height="96px" flat app>
			<nuxt-link class="logo" to="/">Vue Pizza 🍕</nuxt-link>
			<nuxt-link v-show="this.$route.path === '/'" to="/cart" class="ml-auto">
				<v-btn color="primary" rounded>
					<span v-if="cartMoney !== 0"> {{ cartMoney }} ₽ </span>
					<v-divider v-if="cartMoney !== 0" vertical class="mx-2"></v-divider>
					<v-icon class="pr-2">mdi-cart</v-icon>
					{{ cart.length }}
				</v-btn>
			</nuxt-link>
		</v-app-bar>
		<v-main app>
			<v-container>
				<nuxt />
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
	computed: {
		...mapState(['cart']),
		...mapGetters(['cartMoney']),
	},
};
</script>

<style>
:root {
	--primary: #ff8f00;
}
.logo {
	text-decoration: none;
	font-size: 2rem;
	font-weight: bold;
}
</style>
