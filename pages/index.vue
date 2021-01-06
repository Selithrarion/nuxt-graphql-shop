<template>
	<div class="main-page">
		<VSort @selecttype="onSelectType" @selectfilter="onSelectFilter"></VSort>
		<h1>Все пиццы</h1>
		<v-row>
			<LazyVPizzaItem
				v-for="pizza in filteredPizzaData"
				:key="pizza.id"
				:pizzaInformation="pizza"
				@addtocart="addToCart"
			></LazyVPizzaItem>
		</v-row>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import getAllPizza from '../apollo/queries/getAllPizza';

export default {
	apollo: {
		getAllPizza: {
			prefetch: true,
			query: getAllPizza,
		},
	},
	data() {
		return {
			sortType: 'all',
			sortFilter: 'popular',
			getAllPizza: [],
		};
	},
	computed: {
		filteredPizzaData() {
			const sortBySortFilter = (data) => {
				if (this.sortFilter === 'popular') {
					return data.sort((a, b) => (a.orders < b.orders ? 1 : -1));
				} else if (this.sortFilter === 'cost') {
					return data.sort((a, b) => (a.price < b.price ? 1 : -1));
				} else if (this.sortFilter === 'alphabet') {
					return data.sort((a, b) => (a.name > b.name ? 1 : -1));
				}
			};
			if (this.sortType === 'all') {
				return sortBySortFilter(this.getAllPizza);
			}
			const filtered = this.getAllPizza.filter(
				(pizza) => pizza.type === this.sortType
			);
			return sortBySortFilter(filtered);
		},
	},
	methods: {
		...mapActions(['addPizzaToCart']),
		onSelectType(type) {
			this.sortType = type;
		},
		onSelectFilter(filter) {
			this.sortFilter = filter;
		},
		async addToCart(formData) {
			try {
				await this.addPizzaToCart(formData);
			} catch (err) {
				console.log(err);
			}
		},
	},
};
</script>

<style scoped></style>
