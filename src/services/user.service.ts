import type { User } from '@/stores/user';
import { storageService, type Entity } from './async-storage.service';
// import { findEmail } from './auth.service';
import { httpService } from './htttp.service';
export const userService = {
	getUsers,
	getUserByEmail,
	addUser,
	updateUser,
};

const STORAGE_KEY = 'userDB';

async function getUsers(filterBy = null) {
	// const users = (await storageService.query(STORAGE_KEY)) as User[];
	const res = await httpService.get('user', filterBy);
	const users = res.data;
	return users;
}

async function getUserByEmail(email: string) {
	// const users = (await storageService.query(STORAGE_KEY)) as User[];
	// return findEmail(users, email);
	return await httpService.get(`user/${email}`);
}

async function addUser(user: User) {
	return await storageService.post(
		STORAGE_KEY,
		user as Entity,
		sortUsersByEmail
	);
}

async function updateUser(user: User) {
	// return await storageService.put(STORAGE_KEY, user as Entity, sortUsersByEmail);
	return await httpService.put(`user/${user._id}`, user);
}

function sortUsersByEmail(a: User, b: User) {
	return a.email > b.email ? 1 : -1;
}
