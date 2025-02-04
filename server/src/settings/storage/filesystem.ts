import { Injectable } from '@nestjs/common';
import { ISettingsStorage } from '../interfaces/settings-storage/storage-settings.interface';

@Injectable()
export class Filesystem implements ISettingsStorage {
  get(name: string): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  set(name: string, value: unknown): Promise<void> {
    throw new Error('Method not implemented.');
  }
  remove(name: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  filepath: string;
}
