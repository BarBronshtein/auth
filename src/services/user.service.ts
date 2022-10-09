import type { User } from '@/stores/user';
import { storageService } from './async-storage.service';

export const userService = {
	getUsers,
};
const STORAGE_KEY = 'userDB';

async function getUsers(filterBy = '') {
	const users = (await storageService.query(STORAGE_KEY)) as User[];
	filterBy && _filter(users, filterBy);
}

function _filter(users: User[], filterBy: string) {}
