import { Test, TestingModule } from '@nestjs/testing';
import { WherebyService } from './whereby.service';
import { HttpService } from '@nestjs/axios';

describe('WherebyService', () => {
  let service: WherebyService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WherebyService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WherebyService>(WherebyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
