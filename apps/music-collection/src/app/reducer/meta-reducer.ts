import { localStorageSync } from 'ngrx-store-localstorage';

import { Action, ActionReducer, MetaReducer } from '@ngrx/store';

function localStorageSyncReducer(
	reducer: ActionReducer<unknown>
): ActionReducer<unknown> {
	return localStorageSync({
		keys: [
			{
				album: ['ids', 'entities'],
			},
			{
				artist: ['ids', 'entities'],
			},
			{
				authentication: ['authenticatedUser'],
			},
		],
		rehydrate: true,
	})(reducer);
}

export const metaReducers: Array<MetaReducer<any, Action>> = [
	localStorageSyncReducer,
];
