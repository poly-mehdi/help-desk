import { Test, TestingModule } from '@nestjs/testing';
import { SessionsService } from './sessions.service';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Session } from './schema/sessions.schema';

const mockSession = {
  _id: '1',
  firstName: 'test',
  lastName: 'test',
  email: 'test@test.com',
};

const sessionsArray = [
  { firstName: 'test1', lastName: 'test1', email: 'test1@test.com', _id: '1' },
  { firstName: 'test2', lastName: 'test2', email: 'test2@test.com', _id: '2' },
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
    const createSessionDto = {
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.com',
      phone: '1234567890',
      date: new Date(),
      appName: 'MyApp',
      status: 'Pending',
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
    const updateSessionDto = {
      firstName: 'updated',
      lastName: 'updated-name',
      email: 'updated@test.com',
      phone: '9876543210',
      date: new Date(),
      appName: 'UpdatedApp',
      status: 'Updated',
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
});
