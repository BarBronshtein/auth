import type { User } from './../stores/user';
import axios from 'axios';
axios.defaults.withCredentials = true;
export const authService = {
	login,
	signup,
	logout,
	getLoggedinUser,
};

const API = '//localhost:3030/api/auth/';
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser';
const STORAGE_KEY_USERS = 'userDB';
async function login(credentials: { password: string; email: string }) {
	try {
		const res = await axios.post(API + 'login', credentials);
		return _saveToSession(res.data);
	} catch (err) {
		console.log(err);
		throw new Error('Failed to login try again later');
	}
}

async function signup(signUpInfo: User) {
	try {
		const res = await axios.post(API + 'signup', signUpInfo);
		return _saveToSession(res.data);
	} catch (err) {
		console.log(err);
		throw new Error('Failed to signup try again later');
	}
}

async function logout() {
	try {
		await axios.post(API + 'logout');
		sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
	} catch (err) {
		throw new Error('Failed to logout try again later');
	}
}

function getLoggedinUser() {
	return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) as string);
}

function _saveToSession(user: User) {
	sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
	return user;
}

function isEmailOccupied(email: string) {}
