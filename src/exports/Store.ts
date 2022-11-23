import { useUserStore } from './../stores/user';
import { toRaw } from 'vue';

const getStore = () => {
	return toRaw(useUserStore());
};

const convertToRaw = (proxy: ProxyConstructor) => {
	return toRaw(proxy);
};

export { getStore, convertToRaw };
