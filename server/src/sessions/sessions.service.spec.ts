import { Test, TestingModule } from '@nestjs/testing';
import { SessionsService } from './sessions.service';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Session } from './schemas/session.schema';
import { SessionStatus } from './models/session-status.enum';
import { UpdateSessionDto } from './dto/update-session.dto';
import { CreateSessionDto } from './dto/create-session.dto';
import { Participant } from './schemas/participant.schema';
import { ParticipantRole } from './models/participant-role.enum';

const mockSession = {
  id: '1',
  participants: [
    {
      id: 'p1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
      role: ParticipantRole.Customer,
    },
  ],
  status: SessionStatus.Pending,
  isResolved: false,
  save: jest.fn(),
};

const sessionsArray: Session[] = [
  {
    id: '1',
    participants: [
      {
        id: 'p1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '1234567890',
        role: ParticipantRole.Customer,
      },
    ],
    status: SessionStatus.Pending,
    isResolved: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    participants: [
      {
        id: 'p2',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '1234567890',
        role: ParticipantRole.Customer,
      },
    ],
    status: SessionStatus.Pending,
    isResolved: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe('SessionsService', () => {
  let service: SessionsService;
  let model: Model<Session>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionsService,
        {
          provide: getModelToken('Session'),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(SessionsService);
    model = module.get<Model<any>>(getModelToken('Session'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a session', async () => {
    const createSessionDto: CreateSessionDto = {
      isResolved: false,
      status: SessionStatus.Pending,
    };

    jest.spyOn(model, 'create').mockResolvedValueOnce(mockSession as any);
    const result = await service.create(createSessionDto);

    expect(result).toEqual(mockSession);
    expect(model.create).toHaveBeenCalledWith(createSessionDto);
  });

  it('should return all sessions', async () => {
    jest.spyOn(model, 'find').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(sessionsArray),
    } as any);

    const result = await service.findAll();

    expect(result).toEqual(sessionsArray);
    expect(model.find).toHaveBeenCalledTimes(1);
  });

  it('should return a single session', async () => {
    jest.spyOn(model, 'findById').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(mockSession),
    } as any);

    const result = await service.findOne('1');

    expect(result).toEqual(mockSession);
    expect(model.findById).toHaveBeenCalledWith('1');
  });

  it('should update a session', async () => {
    const participant: Participant = {
      id: '1',
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      role: ParticipantRole.Customer,
    };
    const updateSessionDto: UpdateSessionDto = {
      participants: [participant],
      status: SessionStatus.Completed,
      meetingId: '1',
      roomUrl: 'test.com',
      hostRoomUrl: 'test.com',
      isResolved: true,
      issueType: 'general-inquiry',
      description: 'test',
    };

    const updatedSession = {
      ...mockSession,
      ...updateSessionDto,
    };

    jest.spyOn(model, 'findByIdAndUpdate').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(updatedSession),
    } as any);

    const result = await service.update('1', updateSessionDto);

    expect(result).toEqual(updatedSession);
    expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
      '1',
      updateSessionDto,
      {
        new: true,
      },
    );
  });

  it('should delete a session', async () => {
    jest.spyOn(model, 'findByIdAndDelete').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(mockSession),
    } as any);

    const result = await service.delete('1');

    expect(result).toEqual(mockSession);
    expect(model.findByIdAndDelete).toHaveBeenCalledWith('1');
  });

  it('should add a participant to the session', async () => {
    jest.spyOn(model, 'findById').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(mockSession),
    } as any);

    const participantData = {
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice@example.com',
      role: ParticipantRole.Customer,
    };

    await service.addParticipant('1', participantData);

    expect(mockSession.participants).toContainEqual(participantData);
    expect(mockSession.save).toHaveBeenCalled();
  });

  it('should throw an error if session not found', async () => {
    jest.spyOn(model, 'findById').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(null),
    } as any);

    await expect(
      service.addParticipant('1', {
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice@example.com',
        role: ParticipantRole.Assistant,
      }),
    ).rejects.toThrow('Session not found');
  });

  it('should update a participant in the session', async () => {
    jest.spyOn(model, 'findById').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(mockSession),
    } as any);

    const updateData = { phone: '9876543210' };

    const result = await service.updateParticipant('1', 'p1', updateData);

    expect(result.participants[0].phone).toBe('9876543210');
    expect(mockSession.save).toHaveBeenCalled();
  });

  it('should throw an error if session not found when update', async () => {
    jest.spyOn(model, 'findById').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(null),
    } as any);

    await expect(
      service.updateParticipant('1', 'p1', { phone: '9876543210' }),
    ).rejects.toThrow('Session not found');
  });

  it('should throw an error if participant not found', async () => {
    jest.spyOn(model, 'findById').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(mockSession),
    } as any);

    await expect(
      service.updateParticipant('2', 'p99', { phone: '9876543210' }),
    ).rejects.toThrow('Participant not found');
  });
});
