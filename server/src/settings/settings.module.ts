import { Module } from '@nestjs/common';
import { SettingsService } from './services/settings.service';
import { Filesystem } from './storage/filesystem';

@Module({
  providers: [
    SettingsService,
    Filesystem,
    {
      provide: 'settings.storage',
      useFactory: () => {
        const storage = new Filesystem();
        storage.filepath = 'settings.json';
        return storage;
      },
    },
  ],
  exports: [SettingsService],
})
export class SettingsModule {}
