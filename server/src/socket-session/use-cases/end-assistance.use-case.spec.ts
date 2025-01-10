import { Test, TestingModule } from '@nestjs/testing';
import { SessionsService } from '../../sessions/sessions.service';
import { getModelToken } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { EndAssistanceUseCase } from './end-assistance.use-case';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('EndAssistanceUseCase', () => {
  let provider: EndAssistanceUseCase;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EndAssistanceUseCase,
        SessionsService,
        EventEmitter2,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
        {
          provide: getModelToken('Session'),
          useValue: {},
        },
      ],
    }).compile();

    provider = module.get<EndAssistanceUseCase>(EndAssistanceUseCase);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
