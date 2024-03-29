import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
	AlbumEntity,
	AlbumReference,
	ArtistEntity,
	ArtistReference,
	EntityQuantityEntity,
	EntityQuantityEntityUpdate,
	EntityQuantityGroup,
	EntityTypeEnum,
	QueryConstraintTypeEnum,
	QueryOperatorEnum,
	SearchParams,
	UpdateEntityQuantityType,
	UpdateEntityQuantityTypeEnum,
	User,
	UserReference,
	WishlistItemEntity,
	WishlistItemEntityAdd,
	WishlistItemEntityUpdate,
	WishlistItemModel,
	WishlistItemModelAdd,
	WishlistItemModelUpdate,
	WishlistItemUtilService,
} from '@music-collection/api';

@Injectable()
export class WishlistItemUtilServiceImpl extends WishlistItemUtilService {
	public _sort = (a: WishlistItemEntity, b: WishlistItemEntity): number =>
		a.albumReference.name < b.albumReference.name ? 1 : -1;

	public constructor(private formBuilder: FormBuilder) {
		super();
	}

	public convertEntityAddToModelAdd(
		entity: WishlistItemEntityAdd
	): WishlistItemModelAdd {
		return {
			...entity,
			searchParameters: this.createSearchParameters(
				entity.albumReference.name
			),
		};
	}

	public convertEntityToModel(entity: WishlistItemEntity): WishlistItemModel {
		return {
			...entity,
			searchParameters: this.createSearchParameters(
				entity.albumReference.name
			),
		};
	}

	public convertEntityUpdateToModelUpdate(
		entity: WishlistItemEntityUpdate
	): WishlistItemModelUpdate {
		return {
			...entity,
			searchParameters: this.createSearchParameters(
				entity.albumReference?.name || ''
			),
		};
	}

	public convertModelAddToEntityAdd(
		model: WishlistItemModelAdd
	): WishlistItemEntityAdd {
		return {
			...model,
		};
	}

	public convertModelToEntity(model: WishlistItemModel): WishlistItemEntity {
		return {
			...model,
		};
	}

	public convertModelUpdateToEntityUpdate(
		model: WishlistItemModelUpdate
	): WishlistItemEntityUpdate {
		const entity: WishlistItemEntityUpdate = {
			isActive: model.isActive,
			uid: model.uid,
			entityType: model.entityType,
		};

		if (model.albumReference) {
			entity.albumReference = model.albumReference;
		}

		if (model.artistReference) {
			entity.artistReference = model.artistReference;
		}

		if (model.userReference) {
			entity.userReference = model.userReference;
		}

		if (model.medias) {
			entity.medias = model.medias;
		}

		if (model.sourceLink) {
			entity.sourceLink = model.sourceLink;
		}

		return entity;
	}

	public createEntity(formGroup: FormGroup): WishlistItemEntityAdd {
		return {
			entityType: EntityTypeEnum.WishlistItem,
			albumReference: this.createAlbumReference(
				formGroup.value['albumReference']
			),
			artistReference: this.createArtistReference(
				formGroup.value['artistReference']
			),
			userReference: this.createUserReference(
				formGroup.value['userReference']
			),
			medias: formGroup.value['medias'],
			isActive: formGroup.value['isActive'],
			sourceLink: formGroup.value['sourceLink'],
		};
	}

	public createFormGroup(
		entity: WishlistItemEntity | undefined
	): FormGroup<any> {
		throw new Error('Method not implemented.');
	}

	public createFormGroupByUser(
		wishlistItem: WishlistItemEntity | undefined,
		user: User
	): FormGroup {
		return this.formBuilder.group({
			uid: [wishlistItem?.uid],
			albumReference: [
				wishlistItem?.albumReference || null,
				[Validators.required],
			],
			artistReference: [
				wishlistItem?.artistReference || null,
				[Validators.required],
			],
			userReference: [
				wishlistItem?.userReference || user,
				[Validators.required],
			],
			medias: [wishlistItem?.medias || null, [Validators.required]],
			isActive: [wishlistItem?.isActive || true],
			sourceLink: [wishlistItem?.sourceLink || null],
		});
	}

	public createOrUpdateFormGroup(
		formGroup: FormGroup,
		wishlistItem: WishlistItemEntity | undefined,
		user: User
	): FormGroup {
		let newFormGroup: FormGroup;

		if (!formGroup) {
			newFormGroup = this.createFormGroupByUser(wishlistItem, user);
		} else {
			newFormGroup = formGroup;
		}

		return newFormGroup;
	}

	public createSearchParamsForAlbum(
		term: string,
		artistId: string
	): SearchParams {
		const searchParams: SearchParams = [
			this.createSearchParam(
				EntityTypeEnum.Album,
				term.toLowerCase(),
				QueryConstraintTypeEnum.where,
				QueryOperatorEnum.arrayContains,
				'searchParameters'
			),
			this.createSearchParam(
				EntityTypeEnum.Album,
				artistId,
				QueryConstraintTypeEnum.where,
				QueryOperatorEnum.equal,
				'artist.uid'
			),
		];

		return searchParams;
	}

	public updateEntity(formGroup: FormGroup): WishlistItemEntityUpdate {
		return {
			entityType: EntityTypeEnum.WishlistItem,
			uid: formGroup.value['uid'],
			albumReference: formGroup.value['albumReference'],
			artistReference: formGroup.value['artistReference'],
			userReference: formGroup.value['userReference'],
			medias: formGroup.value['medias'],
			sourceLink: formGroup.value['sourceLink'],
			isActive: formGroup.value['isActive'],
		};
	}

	public updateEntityQuantity(
		entityQuantity: EntityQuantityEntity,
		wishlistItem: WishlistItemEntity,
		type: UpdateEntityQuantityType
	): EntityQuantityEntityUpdate {
		let group: EntityQuantityGroup = { ...entityQuantity.group };

		const albumGroupItem = group[EntityTypeEnum.Album]
			? { ...(group as any)[EntityTypeEnum.Album] }
			: {};
		const albumProperty =
			albumGroupItem[wishlistItem.albumReference.uid] || 0;
		const value = type === UpdateEntityQuantityTypeEnum.increase ? 1 : -1;

		albumGroupItem[wishlistItem.albumReference.uid] = albumProperty + value;

		group[EntityTypeEnum.Album] = albumGroupItem;

		group = { ...entityQuantity.group };

		const userGroupItem = group[EntityTypeEnum.User]
			? { ...(group as any)[EntityTypeEnum.User] }
			: {};
		const userProperty = userGroupItem[wishlistItem.userReference.uid] || 0;

		userGroupItem[wishlistItem.userReference.uid] = userProperty + value;

		group[EntityTypeEnum.User] = userGroupItem;

		return {
			...entityQuantity,
			quantity: entityQuantity.quantity + value,
			group: group as EntityQuantityGroup,
		};
	}

	private createAlbumReference(album: AlbumEntity): AlbumReference {
		const { coverImage, name, uid } = album;

		return {
			coverImage,
			name,
			uid,
		};
	}

	private createArtistReference(artist: ArtistEntity): ArtistReference {
		const { name, uid } = artist;

		return {
			name,
			uid,
		};
	}

	private createUserReference(user: User): UserReference {
		const { displayName, uid } = user;

		return {
			displayName,
			uid,
		};
	}
}
