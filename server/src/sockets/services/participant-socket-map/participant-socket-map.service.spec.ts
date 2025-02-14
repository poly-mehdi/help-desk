import { Test, TestingModule } from '@nestjs/testing';
import { ParticipantSocketMapService } from './participant-socket-map.service';

describe('ParticipantSocketMapService', () => {
  let service: ParticipantSocketMapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParticipantSocketMapService],
    }).compile();

    service = module.get<ParticipantSocketMapService>(ParticipantSocketMapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
