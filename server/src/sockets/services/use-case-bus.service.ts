import { Injectable, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

export interface IUseCase<T = any> {
  execute(data: T): Promise<void>;
}

@Injectable()
export class UseCaseBusService {
  constructor(private moduleRef: ModuleRef) {}

  async execute(type: Type<IUseCase>, data: any): Promise<void> {
    const instance = await this.moduleRef.create(type);
    return await instance.execute(data);
  }
}
