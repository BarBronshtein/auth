import { useUserStore } from './../stores/user';
import { toRaw } from 'vue';

const getStore = () => {
	return toRaw(useUserStore());
};

const convertToRaw = (proxy: typeof Proxy) => {
	return toRaw(proxy);
};

export { getStore, convertToRaw };
