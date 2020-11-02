<template>
	<div class="cart">
		<v-row class="justify-center">
			<v-col cols="12" sm="8">
				<div
					class="cart__empty text-center mt-6"
					v-if="cart.length === 0"
				>
					<h2>Ох. Кажется корзина всё ещё пустая!</h2>
					<p>Выбери какую-то пиццу на главной странице 😀</p>
					<nuxt-link class="cart__empty-link" to="/"
						><v-btn text color="primary"
							>на главную</v-btn
						></nuxt-link
					>
				</div>
				<div class="cart__main" v-else>
					<h2>
						<v-icon class="mr-2">mdi-cart-outline</v-icon>Корзина
					</h2>
					<VCartPizzaItem
						:pizzas="cart"
						@clickminus="onClickMinus"
						@clickplus="onClickPlus"
						@clickremove="onRemovePizzaFromCart"
					></VCartPizzaItem>
					<v-row class="cart__main-footer mt-8">
						<span
							>Всего пицц:
							<span class="cart__main-footer-quantity">{{
								cart.length
							}}</span></span
						>

						<span class="ml-auto">
							Сумма заказа:
							<span class="cart__main-footer-money">
								{{ cartMoney }} ₽
							</span>
						</span>
					</v-row>
					<v-row class="mt-4">
						<nuxt-link to="/" class="link"
							><v-btn rounded large
								>Вернуться назад</v-btn
							></nuxt-link
						>
						<v-spacer></v-spacer>
						<nuxt-link to="/pay" class="link"
							><v-btn color="primary" rounded large
								>Оплатить сейчас</v-btn
							></nuxt-link
						>
					</v-row>
				</div>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
	data() {
		return {};
	},
	computed: {
		...mapState(['cart']),
		...mapGetters(['cartMoney']),
	},
	methods: {
		...mapActions([
			'removePizzaFromCartById',
			'addOnePizzaQuantityById',
			'removeOnePizzaQuantityById',
		]),
		onClickMinus(cartId) {
			try {
				this.removeOnePizzaQuantityById(cartId);
			} catch (err) {
				console.log(err);
			}
		},
		onClickPlus(cartId) {
			try {
				this.addOnePizzaQuantityById(cartId);
			} catch (err) {
				console.log(err);
			}
		},
		onRemovePizzaFromCart(cartId) {
			try {
				this.removePizzaFromCartById(cartId);
			} catch (err) {
				console.log(err);
			}
		},
	},
};
</script>

<style scoped>
.cart__empty-link {
	text-decoration: none;
}
.cart__main-footer {
	font-size: 1.25rem;
}
.cart__main-footer-money {
	color: var(--primary);
	font-weight: bold;
}
.cart__main-footer-quantity {
	font-weight: bold;
}
.link {
	text-decoration: none;
}
</style>