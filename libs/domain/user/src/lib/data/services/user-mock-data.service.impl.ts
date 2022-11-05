import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';
import {
	CollectionItemModel,
	CollectionItemModelAdd,
	CollectionItemModelUpdate,
	RoleNames,
	User,
	UserDataService,
} from '@music-collection/api';

@Injectable()
export class UserMockDataServiceImpl extends UserDataService {
	private userCollection: User[];

	public constructor() {
		super();

		this.userCollection = [
			{
				displayName: 'Zsagia',
				email: 'zsagia@gmail.com',
				firstName: '',
				lastName: '',
				phone: '',
				photoURL: '',
				roles: [
					{
						uid: 'role-1',
						name: RoleNames.ADMIN,
						permissions: ['*.*'],
					},
					{
						uid: 'role-2',
						name: RoleNames.USER,
						permissions: ['viewCollectionPage'],
					},
				],
				uid: 'user-1',
			},
		];
	}

	public add$(user: User): Observable<User> {
		return of(user);
	}

	public addCollectionItem$(
		collectionItem: CollectionItemModelAdd
	): Observable<CollectionItemModel> {
		throw new Error('Method not implemented.');
	}

	public delete$(user: User): Observable<User> {
		return of(user);
	}

	public list$(): Observable<User[]> {
		return of(this.userCollection);
	}

	public load$(uid: string): Observable<User | undefined> {
		const userDocument: User | undefined = this.userCollection.find(
			(user) => user.uid === uid
		);

		return of(userDocument);
	}

	public update$(user: User): Observable<User> {
		return of(user);
	}

	public updateCollectionItem$(
		collectionItem: CollectionItemModelUpdate
	): Observable<CollectionItemModelUpdate> {
		throw new Error('Method not implemented.');
	}
}
