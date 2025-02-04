export interface ISettingsStorage {
  get(name: string): Promise<unknown>;
  set(name: string, value: unknown): Promise<void>;
  remove(name: string): Promise<void>;
}
