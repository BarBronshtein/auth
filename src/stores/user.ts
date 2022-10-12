import { authService } from './../services/auth.service';
import { defineStore } from 'pinia';

export type User = {
	fullname: string;
	password: string;
	email: string;
	photo?: string;
	bio?: string;
	phone?: string;
};

export const useUserStore = defineStore('user', {
	state: () => ({
		user:
			JSON.parse(sessionStorage.getItem('loggedinUser') as string) ||
			(null as User | null),
		users: null! as User[],
	}),
	getters: {},
	actions: {
		async logout() {
			try {
				await authService.logout();
				this.setUser(null);
			} catch (err) {
				console.log(err);
			}
		},
		async login(credentials: { password: string; email: string }) {
			try {
				const user = await authService.login(credentials);
				this.setUser(user);
			} catch (err) {
				console.log(err);
				throw new Error('Failed to login incorrect email or password');
			}
		},
		async signup(credentials: User) {
			try {
				const user = await authService.signup(credentials);
				this.setUser(user);
			} catch (err) {
				console.log(err);
				throw new Error('Failed to signup please try again later');
			}
		},
		setUser(user: User | null) {
			this.user = user;
		},
	},
});
