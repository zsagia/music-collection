import { FormGroup } from '@angular/forms';

import {
	ReleaseCountryEnum,
	Entity,
	FormatDescriptionEnum,
	MediaEnum,
	Searchable,
} from '../../../common';
import { AlbumEntity } from '../album';
import { ArtistEntity } from '../artist';
import { LabelEntity } from '../label';

export interface Release {
	album: AlbumEntity;
	artist: ReleaseArtist;
	country: ReleaseCountryEnum;
	formatDescription: FormatDescriptionEnum;
	label: ReleaseLabel;
	media: MediaEnum;
	name: string;
}

export type ReleaseEntity = Release &
	Entity & {
		date: Date;
	};

export type ReleaseEntityAdd = Omit<ReleaseEntity, 'uid'>;

export type ReleaseEntityUpdate = Partial<ReleaseEntity> & Entity;

export type ReleaseModel = Release &
	Entity &
	Searchable & {
		date: number;
	};

export type ReleaseModelAdd = Omit<ReleaseModel, 'uid'>;

export type ReleaseModelUpdate = Partial<ReleaseModel> & Entity & Searchable;

export type ReleaseFormParams = {
	artists: ArtistEntity[];
	albums: AlbumEntity[];
	countryList: ReleaseCountryEnum[];
	formGroup: FormGroup;
	formatDescriptionList: FormatDescriptionEnum[];
	labels: LabelEntity[];
	mediaList: MediaEnum[];
};

export type ReleaseTableParams = {
	releases: ReleaseEntity[];
	empty: string[];
};

export type ReleaseListParams = {
	releases: ReleaseEntity[];
};

export type ReleaseArtist = Omit<
	ArtistEntity,
	| 'sites'
	| 'members'
	| 'description'
	| 'formedIn'
	| 'genre'
	| 'styles'
	| 'country'
>;

export type ReleaseLabel = Omit<LabelEntity, 'parent'>;
