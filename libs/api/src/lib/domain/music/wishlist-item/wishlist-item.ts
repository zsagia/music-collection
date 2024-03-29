import { FormGroup } from '@angular/forms';

import { Activable, Entity, MediaEnum, Searchable } from '../../../common';
import { UserReference } from '../../../core';
import { AlbumEntity, AlbumReference } from '../album';
import { ArtistEntity, ArtistReference } from '../artist';

export interface WishlistItem {
	albumReference: AlbumReference;
	artistReference: ArtistReference;
	medias: MediaEnum[];
	sourceLink: string;
	userReference: UserReference;
}

export type WishlistItemEntity = WishlistItem & Activable & Entity;

export type WishlistItemEntityAdd = Omit<WishlistItemEntity, 'uid'>;

export type WishlistItemEntityUpdate = Partial<WishlistItemEntity> &
	Entity &
	Activable;

export type WishlistItemModel = WishlistItem & Entity & Activable & Searchable;

export type WishlistItemModelAdd = Omit<WishlistItemModel, 'uid'>;

export type WishlistItemModelUpdate = Partial<WishlistItemModel> &
	Entity &
	Activable &
	Searchable;

export type WishlistItemFormParams = {
	albums: AlbumEntity[];
	artists: ArtistEntity[];
	formGroup: FormGroup;
	mediaList: MediaEnum[];
};

export type WishlistItemTableParams = {
	wishlistItems: WishlistItemEntity[];
	empty: string[];
};

export type WishlistItemListParams = {
	wishlistItems: WishlistItemEntity[];
};
