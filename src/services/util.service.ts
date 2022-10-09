export const utilService = {
	makeId,
	getRandomIntInc,
	saveToStorage,
	loadFromStorage,
	debounce,
	timeAgo,
	makeRandNum,
};

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
