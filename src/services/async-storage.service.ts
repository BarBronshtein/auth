import { binarySearch, bubbleSort } from './util.service';

export const storageService = {
	query,
	get,
	post,
	put,
	remove,
	makeId,
};

export interface Entity {
	_id?: string;
}
async function query<T extends Entity>(
	entityType: string,
	delay = 0
): Promise<T[]> {
	const entities = JSON.parse(localStorage.getItem(entityType) || 'null') || [];
	if (delay) {
		return new Promise(resolve => setTimeout(resolve, delay, entities));
	}
	return entities;
}

async function get<T extends Entity>(
	entityType: string,
	entityId: string
): Promise<T> {
	const entities = await query<T>(entityType);
	const entity = entities.find(entity => entity._id === entityId);
	if (!entity)
		throw new Error(
			`Cannot get, Item ${entityId} of type: ${entityType} does not exist`
		);
	return entity;
}

async function post<T extends Entity>(
	entityType: string,
	newEntity: T,
	comprator?: (entityA: T, entityB: T) => 1 | -1
): Promise<T> {
	newEntity = { ...newEntity, _id: makeId() };
	const entities = await query<T>(entityType);
	entities.push(newEntity);
	if (!comprator)
		comprator = (entityA: T, entityB: T) =>
			entityA._id! > entityB._id! ? 1 : -1;
	bubbleSort<T>(entities, comprator);

	_save(entityType, entities);
	return newEntity;
}

async function put<T extends Required<Entity>>(
	entityType: string,
	updatedEntity: T,
	comprator?: (entityA: T, entityB: T) => 1 | -1,
	searchFunction?: (target: string | number, entity: T) => number
): Promise<T> {
	const entities = await query<T>(entityType);
	if (!searchFunction)
		searchFunction = (target: string | number, entity: T) => {
			if (target === entity._id) return 1;
			if (target < entity._id) return -1;
			return 0;
		};

	const idx = binarySearch<T>(
		entities,
		updatedEntity._id,
		true,
		searchFunction
	) as number;

	entities[idx] = updatedEntity;

	if (!comprator)
		comprator = (entityA: T, entityB: T) => (entityA._id > entityB._id ? 1 : -1);

	bubbleSort<T>(entities, comprator);

	_save(entityType, entities);
	return updatedEntity;
}

async function remove<T extends Required<Entity>>(
	entityType: string,
	entityId: string
): Promise<boolean> {
	const entities = await query<T>(entityType);
	// const _idx = entities.findIndex(entity => entity._id === entityId);
	const idx = binarySearch<T>(
		entities,
		entityId,
		true,
		(target: string | number, entity: T) => {
			if (target === entity._id) return 1;
			if (target < entity._id) return -1;
			return 0;
		}
	) as number;
	if (idx !== -1) entities.splice(idx, 1);
	else
		throw new Error(
			`Cannot remove, item ${entityId} of type: ${entityType} does not exist`
		);
	_save(entityType, entities);
	return true;
}

function _save(entityType: string, entities: Entity[]) {
	localStorage.setItem(entityType, JSON.stringify(entities));
}

function makeId(length = 5) {
	let txt = '';
	const possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < length; i++) {
		txt += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return txt;
}
