import type { User } from '@/stores/user';
import { storageService, type Entity } from './async-storage.service';
import { findEmail } from './auth.service';
export const userService = {
	getUsers,
	getUserByEmail,
	addUser,
	updateUser,
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

async function addUser(user: User) {
	return await storageService.post(
		STORAGE_KEY,
		user as Entity,
		sortUsersByEmail
	);
}

async function updateUser(user: User) {
	return await storageService.put(STORAGE_KEY, user as Entity, sortUsersByEmail);
}

function sortUsersByEmail(a: User, b: User) {
	return a.email > b.email ? 1 : -1;
}
