import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';

const mockUserModel = {
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: usersProviders[0].provide,
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto = {
      username: 'test',
      password: 'test',
      email: 'test@test.com',
      phone: '1234567890',
      date: new Date(),
      appName: 'MyApp',
      status: 'Pending',
    };
    mockUserModel.create.mockReturnValue(createUserDto);
    const result = await service.create(createUserDto);
    expect(result).toEqual(createUserDto);
    expect(mockUserModel.create).toHaveBeenCalledWith(createUserDto);
  });

  it('should return all users', async () => {
    const users = [
      { username: 'test', password: 'test', email: 'test@test.com' },
    ];
    mockUserModel.find.mockReturnValue(users);
    const result = await service.findAll();
    expect(result).toEqual(users);
    expect(mockUserModel.find).toHaveBeenCalled();
  });

  it('should return a single user', async () => {
    const user = { username: 'test', password: 'test', email: 'test@test.com' };
    mockUserModel.findById.mockReturnValue(user);
    const result = await service.findOne('1');
    expect(result).toEqual(user);
    expect(mockUserModel.findById).toHaveBeenCalledWith('1');
  });

  it('should update a user', async () => {
    const updateUserDto = {
      id: '1',
      username: 'updated',
      password: 'test',
      email: 'test@test.com',
      phone: '1234567890',
      date: new Date(),
      appName: 'MyApp',
      status: 'Pending',
    };
    const updatedUser = {
      username: 'updated',
      password: 'test',
      email: 'test@test.com',
      phone: '1234567890',
      date: new Date(),
      appName: 'MyApp',
      status: 'Pending',
    };
    mockUserModel.findByIdAndUpdate.mockReturnValue(updatedUser);
    const result = await service.update('1', updateUserDto);
    expect(result).toEqual(updatedUser);
    expect(mockUserModel.findByIdAndUpdate).toHaveBeenCalledWith(
      '1',
      updateUserDto,
    );
  });

  it('should delete a user', async () => {
    const deletedUser = {
      username: 'test',
      password: 'test',
      email: 'test@test.com',
      phone: '1234567890',
      date: new Date(),
      appName: 'MyApp',
      status: 'Pending',
    };
    mockUserModel.findByIdAndDelete.mockReturnValue(deletedUser);
    const result = await service.remove('1');
    expect(result).toEqual(deletedUser);
    expect(mockUserModel.findByIdAndDelete).toHaveBeenCalledWith('1');
  });
});
