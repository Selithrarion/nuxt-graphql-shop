<template>
	<v-col cols="12" sm="6" md="3">
		<v-skeleton-loader
			v-if="!loaded"
			:loading="loading"
			type="card"
		></v-skeleton-loader>
		<v-card v-show="loaded">
			<v-img :src="pizzaInformation.imgUrl"></v-img>
			<v-card-title>{{ pizzaInformation.name }}</v-card-title>
			<v-card-text
				><v-chip-group
					v-model="pizzaCrust"
					active-class="primary--text"
					mandatory
				>
					<v-chip
						v-for="pizzaCrust in pizzaInformation.pizzaCrusts"
						:key="pizzaCrust.type"
						:value="pizzaCrust.type"
						:disabled="!pizzaCrust.isAvailable"
					>
						{{ pizzaCrust.type }}
					</v-chip>
				</v-chip-group>
				<v-chip-group
					v-model="pizzaSize"
					active-class="primary--text"
					mandatory
				>
					<v-chip
						v-for="pizzaSize in pizzaInformation.pizzaSizes"
						:key="pizzaSize.size"
						:value="pizzaSize.size"
						:disabled="!pizzaSize.isAvailable"
					>
						{{ formatSize(pizzaSize.size) }}
					</v-chip>
				</v-chip-group></v-card-text
			>

			<v-card-actions>
				<span class="v-pizza-item__price"
					>от {{ calculatePrice(pizzaInformation.price) }} ₽</span
				>
				<v-spacer></v-spacer>
				<v-btn color="primary" @click="addToCart">Добавить</v-btn>
			</v-card-actions>
		</v-card>
	</v-col>
</template>

<script>
export default {
	name: 'VPizzaItem',
	asyncData({ axios }) {},
	props: {
		pizzaInformation: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	data() {
		return {
			pizzaCrust: '',
			pizzaSize: '',
			loading: true,
			loaded: false,
		};
	},
	methods: {
		addToCart() {
			const formData = {
				name: this.pizzaInformation.name,
				defaultPrice: this.calculatePrice(this.pizzaInformation.price),
				price: this.calculatePrice(this.pizzaInformation.price),
				type: this.pizzaInformation.type,
				size: this.pizzaSize,
				crust: this.pizzaCrust,
				quantity: 1,
				imgUrl: this.pizzaInformation.imgUrl,
				cartId: Date.now(),
			};
			this.$emit('addtocart', formData);
		},
		formatSize(size) {
			return size + ' см.';
		},
		calculatePrice(price) {
			const pizzaPrice = price.toFixed();
			const costCrustThin = 50;
			const costCrustTraditional = 75;
			const costSize26 = 40;
			const costSize30 = 50;
			const costSize40 = 60;

			let selectedCrustPrice = 0;
			let selectedSizePrice = 0;
			let finalPrice = 0;

			if (this.pizzaCrust === 'тонкое') selectedCrustPrice = costCrustThin;
			else selectedCrustPrice = costCrustTraditional;

			if (this.pizzaSize === '26') selectedSizePrice = costSize26;
			else if (this.pizzaSize === '30') selectedSizePrice = costSize30;
			else selectedSizePrice = costSize40;

			finalPrice =
				Number(pizzaPrice) +
				Number(selectedCrustPrice) +
				Number(selectedSizePrice);

			return finalPrice;
		},
	},
	beforeMount() {
		const readyHandler = () => {
			if (document.readyState === 'complete') {
				this.loading = false;
				this.loaded = true;
				document.removeEventListener('readystatechange', readyHandler);
			}
		};
		document.addEventListener('readystatechange', readyHandler);
		readyHandler();
	},
};
</script>

<style scoped>
.v-pizza-item__price {
	font-weight: bold;
	font-size: 1.25rem;
}
</style>
