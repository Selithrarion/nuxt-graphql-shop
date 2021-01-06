<template>
	<v-row class="v-cart-pizza-item">
		<v-col>
			<v-divider></v-divider>
			<v-list>
				<v-list-item
					v-for="(pizza, index) in pizzas"
					:key="index"
					v-ripple="{ class: `white--text` }"
				>
					<v-list-item-avatar width="64px" height="64px">
						<v-img :alt="`${pizza.name} пицца`" :src="pizza.imgUrl"></v-img>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title class="v-cart-pizza-item__title">
							Пицца "{{ pizza.name }}"
						</v-list-item-title>
						<v-list-item-subtitle
							>{{ pizza.crust }} тесто,
							{{ pizza.size }} см.</v-list-item-subtitle
						>
					</v-list-item-content>
					<span class="v-cart-pizza-item__quantity mr-8">
						<v-btn
							icon
							:disabled="pizza.quantity === 1"
							@click="clickMinus(pizza.cartId)"
						>
							<v-icon color="primary">mdi-minus-circle</v-icon>
						</v-btn>
						{{ pizza.quantity }}
						<v-btn icon @click="clickPlus(pizza.cartId)">
							<v-icon color="primary">mdi-plus-circle</v-icon>
						</v-btn>
					</span>
					<span class="v-cart-pizza-item__price mx-2">{{ pizza.price }} ₽</span>
					<v-btn icon @click="removePizzaFromCart(pizza.cartId)">
						<v-icon color="#d3d3d3de">mdi-close</v-icon>
					</v-btn>
				</v-list-item>
			</v-list>
			<v-divider></v-divider>
		</v-col>
	</v-row>
</template>

<script>
export default {
	name: 'VCartPizzaItem',
	props: {
		pizzas: {
			type: Array,
			default() {
				return [];
			},
		},
	},
	data() {
		return {};
	},
	methods: {
		clickMinus(cartId) {
			this.$emit('clickminus', cartId);
		},
		clickPlus(cartId) {
			this.$emit('clickplus', cartId);
		},
		removePizzaFromCart(cartId) {
			this.$emit('clickremove', cartId);
		},
	},
};
</script>

<style scoped>
.v-cart-pizza-item__title {
	font-size: 1.25rem;
	font-weight: 500;
}
.v-cart-pizza-item__price {
	font-size: 1.1rem;
}
.v-cart-pizza-item__quantity {
	font-size: 1.2rem;
	font-weight: 500;
}
</style>
