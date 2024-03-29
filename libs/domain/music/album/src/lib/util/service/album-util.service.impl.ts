import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
	AlbumArtist,
	AlbumDocument,
	AlbumEntity,
	AlbumEntityAdd,
	AlbumEntityUpdate,
	AlbumModel,
	AlbumModelAdd,
	AlbumModelUpdate,
	AlbumUtilService,
	ArtistEntity,
	DocumentEntity,
	EntityQuantityEntity,
	EntityQuantityEntityUpdate,
	EntityQuantityGroup,
	EntityTypeEnum,
	GenreEnum,
	ParamItem,
	QueryConstraintTypeEnum,
	QueryOperatorEnum,
	SearchParams,
} from '@music-collection/api';

@Injectable()
export class AlbumUtilServiceImpl extends AlbumUtilService {
	public _sort = (a: AlbumEntity, b: AlbumEntity): number =>
		a.name < b.name ? 1 : -1;
	public _sortByYear = (a: AlbumEntity, b: AlbumEntity): number =>
		a.year < b.year ? 1 : -1;

	public constructor(private formBuilder: FormBuilder) {
		super();
	}

	public convertEntityAddToModelAdd(entity: AlbumEntityAdd): AlbumModelAdd {
		return {
			...entity,
			searchParameters: this.createSearchParameters(entity.name || ''),
			year: entity.year?.getTime(),
		};
	}

	public convertEntityToModel(entity: AlbumEntity): AlbumModel {
		return {
			...entity,
			searchParameters: this.createSearchParameters(entity.name || ''),
			year: entity.year?.getTime(),
		};
	}

	public convertEntityUpdateToModelUpdate(
		entity: AlbumEntityUpdate
	): AlbumModelUpdate {
		return {
			...entity,
			searchParameters: this.createSearchParameters(entity.name || ''),
			year: entity.year?.getTime(),
		};
	}

	public convertModelAddToEntityAdd(model: AlbumModelAdd): AlbumEntityAdd {
		return {
			...model,
			year: new Date(model.year),
		};
	}

	public convertModelToEntity(model: AlbumModel): AlbumEntity {
		return {
			...model,
			year: new Date(model.year),
		};
	}

	public convertModelUpdateToEntityUpdate(
		model: AlbumModelUpdate
	): AlbumEntityUpdate {
		const entity: AlbumEntityUpdate = {
			entityType: model.entityType,
			uid: model.uid,
		};

		if (model.year) {
			entity.year = new Date(model.year);
		}

		if (model.coverImage) {
			entity.coverImage = model.coverImage;
		}

		if (model.artist) {
			entity.artist = model.artist;
		}

		if (model.format) {
			entity.format = model.format;
		}

		if (model.genre) {
			entity.genre = model.genre;
		}

		if (model.songs) {
			entity.songs = model.songs;
		}

		if (model.name) {
			entity.name = model.name;
		}

		if (model.styles) {
			entity.styles = model.styles;
		}

		return entity;
	}

	public createEntity(formGroup: FormGroup): AlbumEntityAdd {
		return {
			artist: this.createSimpleArtist(formGroup.value['artist']),
			coverImage: formGroup.value['coverImage']
				? this.createSimpleDocument(formGroup.value['coverImage'])
				: null,
			entityType: EntityTypeEnum.Album,
			format: formGroup.value['format'],
			genre: GenreEnum.Rock,
			name: (formGroup.value['name'] as string).trim(),
			styles: formGroup.value['styles'],
			songs: formGroup.value['songs'],
			year: formGroup.value['year'],
		};
	}

	public createFormGroup(album: AlbumEntity | undefined): FormGroup {
		return this.formBuilder.group({
			artist: [album?.artist || null, [Validators.required]],
			coverImage: [album?.coverImage || null],
			format: [album?.format || null, [Validators.required]],
			name: [album?.name || null, [Validators.required]],
			songs: [album?.songs || null],
			styles: [album?.styles || null, [Validators.required]],
			uid: [album?.uid],
			year: [album?.year || null, [Validators.required]],
		});
	}

	public createSearchParamsByArtist(
		entityType: EntityTypeEnum,
		term: string
	): SearchParams {
		const query: ParamItem<string> = {
			queryConstraint: QueryConstraintTypeEnum.where,
			operation: QueryOperatorEnum.arrayContains,
			field: 'artist.searchParameters',
			value: term.toLowerCase(),
		};

		const searchParams: SearchParams = [{ entityType, query }];

		return searchParams;
	}

	public updateEntity(formGroup: FormGroup): AlbumEntityUpdate {
		return {
			artist: this.createSimpleArtist(formGroup.value['artist']),
			coverImage: formGroup.value['coverImage']
				? this.createSimpleDocument(formGroup.value['coverImage'])
				: null,
			entityType: EntityTypeEnum.Album,
			format: formGroup.value['format'],
			genre: GenreEnum.Rock,
			name: (formGroup.value['name'] as string).trim(),
			songs: formGroup.value['songs'],
			styles: formGroup.value['styles'],
			uid: formGroup.value['uid'],
			year: formGroup.value['year'],
		};
	}

	public updateEntityQuantity(
		entityQuantity: EntityQuantityEntity,
		album: AlbumEntity
	): EntityQuantityEntityUpdate {
		const group: object = { ...entityQuantity.group };
		const artistGroup = (group as any)[EntityTypeEnum.Artist]
			? { ...(group as any)[EntityTypeEnum.Artist] }
			: {};
		const artistProperty = artistGroup[album.artist.uid || ''] || 0;

		artistGroup[album.artist.uid || ''] = artistProperty + 1;

		(group as any)[EntityTypeEnum.Artist] = artistGroup;

		return {
			...entityQuantity,
			quantity: entityQuantity.quantity + 1,
			group: group as EntityQuantityGroup,
		};
	}

	private createSimpleArtist(artist: ArtistEntity): AlbumArtist {
		const { uid, name, entityType } = artist;

		return {
			uid,
			entityType: entityType || EntityTypeEnum.Artist,
			name,
			searchParameters: this.createSearchParameters(name),
		};
	}

	private createSimpleDocument(document: DocumentEntity): AlbumDocument {
		const { uid, filePath, entityType, name } = document;

		return {
			filePath,
			entityType: entityType || EntityTypeEnum.Document,
			name,
			uid,
		};
	}
}
