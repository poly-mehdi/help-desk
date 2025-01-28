import { Test, TestingModule } from '@nestjs/testing';
import { SettingsService } from './settings.service';
import { ISettingsStorage } from '../interfaces/settings-storage/storage-settings.interface';

describe('SettingsService', () => {
  let service: SettingsService;
  let mockStorage: Partial<ISettingsStorage>;

  beforeEach(async () => {
    mockStorage = {
      get: jest.fn().mockResolvedValue('mockValue'),
      set: jest.fn().mockResolvedValue(undefined),
      remove: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SettingsService,
        {
          provide: 'settings.storage',
          useValue: mockStorage,
        },
      ],
    }).compile();

    service = module.get<SettingsService>(SettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
