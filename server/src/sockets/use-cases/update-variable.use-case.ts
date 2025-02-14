import { Injectable } from '@nestjs/common';
import { SettingsService } from '../../settings/services/settings.service';
import { IUseCase } from '../services/use-case-bus.service';

@Injectable()
export class UpdateVariableUseCase
  implements IUseCase<{ name: string; value: unknown }>
{
  constructor(private readonly SettingsService: SettingsService) {}

  async execute(data: { name: string; value: unknown }): Promise<void> {
    await this.SettingsService.set(data.name, data.value);
  }
}
