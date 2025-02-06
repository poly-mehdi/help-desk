import { Test, TestingModule } from '@nestjs/testing';
import { UpdateVariableUseCase } from './update-variable.use-case';
import { SettingsService } from '../../settings/services/settings.service';

describe('UpdateVariableUseCase', () => {
  let useCase: UpdateVariableUseCase;
  let settingsService: SettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateVariableUseCase,
        {
          provide: SettingsService,
          useValue: {
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<UpdateVariableUseCase>(UpdateVariableUseCase);
    settingsService = module.get<SettingsService>(SettingsService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });
});
