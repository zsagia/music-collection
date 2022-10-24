import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ArtistStateService } from '@music-collection/api';

@Injectable()
export class ArtistListResolverService implements Resolve<void> {
  constructor(private artistStateService: ArtistStateService) {}

  public resolve(): void {
    this.artistStateService.dispatchListEntitiesAction();
    this.artistStateService.dispatchSetSelectedEntityIdAction('');
    this.artistStateService.dispatchChangeNewEntityButtonEnabled(true);
  }
}
