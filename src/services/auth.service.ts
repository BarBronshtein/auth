import type { User } from './../stores/user';
import { userService } from './user.service';
import { binarySearch } from './util.service';
import { httpService } from './htttp.service';
export const authService = {
	login,
	signup,
	logout,
	getLoggedinUser,
	findEmail,
};

const STORAGE_KEY = 'loggedinUser';
async function login(credentials: { password: string; email: string }) {
	try {
		const res = await httpService.post('auth/login', credentials);
		return _saveToSession(res);
		// const res = await authenticate(credentials);
		// return _saveToSession(res);
	} catch (err) {
		console.log(err);
		throw new Error('Failed to login try again later');
	}
}

async function signup(signUpInfo: User) {
	try {
		const res = await httpService.post('auth/signup', signUpInfo);
		return _saveToSession(res.data);
		// const res = await userService.addUser(signUpInfo);
		// return _saveToSession(res as User);
	} catch (err) {
		console.log(err);
		throw new Error('Failed to signup try again later');
	}
}

async function logout() {
	try {
		await httpService.post('auth/logout');
		sessionStorage.removeItem(STORAGE_KEY);
	} catch (err) {
		throw new Error('Failed to logout try again later');
	}
}

function getLoggedinUser() {
	return JSON.parse(sessionStorage.getItem(STORAGE_KEY) as string);
}

function _saveToSession(user: User) {
	sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
	return user;
}

export function findEmail(users: User[], email: string) {
	const comprator = (a: string | number, b: User) => {
		if (a === b.email) return 1;
		if (a < b.email) return -1;
		return 0;
	};
	return binarySearch(users, email, false, comprator);
}

async function authenticate(credentials: { password: string; email: string }) {
	try {
		const user = await userService.getUserByEmail(credentials.email);
		if (user.password === credentials.password) return user;
		else throw new Error('User password is incorrect');
	} catch (err) {
		console.log(err);
		throw err;
	}
}
