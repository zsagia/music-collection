import { EntityUtilService } from '../../common';
import { EntityQuantityEntity, EntityQuantityEntityUpdate } from '../../core';
import {
	ReleaseEntity,
	ReleaseEntityAdd,
	ReleaseEntityUpdate,
	ReleaseModel,
	ReleaseModelAdd,
	ReleaseModelUpdate,
} from './release';

export abstract class ReleaseUtilService extends EntityUtilService<
	ReleaseEntity,
	ReleaseEntityAdd,
	ReleaseEntityUpdate
> {
	public abstract convertEntityAddToModelAdd(
		entity: ReleaseEntityAdd
	): ReleaseModelAdd;
	public abstract convertEntityToModel(entity: ReleaseEntity): ReleaseModel;
	public abstract convertEntityUpdateToModelUpdate(
		entity: ReleaseEntityUpdate
	): ReleaseModelUpdate;
	public abstract convertModelAddToEntityAdd(
		model: ReleaseModelAdd
	): ReleaseEntityAdd;
	public abstract convertModelToEntity(model: ReleaseModel): ReleaseEntity;
	public abstract convertModelUpdateToEntityUpdate(
		model: ReleaseModelUpdate
	): ReleaseEntityUpdate;
	public abstract updateEntityQuantity(
		entityQuantityEntity: EntityQuantityEntity,
		release: ReleaseEntity
	): EntityQuantityEntityUpdate;
}
