import { authService } from './../services/auth.service';
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export type User = { fullname: string; password: string; email: string };

export const useUserStore = defineStore('user', {
	state: () => ({
		user: null as unknown as User | null,
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
			}
		},
		async signup(credentials: User) {
			try {
				const user = await authService.signup(credentials);
				this.setUser(user);
			} catch (err) {
				console.log(err);
			}
		},
		setUser(user: User | null) {
			this.user = user;
		},
	},
});
