import { Observable } from 'rxjs';

import { EntityStateService } from '../../../common';
import { AlbumEntity, AlbumEntityAdd, AlbumEntityUpdate } from './album';

export abstract class AlbumStateService extends EntityStateService<
	AlbumEntity,
	AlbumEntityAdd,
	AlbumEntityUpdate
> {
	public abstract dispatchChangeNewEntityButtonEnabled(
		enabled: boolean
	): void;
	public abstract dispatchSelectAlbumAction(album: AlbumEntity): void;
	public abstract selectNewEntityButtonEnabled$(): Observable<boolean>;
	public abstract selectSearchResult$(): Observable<AlbumEntity[]>;
}
