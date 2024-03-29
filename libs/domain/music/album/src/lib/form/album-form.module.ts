import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TabViewModule } from 'primeng/tabview';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxLet } from '@rx-angular/template/let';

import { AlbumFormComponent } from './component';

@NgModule({
	declarations: [AlbumFormComponent],
	exports: [AlbumFormComponent],
	imports: [
		CommonModule,
		ButtonModule,
		FormsModule,
		AutoCompleteModule,
		CalendarModule,
		DropdownModule,
		ImageModule,
		InputTextModule,
		RxLet,
		MultiSelectModule,
		ReactiveFormsModule,
		TabViewModule,
	],
})
export class AlbumFormModule {}
