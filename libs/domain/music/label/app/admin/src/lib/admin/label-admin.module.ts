import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
	LabelCollectionModule,
	LabelFormModule,
} from '@music-collection/domain/label';

import { LabelAdminRoutingModule } from './label-admin-routing.module';
import { LabelAdminComponent } from './page/admin';
import { LabelEditComponent, LabelEditResolverService } from './page/edit';
import {
	LabelListPageComponent,
	LabelListPageResolverService,
} from './page/list';

@NgModule({
	declarations: [
		LabelAdminComponent,
		LabelEditComponent,
		LabelListPageComponent,
	],
	imports: [
		CommonModule,
		LabelAdminRoutingModule,
		NgxPermissionsModule.forChild(),
		LabelFormModule,
		LabelCollectionModule,
		ButtonModule,
		ToolbarModule,
	],
	providers: [LabelEditResolverService, LabelListPageResolverService],
})
export class LabelAdminModule {}
