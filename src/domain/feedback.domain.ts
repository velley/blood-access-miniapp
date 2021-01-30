export interface FeedBackData {
  feedbackId?: number;
	patientId?: number;
  datetime?: string; 
  organizationId?: number;
  dmccd?: string;
  jmccd?: string;
  sp?: string;
  dp?: string;
  weight?: string;
  xgccImageUrl?: string;
  hasReply?: 0 | 1;
  reply?: string;
  description?: string;
}

export interface OrganData {
  organizationId: number;	
	code: string;
	name: string;
	describe: string;
	description: string;
}