import { Test, TestingModule } from '@nestjs/testing';
import { JoinSessionUseCase } from './join-session.use-case';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SessionsService } from '../../sessions/sessions.service';

describe('JoinSessionUseCase', () => {
  let useCase: JoinSessionUseCase;
  let eventEmitter: EventEmitter2;
  let sessionService: SessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JoinSessionUseCase,
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
          },
        },
        {
          provide: SessionsService,
          useValue: {
            findOne: jest.fn().mockResolvedValue({ roomUrl: 'room1' }),
          },
        },
      ],
    }).compile();

    useCase = module.get<JoinSessionUseCase>(JoinSessionUseCase);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
    sessionService = module.get<SessionsService>(SessionsService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });
  it('should emit participant.joined event', async () => {
    const data = {
      sessionId: '1',
      participantId: '2',
    };

    await useCase.execute(data);

    expect(eventEmitter.emit).toHaveBeenCalledWith('participant.joined', {
      roomUrl: 'room1',
      sessionId: data.sessionId,
      participantId: data.participantId,
    });
  });
});
