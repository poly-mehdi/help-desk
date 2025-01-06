import { Test, TestingModule } from '@nestjs/testing';
import { ClientJoinedQueueUseCase } from './client-joined-queue.use-case';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('ClientJoinedQueueUseCase', () => {
  let provider: ClientJoinedQueueUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientJoinedQueueUseCase, EventEmitter2],
    }).compile();

    provider = module.get<ClientJoinedQueueUseCase>(ClientJoinedQueueUseCase);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
