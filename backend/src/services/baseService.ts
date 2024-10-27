// import { Repository } from 'typeorm';

// // Базовый сервис для CRUD-операций
// export class BaseService<T> {
//   protected repository: Repository<T>;

//   constructor(repository: Repository<T>) {
//     this.repository = repository;
//   }

//   // Получение всех записей
//   async getAll(): Promise<T[]> {
//     return await this.repository.find();
//   }

//   // Получение записи по ID
//   async getById(id: number): Promise<T | null> {
//     return await this.repository.findOne({ where: { id } as any });
//   }

//   // Создание записи
//   async create(data: Partial<T>): Promise<T> {
//     const entity = this.repository.create(data);
//     return await this.repository.save(entity);
//   }

//   // Обновление записи
//   async update(id: number, data: Partial<T>): Promise<T | null> {
//     const entity = await this.getById(id);
//     if (!entity) return null;

//     Object.assign(entity, data);
//     return await this.repository.save(entity);
//   }

//   // Удаление записи (мягкое удаление)
//   async delete(id: number): Promise<boolean> {
//     const entity = await this.getById(id);
//     if (!entity) return false;

//     (entity as any).is_deleted = true;
//     await this.repository.save(entity);
//     return true;
//   }
// }
