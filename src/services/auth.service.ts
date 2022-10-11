import type { User } from './../stores/user';
import { userService } from './user.service';
// import axios from 'axios';
import { binarySearch } from './util.service';
// axios.defaults.withCredentials = true;
export const authService = {
	login,
	signup,
	logout,
	getLoggedinUser,
	findEmail,
};

// const API = '//localhost:3030/api/auth/';
const STORAGE_KEY = 'loggedinUser';
async function login(credentials: { password: string; email: string }) {
	try {
		// const res = await axios.post(API + 'login', credentials);
		const res = await authenticate(credentials);
		// return _saveToSession(res.data);
		return _saveToSession(res);
	} catch (err) {
		console.log(err);
		throw new Error('Failed to login try again later');
	}
}

async function signup(signUpInfo: User) {
	try {
		// const res = await axios.post(API + 'signup', signUpInfo);
		const res = await userService.addUser(signUpInfo);
		// return _saveToSession(res.data);
		return _saveToSession(res as User);
	} catch (err) {
		console.log(err);
		throw new Error('Failed to signup try again later');
	}
}

async function logout() {
	try {
		// await axios.post(API + 'logout');
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
	const comprator = (a: string, b: User) => {
		if (a === b.email) return 1;
		if (a < b.email) return -1;
	};
	return binarySearch(users, email, comprator);
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
