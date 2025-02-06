import { Filesystem } from './filesystem';
import * as fs from 'node:fs/promises';

jest.mock('node:fs/promises');

describe('Filesystem', () => {
  let filesystem: Filesystem;

  beforeEach(() => {
    filesystem = new Filesystem();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('should return the value for the given key', async () => {
      const mockSettings = { key1: 'value1' };
      (fs.readFile as jest.Mock).mockResolvedValue(
        JSON.stringify(mockSettings),
      );

      const result = await filesystem.get('key1');
      expect(result).toBe('value1');
    });

    it('should return undefined if the key does not exist', async () => {
      const mockSettings = { key1: 'value1' };
      (fs.readFile as jest.Mock).mockResolvedValue(
        JSON.stringify(mockSettings),
      );

      const result = await filesystem.get('key2');
      expect(result).toBeUndefined();
    });

    it('should return undefined if the file does not exist', async () => {
      (fs.readFile as jest.Mock).mockRejectedValue({ code: 'ENOENT' });

      const result = await filesystem.get('key1');
      expect(result).toBeUndefined();
    });
  });

  describe('set', () => {
    it('should set the value for the given key', async () => {
      const mockSettings = { key1: 'value1' };
      (fs.readFile as jest.Mock).mockResolvedValue(
        JSON.stringify(mockSettings),
      );
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);

      await filesystem.set('key2', 'value2');

      expect(fs.writeFile).toHaveBeenCalledWith(
        'data/settings.json',
        JSON.stringify({ key1: 'value1', key2: 'value2' }, null, 2),
      );
    });
  });

  describe('remove', () => {
    it('should remove the value for the given key', async () => {
      const mockSettings = { key1: 'value1', key2: 'value2' };
      (fs.readFile as jest.Mock).mockResolvedValue(
        JSON.stringify(mockSettings),
      );
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);

      await filesystem.remove('key1');

      expect(fs.writeFile).toHaveBeenCalledWith(
        'data/settings.json',
        JSON.stringify({ key2: 'value2' }, null, 2),
      );
    });
  });
});
