import { Test, TestingModule } from '@nestjs/testing';
import { JoinSessionUseCase } from './join-session.use-case';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SessionsService } from '../../sessions/sessions.service';
import { SettingsService } from '../../settings/services/settings.service';

describe('JoinSessionUseCase', () => {
  let useCase: JoinSessionUseCase;
  let eventEmitter: EventEmitter2;
  let sessionService: SessionsService;
  let settingsService: SettingsService;

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
        {
          provide: SettingsService,
          useValue: {
            get: jest.fn().mockResolvedValue(0),
          },
        },
      ],
    }).compile();

    useCase = module.get<JoinSessionUseCase>(JoinSessionUseCase);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
    sessionService = module.get<SessionsService>(SessionsService);
    settingsService = module.get<SettingsService>(SettingsService);
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
      delay: 0,
      roomUrl: 'room1',
      sessionId: data.sessionId,
      participantId: data.participantId,
    });
  });
});
