import { Test, TestingModule } from '@nestjs/testing';
import { Filesystem } from './filesystem';

describe('Filesystem', () => {
  let provider: Filesystem;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Filesystem],
    }).compile();

    provider = module.get<Filesystem>(Filesystem);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
