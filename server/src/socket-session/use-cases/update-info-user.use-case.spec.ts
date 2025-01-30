import { Test, TestingModule } from '@nestjs/testing';
import { UpdateInfoUserUseCase } from './update-info-user.use-case';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SessionsService } from '../../sessions/sessions.service';

describe('UpdateInfoUserUseCase', () => {
  let useCase: UpdateInfoUserUseCase;
  let sessionService: SessionsService;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateInfoUserUseCase,
        {
          provide: SessionsService,
          useValue: {
            updateParticipant: jest.fn(),
          },
        },
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<UpdateInfoUserUseCase>(UpdateInfoUserUseCase);
    sessionService = module.get<SessionsService>(SessionsService);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should update user info', async () => {
    const sessionId = '1';
    const participantId = '1';
    const phone = '123456789';
    await useCase.execute({ sessionId, participantId, phone });
    expect(sessionService.updateParticipant).toHaveBeenCalledWith(
      sessionId,
      participantId,
      { phone },
    );
    expect(eventEmitter.emit).toHaveBeenCalledWith('update.info.user', {
      session: undefined,
    });
  });
});
