import { Test, TestingModule } from '@nestjs/testing';
import { UpdateInfoUserUseCase } from './update-info-user.use-case';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SessionsService } from '../../sessions/sessions.service';
import { getModelToken } from '@nestjs/mongoose';

describe('UpdateInfoUserUseCase', () => {
  let provider: UpdateInfoUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateInfoUserUseCase,
        EventEmitter2,
        SessionsService,
        {
          provide: getModelToken('Session'),
          useValue: {},
        },
      ],
    }).compile();

    provider = module.get<UpdateInfoUserUseCase>(UpdateInfoUserUseCase);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
