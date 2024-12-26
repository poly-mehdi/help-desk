import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      username: 'test',
      name: 'test',
      email: 'test@test.com',
      phone: '1234567890',
      date: new Date(),
      appName: 'MyApp',
      status: 'Pending',
    };
    mockUsersService.create.mockReturnValue(createUserDto);
    const result = await controller.createUser(createUserDto);
    expect(result).toEqual(createUserDto);
    expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto);
  });

  it('should return all users', async () => {
    const users = [{ username: 'test', name: 'test', email: 'test@test.com' }];
    mockUsersService.findAll.mockReturnValue(users);
    const result = await controller.getAllUser();
    expect(result).toEqual({ users });
    expect(mockUsersService.findAll).toHaveBeenCalled();
  });

  it('should return a single user', async () => {
    const user = { username: 'test', name: 'test', email: 'test@test.com' };
    mockUsersService.findOne.mockReturnValue(user);
    const result = await controller.getUser('1');
    expect(result).toEqual({ user });
    expect(mockUsersService.findOne).toHaveBeenCalledWith('1');
  });

  it('should update a user', async () => {
    const updateUserDto: UpdateUserDto = {
      id: '1',
      username: 'updated',
      name: 'test',
      email: 'test@test.com',
      phone: '1234567890',
      date: new Date(),
      appName: 'MyApp',
      status: 'Pending',
    };
    const updatedUser = {
      username: 'updated',
      name: 'test',
      email: 'test@test.com',
      phone: '1234567890',
      date: new Date(),
      appName: 'MyApp',
      status: 'Pending',
    };
    mockUsersService.update.mockReturnValue(updatedUser);
    const result = await controller.updateUser('1', updateUserDto);
    expect(result).toEqual({
      updatedUser,
    });
    expect(mockUsersService.update).toHaveBeenCalledWith('1', updateUserDto);
  });

  it('should delete a user', async () => {
    const deletedUser = {
      username: 'test',
      name: 'test',
      email: 'test@test.com',
      phone: '1234567890',
      date: new Date(),
      appName: 'MyApp',
      status: 'Pending',
    };
    mockUsersService.remove.mockReturnValue(deletedUser);
    const result = await controller.remove('1');
    expect(result).toEqual({ deletedUser });
    expect(mockUsersService.remove).toHaveBeenCalledWith('1');
  });
});
