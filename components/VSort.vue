<template>
	<v-row class="v-sort mb-6 align-center">
		<v-btn-toggle mandatory rounded>
			<v-btn large @click="selectType('all')">Все</v-btn>
			<v-btn large @click="selectType('meat')">Месные</v-btn>
			<v-btn large @click="selectType('vegeterian')"
				>Вегетерианские</v-btn
			>
			<v-btn large @click="selectType('grill')">Гриль</v-btn>
			<v-btn large @click="selectType('spicy')">Острые</v-btn>
			<v-btn rounded large @click="selectType('closed')">Закрытые</v-btn>
		</v-btn-toggle>

		<span class="ml-auto">
			<v-select
				v-model="selectedSortFilter"
				:items="sortFilters"
				label="Сортировка по:"
				@change="selectFilter()"
			></v-select>
		</span>
	</v-row>
</template>

<script>
export default {
	name: 'VSort',
	data() {
		return {
			sortFilters: [
				{
					text: 'популярности',
					value: 'popular',
				},
				{
					text: 'цене',
					value: 'cost',
				},
				{
					text: 'алфавиту',
					value: 'alphabet',
				},
			],
			selectedSortFilter: 'popular',
		};
	},
	methods: {
		selectType(type) {
			this.$emit('selecttype', type);
		},
		selectFilter() {
			this.$emit('selectfilter', this.selectedSortFilter);
		},
	},
};
</script>

<style>
</style>