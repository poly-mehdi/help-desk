import { Inject, Injectable } from '@nestjs/common';
import { ISettingsStorage } from '../interfaces/settings-storage/storage-settings.interface';

@Injectable()
export class SettingsService {
  private settings: Record<string, unknown> = {};
  constructor(
    @Inject('settings.storage') private readonly storage: ISettingsStorage,
  ) {
    this.initialize();
  }
  get(name: string): Promise<unknown> {
    return Promise.resolve(this.settings[name]);
  }
  set(name: string, value: unknown): Promise<void> {
    this.settings[name] = value;
    return this.storage.set(name, value);
  }
  remove(name: string): Promise<void> {
    delete this.settings[name];
    return this.storage.remove(name);
  }
  private initialize(): void {
    const delay = this.storage.get('delay');
    this.settings.delay = delay;
  }
}
