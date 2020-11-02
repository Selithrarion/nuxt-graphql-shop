export const state = () => ({
	cart: [],
});
export const mutations = {
	ADD_PIZZA_TO_CART(store, formData) {
		store.cart.push(formData);
	},
	REMOVE_PIZZA_FROM_CART_BY_ID(store, cartId) {
		store.cart = store.cart.filter((pizza) => pizza.cartId !== cartId);
	},
	ADD_ONE_PIZZA_QUANTITY_BY_ID(store, cartId) {
		const pizza = store.cart.filter((pizza) => pizza.cartId === cartId)[0];
		pizza.price += pizza.defaultPrice;
		pizza.quantity++;
	},
	REMOVE_ONE_PIZZA_QUANTITY_BY_ID(store, cartId) {
		const pizza = store.cart.filter((pizza) => pizza.cartId === cartId)[0];
		if (pizza.quantity !== 1) {
			pizza.price -= pizza.defaultPrice;
			pizza.quantity--;
		}
	},
};
export const actions = {
	addPizzaToCart({ commit }, formData) {
		commit('ADD_PIZZA_TO_CART', formData);
	},
	removePizzaFromCartById({ commit }, item) {
		commit('REMOVE_PIZZA_FROM_CART_BY_ID', item);
	},
	addOnePizzaQuantityById({ commit }, cartId) {
		commit('ADD_ONE_PIZZA_QUANTITY_BY_ID', cartId);
	},
	removeOnePizzaQuantityById({ commit }, cartId) {
		commit('REMOVE_ONE_PIZZA_QUANTITY_BY_ID', cartId);
	},
};

export const getters = {
	cartMoney: (state) => {
		let price = 0;
		state.cart.forEach((pizza) => {
			price += pizza.price;
		});
		return price;
	},
};
