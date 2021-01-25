export interface NotifyData{
  notifyId: number;
  taskRecordId: number;
  content: string;
  sendTime: string;
  type: 1 | 2;
  readStatus: 0 | 1;
  notifyTime: string;
  notifyContent: string;
}