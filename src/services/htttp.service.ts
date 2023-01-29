import Axios from 'axios';
import router from '@/router';
const axios = Axios.create({
	withCredentials: true,
});

const BASE_URL = import.meta.env.VITE_API_PROD;

export const httpService = {
	get(endpoint: string, data?: unknown) {
		return ajax(endpoint, 'GET', data);
	},
	post(endpoint: string, data?: unknown) {
		return ajax(endpoint, 'POST', data);
	},
	put(endpoint: string, data?: unknown) {
		return ajax(endpoint, 'PUT', data);
	},
	delete(endpoint: string, data?: unknown) {
		return ajax(endpoint, 'DELETE', data);
	},
};

async function ajax(
	endpoint: string,
	method = 'GET',
	data: null | unknown = null
) {
	try {
		const res = await axios({
			url: `${BASE_URL}${endpoint}`,
			method,
			data,
			params: method === 'GET' ? data : null,
		});
		return res.data;
	} catch (err: any) {
		console.log(
			`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data:`,
			data
		);
		console.dir(err);
		if (err.response && err.response.status === 401) {
			// window.location.assign('/#/');
			// window.location.assign('/');
			router.push('/');
		}
		throw err;
	}
}
