import personalInfoEdit from '@/views/personal-info-edit.vue';
import personalInfo from '@/views/personal-info.vue';
import { createApp, type DefineComponent } from 'vue';
import loginForm from '@/views/login-form.vue';
import { createPinia } from 'pinia';
const mount = <T>(component: T) => {
	return (el: HTMLElement) => {
		const app = createApp(component as DefineComponent);
		app.use(createPinia());
		app.mount(el);
	};
};
const LoginForm = mount(loginForm);
const PersonalInfo = mount(personalInfo);
const PersonalInfoEdit = mount(personalInfoEdit);
export { LoginForm, PersonalInfo, PersonalInfoEdit };
