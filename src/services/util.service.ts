export const utilService = {
	makeId,
	getRandomIntInc,
	saveToStorage,
	loadFromStorage,
	debounce,
	timeAgo,
	makeRandNum,
	waitVarToLoad,
	renderGoogleButton,
	initializeGoogle,
};

function initializeGoogle(callback: Function) {
	google?.accounts?.id?.initialize({
		client_id: import.meta.env.VITE_CLIENT_ID,
		callback,
	});
}

function renderGoogleButton() {
	google.accounts?.id?.renderButton(document.querySelector('.hidden-button'), {
		theme: 'outline',
		size: 'small',
	});
}

function makeRandNum() {
	return Math.trunc(Date.now() % 100);
}

function makeId(length = 5) {
	var text = '';
	var possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

function getRandomIntInc(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function saveToStorage(key: string, value: any) {
	localStorage.setItem(key, JSON.stringify(value || 'null'));
}

function loadFromStorage(key: string) {
	let data = localStorage.getItem(key) as string;
	return JSON.parse(data);
}

function debounce(func: Function, wait = 500) {
	let timeout: number;

	return function executedFunction(...args: any[]) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};

		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

function timeAgo(input: Date | string | number) {
	const date = input instanceof Date ? input : new Date(+input);
	const formatter = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });
	const ranges = {
		years: 3600 * 24 * 365,
		months: 3600 * 24 * 30,
		weeks: 3600 * 24 * 7,
		days: 3600 * 24,
		hours: 3600,
		minutes: 60,
		seconds: 1,
	};
	const secondsElapsed = (date.getTime() - Date.now()) / 1000;
	let key: keyof typeof ranges;
	for (key in ranges) {
		if (ranges[key] < Math.abs(secondsElapsed)) {
			const delta = secondsElapsed / ranges[key];
			let time = formatter.format(Math.round(delta), key);
			if (time.includes('in')) {
				time = time.replace('in ', '');
				time = time.replace('ago', '');
				time += ' ago';
			}
			return time; //? time : 'Just now'
		}
	}
}

export function binarySearch<T>(
	arr: T[],
	target: string | number,
	returnIndex = false,
	comprator?: Function
) {
	if (!comprator)
		comprator = (target: string | number, arrayEl: string | number) => {
			if (target === arrayEl) return 1;
			if (target < arrayEl) return -1;
			return 0;
		};
	let [start, end] = [0, arr.length - 1];
	while (start <= end) {
		const mid = Math.trunc((start + end) / 2);
		const res = comprator(target, arr[mid]);
		if (res > 0) return returnIndex ? mid : arr[mid];
		if (res < 0) end = mid - 1;
		else start = mid + 1;
	}
	if (returnIndex) return -1;
}

export function bubbleSort<T>(
	arr: T[],
	comprator?: (entityA: T, entityB: T) => number
) {
	if (typeof comprator !== 'function')
		comprator = (entityA, entityB) => (entityA > entityB ? 1 : -1);
	for (let i = arr.length; i > 0; i--) {
		let noSwaps = true;
		for (let j = 0; j < i - 1; j++) {
			const res = comprator(arr[j], arr[j + 1]);
			if (res > 0) {
				swap(arr, j, j + 1);
				noSwaps = false;
			}
		}
		if (noSwaps) break;
	}
	return arr;
}
export function insertionSort<T>(
	arr: T[],
	comprator?: (entityA: T, entityB: T) => number
) {
	if (typeof comprator !== 'function')
		comprator = (entityA, entityB) => (entityA > entityB ? 1 : -1);
	for (let i = 0; i < arr.length; i++) {
		const cur = arr[i];
		for (var j = i - 1; j >= 0 && comprator(arr[j], cur) > 0; j--) {
			arr[j + 1] = arr[j];
		}
		arr[j + 1] = cur;
	}
	return arr;
}

function swap(arr: any[], i: number, j: number) {
	[arr[i], arr[j]] = [arr[j], arr[i]];
}

function waitVarToLoad(callback: Function) {
	if (google) return callback();
	else setTimeout(waitVarToLoad, 500);
}
