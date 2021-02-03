export interface FeedBackData {
  feedbackId?: number;
	patientId?: number;
  datetime?: string; 
  organizationId?: number;
  organizationName?: string;
  dmccd?: string;
  jmccd?: string;
  sp?: string;
  dp?: string;
  weight?: string;
  xgccImageUrl?: string;
  xgccImageUrlArray?: string[];
  hasReply?: 0 | 1;
  reply?: string;
  description?: string;
  readStatus?: 0 | 1;
}

export interface OrganData {
  organizationId: number;	
	code: string;
	name: string;
	describe: string;
	description: string;
}