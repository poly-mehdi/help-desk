import { Test, TestingModule } from '@nestjs/testing';
import { GetSettingsUseCase } from './get-settings.use-case';
import { SettingsService } from '../../settings/services/settings.service';

describe('GetSettingsUseCase', () => {
  let useCase: GetSettingsUseCase;
  let settingsService: SettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetSettingsUseCase,
        {
          provide: SettingsService,
          useValue: {
            get: jest.fn().mockResolvedValue(0),
          },
        },
      ],
    }).compile();

    useCase = module.get<GetSettingsUseCase>(GetSettingsUseCase);
    settingsService = module.get<SettingsService>(SettingsService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });
});
