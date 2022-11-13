import { useUserStore } from './../stores/user';
import { createRouter, createWebHashHistory } from 'vue-router';
import loginForm from '@/views/login-form.vue';

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'login',
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
		{
			path: '/personal-info/edit',
			name: 'personal-info-edit',
			component: () => import('@/views/personal-info-edit.vue'),
		},
	],
});

router.beforeEach((to, from) => {
	const store = useUserStore();
	if (!store.user && to.path !== '/') {
		from.path = to.path;
		return { name: 'login' };
	}
});
export default router;
