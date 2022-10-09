import type { User } from '@/stores/user';
import { storageService } from './async-storage.service';
import { findEmail } from './auth.service';
export const userService = {
	getUsers,
};
const STORAGE_KEY = 'userDB';

async function getUsers(filterBy = null) {
	const users = (await storageService.query(STORAGE_KEY)) as User[];
	// filterBy && _filter(users, filterBy);
	return users;
}

async function getUserByEmail(email: string) {
	const users = (await storageService.query(STORAGE_KEY)) as User[];
	return findEmail(users, email);
}
