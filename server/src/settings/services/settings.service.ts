import { Inject, Injectable } from '@nestjs/common';
import { ISettingsStorage } from '../interfaces/settings-storage/storage-settings.interface';

@Injectable()
export class SettingsService {
  constructor(
    @Inject('settings.storage') private readonly storage: ISettingsStorage,
  ) {}
  get(name: string): Promise<unknown> {
    return this.storage.get(name);
  }
  set(name: string, value: unknown): Promise<void> {
    return this.storage.set(name, value);
  }
  remove(name: string): Promise<void> {
    return this.storage.remove(name);
  }
}
