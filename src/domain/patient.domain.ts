export interface PatientData {
	patientId: number;	
	patientGroupId: string;
	patientGroupName: string;
	name: string;
	idcardNo: string;
	phone: string;
	age: number;
	sex: 0 | 1 | 2;
	area: string;
	lifeArea: string;
	job: string;
	wechatInfoArray: any[];
}