import { createApp } from 'vue';
import loginForm from '@/views/login-form.vue';
import { createPinia } from 'pinia';
const mount = (el: HTMLDivElement) => {
	const app = createApp(loginForm);
	app.use(createPinia());
	app.mount(el);
};

export default mount;
