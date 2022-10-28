import { FormGroup } from '@angular/forms';

import { Identifiable } from '../../common';

export const DOCUMENT_FEATURE_KEY = 'document';

export interface DocumentFile {
	content: unknown;
	meta: { [key: string]: string };
	path: string;
}

export interface Document {
	filePath: string;
	fileType: string;
	name: string;
	originalName: string;
}

export type DocumentEntity = Document & Identifiable;

export type DocumentEntityAdd = Omit<DocumentEntity, 'uid'>;
export type DocumentEntityUpdate = Partial<DocumentEntity> & Identifiable;

export type DocumentFormParams = {
	formGroup: FormGroup;
};

export type DocumentTableParams = {
	documents: DocumentEntity[];
};
