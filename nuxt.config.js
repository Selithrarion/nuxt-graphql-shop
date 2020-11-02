import colors from 'vuetify/es5/util/colors';
import ru from 'vuetify/lib/locale/ru';

export default {
	components: true,
	head: {
		title: 'NuxtGraphQLShop',
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				hid: 'description',
				name: 'description',
				content: 'Official Nuxt.js starter for CodeSandBox',
			},
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},
	css: [],
	plugins: [],
	buildModules: ['@nuxtjs/vuetify', '@nuxtjs/axios'],
	modules: ['@nuxtjs/pwa', '@nuxt/components', '@nuxtjs/apollo'],

	apollo: {
		clientConfigs: {
			default: {
				httpEndpoint: process.env.BASE_URL + 'api/graphql',
			},
		},
	},
	axios: {
		baseURL: process.env.BASE_URL,
	},
	router: {
		prefetchLinks: true,
	},
	vuetify: {
		lang: {
			locales: { ru },
			current: 'ru',
		},
		theme: {
			light: true,
			themes: {
				light: {
					primary: colors.amber.darken3,
					accent: colors.blueGrey.darken3,
					secondary: colors.lightGreen.darken1,
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3,
				},
			},
		},
	},
	build: {
		extend(config, ctx) {},
	},
	env: {
		appName: 'NuxtGraphQLShop',
	},
	serverMiddleware: [
		{
			path: '/api',
			handler: '~/api/index.js',
		},
	],
	pageTransition: 'fade-transition',
};
