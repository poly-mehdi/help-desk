import { Injectable } from '@nestjs/common';
import { SettingsService } from '../../settings/services/settings.service';

@Injectable()
export class GetSettingsUseCase {
  constructor(private readonly settingsService: SettingsService) {}

  async execute() {
    const settings: Record<string, unknown> = {};
    settings.delay = (await this.settingsService.get('delay')) as number;
    return settings;
  }
}
