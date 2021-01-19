export interface NotifyData{
  notifyId: number;
  content: string;
  sendTime: string;
  type: 1 | 2;
  readStatus: 0 | 1;
}