import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from '@/router';
import App from '@/App.vue';

const mount = (el: HTMLDivElement) => {
	const app = createApp(App);
	app.use(createPinia());
	app.use(router);
	app.mount(el);
};

export default mount;
