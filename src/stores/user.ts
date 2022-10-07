import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export type User = { fullname: string; password: string; email: string };

export const useUserStore = defineStore('user', {
	state: () => ({
		user: null as unknown as User,
	}),
	getters: {},
	actions: {},
});
