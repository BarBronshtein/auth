import loginForm from '@/views/login-form.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'login-form',
			component: loginForm,
		},
		{
			path: '/personal-info',
			name: 'personal-info',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('../views/personal-info.vue'),
		},
	],
});

export default router;
