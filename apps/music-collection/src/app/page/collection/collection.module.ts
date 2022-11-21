import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CollectionItemCollectionModule } from '@music-collection/domain/collection-item';

import { CollectionRoutingModule } from './collection-routing.module';
import { CollectionComponent } from './collection.component';

@NgModule({
	declarations: [CollectionComponent],
	imports: [
		CommonModule,
		ButtonModule,
		CollectionRoutingModule,
		CollectionItemCollectionModule,
		SidebarModule,
	],
})
export class CollectionModule {}
