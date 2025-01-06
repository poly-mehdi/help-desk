export interface INotifyService {
  sendNotification(message: string): Promise<void>;
}
