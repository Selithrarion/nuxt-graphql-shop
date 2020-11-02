import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const app = express();

const pizzaData = [
	{
		name: 'Сырная',
		price: 365,
		type: 'vegeterian',
		appeared: '129492424',
		orders: 10,
		pizzaCrusts: [
			{
				type: 'тонкое',
				isAvailable: true,
			},
			{
				type: 'традиционное',
				isAvailable: true,
			},
		],
		pizzaSizes: [
			{
				size: 26,
				isAvailable: true,
			},
			{
				size: 30,
				isAvailable: true,
			},
			{
				size: 40,
				isAvailable: true,
			},
		],
		imgUrl: 'https://static.pizzasushiwok.ru/images/menu_new/6-1300.jpg',
		id: 1,
	},
	{
		name: 'Ананасовая',
		price: 325,
		type: 'vegeterian',
		appeared: '139492424',
		orders: 5,
		pizzaCrusts: [
			{
				type: 'тонкое',
				isAvailable: true,
			},
			{
				type: 'традиционное',
				isAvailable: false,
			},
		],
		pizzaSizes: [
			{
				size: 26,
				isAvailable: true,
			},
			{
				size: 30,
				isAvailable: false,
			},
			{
				size: 40,
				isAvailable: true,
			},
		],
		imgUrl: 'https://static.pizzasushiwok.ru/images/menu_new/6-1300.jpg',
		id: 2,
	},
	{
		name: 'Колбасная',
		price: 425,
		type: 'meat',
		appeared: '159492424',
		orders: 50,
		pizzaCrusts: [
			{
				type: 'тонкое',
				isAvailable: true,
			},
			{
				type: 'традиционное',
				isAvailable: true,
			},
		],
		pizzaSizes: [
			{
				size: 26,
				isAvailable: true,
			},
			{
				size: 30,
				isAvailable: true,
			},
			{
				size: 40,
				isAvailable: false,
			},
		],
		imgUrl: 'https://static.pizzasushiwok.ru/images/menu_new/6-1300.jpg',
		id: 3,
	},
	{
		name: 'Острые креветки',
		price: 525,
		type: 'spicy',
		appeared: '169492424',
		orders: 2,
		pizzaCrusts: [
			{
				type: 'тонкое',
				isAvailable: true,
			},
			{
				type: 'традиционное',
				isAvailable: true,
			},
		],
		pizzaSizes: [
			{
				size: 26,
				isAvailable: true,
			},
			{
				size: 30,
				isAvailable: false,
			},
			{
				size: 40,
				isAvailable: false,
			},
		],
		imgUrl: 'https://static.pizzasushiwok.ru/images/menu_new/6-1300.jpg',
		id: 4,
	},
];


const typeDefs = gql`
	type Query {
		getAllPizza: [Pizza]
	}
	type Pizza {
		name: String!
		price: Int!
		type: String!
		appeared: Int!
		orders: Int!
		pizzaCrusts: [PizzaCrusts]
		pizzaSizes: [PizzaSizes]
		imgUrl: String!
		id: Int!
	}
	type PizzaCrusts {
		type: String!
		isAvailable: Boolean!
	}
	type PizzaSizes {
		size: String!
		isAvailable: Boolean!
	}
`;
const resolvers = {
	Query: {
		getAllPizza: () => {
			return pizzaData;
		},
	},
};
const server = new ApolloServer({
	typeDefs,
	resolvers,
});
server.applyMiddleware({ app });
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
module.exports = app;
