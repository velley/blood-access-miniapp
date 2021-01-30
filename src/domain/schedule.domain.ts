export interface ScheduleTag {
	scheduleId: number;
	patientId: string;
	patientName: string;
	organizationId: number;
	organizationName: string;
	touxiTime: string;
	suitname: string;
	note?: string;
}