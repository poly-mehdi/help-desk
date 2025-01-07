import { Test, TestingModule } from '@nestjs/testing';
import { StartAssistanceUseCase } from './start-assistance.use-case';

describe('StartAssistanceUseCase', () => {
  let provider: StartAssistanceUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StartAssistanceUseCase],
    }).compile();

    provider = module.get<StartAssistanceUseCase>(StartAssistanceUseCase);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
