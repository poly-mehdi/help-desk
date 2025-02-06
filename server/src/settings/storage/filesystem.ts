import { Injectable, Logger, Optional } from '@nestjs/common';
import { ISettingsStorage } from '../interfaces/settings-storage/storage-settings.interface';
import * as fs from 'node:fs/promises';

@Injectable()
export class Filesystem implements ISettingsStorage {
  filepath: string = 'data/settings.json';

  async get(name: string): Promise<unknown> {
    let settings = {};
    settings = await this.load();

    return settings[name];
  }

  async set(name: string, value: unknown): Promise<void> {
    let settings = {};
    settings = await this.load();
    settings[name] = value;

    await this.store(settings);
  }

  async remove(name: string): Promise<void> {
    let settings = {};
    settings = await this.load();
    delete settings[name];

    await this.store(settings);
  }

  private async load(): Promise<Record<string, unknown>> {
    try {
      const data = await fs.readFile(this.filepath, 'utf-8');
      const settings = JSON.parse(data);
      return settings;
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        return {};
      }
      throw new Error(`Failed to read settings: ${error.message}`);
    }
  }

  private async store(settings: Record<string, unknown>): Promise<void> {
    try {
      await fs.writeFile(this.filepath, JSON.stringify(settings, null, 2));
    } catch (error: any) {
      throw new Error(`Failed to save settings: ${error.message}`);
    }
  }
}
