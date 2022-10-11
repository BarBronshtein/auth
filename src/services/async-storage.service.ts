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
	id?: string;
}
interface EntityWithId extends Entity {
	id: string;
}
async function query(entityType: string, delay = 0): Promise<Entity[]> {
	const entities = JSON.parse(localStorage.getItem(entityType) || 'null') || [];
	if (delay) {
		return new Promise(resolve => setTimeout(resolve, delay, entities));
	}
	return entities;
}

async function get(entityType: string, entityId: string): Promise<Entity> {
	const entities = await query(entityType);
	const entity = entities.find(entity => entity.id === entityId);
	if (!entity)
		throw new Error(
			`Cannot get, Item ${entityId} of type: ${entityType} does not exist`
		);
	return entity;
}

async function post(
	entityType: string,
	newEntity: Entity,
	comprator?: Function
): Promise<Entity> {
	newEntity = { ...newEntity, id: makeId() };
	const entities = await query(entityType);
	entities.push(newEntity);
	if (comprator) bubbleSort(entities, comprator);
	else
		bubbleSort(entities, (a: EntityWithId, b: EntityWithId) =>
			a.id > b.id ? 1 : -1
		);
	_save(entityType, entities);
	return newEntity;
}

async function put(
	entityType: string,
	updatedEntity: Entity,
	comprator?: Function
): Promise<Entity> {
	const entities = await query(entityType);
	// const idx = entities.findIndex(entity => entity.id === updatedEntity.id);
	const idx = binarySearch(
		entities,
		updatedEntity.id as string,
		(a: string, b: EntityWithId) => {
			if (a === b.id) return 1;
			if (a < b.id) return -1;
		}
	);
	entities[idx] = updatedEntity;
	if (comprator) bubbleSort(entities, comprator);
	else
		bubbleSort(entities, (a: EntityWithId, b: EntityWithId) =>
			a.id > b.id ? 1 : -1
		);
	_save(entityType, entities);
	return updatedEntity;
}

async function remove(entityType: string, entityId: string): Promise<boolean> {
	const entities = await query(entityType);
	// const idx = entities.findIndex(entity => entity.id === entityId);
	const idx = binarySearch(entities, entityId, (a: string, b: EntityWithId) => {
		if (a === b.id) return 1;
		if (a < b.id) return -1;
	});
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
