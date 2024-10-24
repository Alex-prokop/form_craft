// // src/utils/repositoryHelpers.ts

// import { Repository } from 'typeorm';

// // Общая функция поиска по ID
// export const findById = async <T>(
//   repository: Repository<T>,
//   id: number
// ): Promise<T | null> => {
//   return await repository.findOne({ where: { id } });
// };

// // Общая функция мягкого удаления
// export const softDelete = async <T>(
//   repository: Repository<T>,
//   id: number
// ): Promise<boolean> => {
//   const entity = await findById(repository, id);
//   if (!entity) return false;

//   (entity as any).is_deleted = true;
//   await repository.save(entity);
//   return true;
// };

// // Общая функция обновления сущности
// export const updateEntity = async <T>(
//   repository: Repository<T>,
//   id: number,
//   updatedData: Partial<T>
// ): Promise<T | null> => {
//   const entity = await findById(repository, id);
//   if (!entity) return null;

//   Object.assign(entity, updatedData);
//   return await repository.save(entity);
// };

// // Валидация типов, если это необходимо
// export const validateType = <T>(type: string, validTypes: T): void => {
//   if (!Object.values(validTypes).includes(type as T)) {
//     throw new Error('Недопустимый тип');
//   }
// };
