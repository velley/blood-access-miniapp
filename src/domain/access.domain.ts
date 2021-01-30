export interface AccessData {
	treatmentId?: number;
	patientId: number;
	patientName?: string;
	patientGroupId?: number;
	patientGroupName?: string;
	organizationId: string;
	organizationName: string;
	djmnlNlcjsj: string; //内瘘创建时间
	djmnlNlsysc: string; //内瘘使用时长
	djmnlNlbw: string; //内瘘部位
	djmnlNlsypl: string; //内瘘使用频率
	djmnlNlkwz: string[]; //内瘘口位置
	djmnlNlkqk: string; //内瘘口情况
	djmnlNlkll: string; //内瘘口流量
	djmnlNlkdx: string; //	内瘘口大小		文本
	djmnlDjmccjybqk: string; //动脉穿刺点一般情况
	djmnlCcjzwpfybqk: string; // 穿刺点周围皮肤一般情况;	
	djmnlDmccqnjnmbx:string; //	静脉穿刺区内径、内膜表现		文本
	djmnlCcfx: string;//	穿刺方向		动静脉、向心、离心
	djmnlCcdxz: string[];//	穿刺点选择		图片
	djmnlCccgl: number;//	穿刺成功率	%	数值
	djmnlTxll: number;//	透析流量	ml/min	数值
	djmnlJmy: number;//	静脉压	mmHg	数值
	djmnlDmy: string;//	动脉压	mmHg	数值
	djmnlThypsc:number;//	透后压迫时长	分钟	数值				
	szdjmnlJcbw: string; //	检查部位		文本
	szdjmnlRdmtjwhsh: number; //	桡动脉头静吻合术后	年	数值
	szdjmnlCcpl: number; //	穿刺频率	次/周	数值
	szdjmnlXdmnj: number; //	肱动脉内径	mm	数值
	szdjmnlXdmxll: number;//	肱动脉血流量	ml/min	数值
	szdjmnlXdmri: string; //	肱动脉RI		文本
	szdjmnlXdmnm: string; //	肱动脉内膜		文本
	szdjmnlRdmqsdnj: number; //	桡动脉起始段内径	mm	数值
	szdjmnlRdmzdnj: number; //	桡动脉中段内径	mm	数值
	szdjmnlWhkjxdnj: number; //	吻合口近心端内径	mm	数值
	szdjmnlWhkyxdnj: number; //	吻合口远心端内径	mm	数值
	szdjmnlWhknj: number;	//吻合口内径	mm	数值
	szdjmnlWhkghqk: string; //	吻合口钙化情况		是/否
	szdjmnlWhktjmnj: number; //	吻合口头静脉内径	mm	数值
	szdjmnlQbzdtjmnj:number; //	前臂中段头静脉内径	mm	数值
	szdjmnlJzbtjmnj: number; //	近肘部头静脉内径	mm	数值
	szdjmnlZbgyjmnj: number; //	肘部贵要静脉内径	mm	数值
	szdjmnlZbtjm: number; //	肘部头静脉	mm	数值
	szdjmnlSbzdtjmnj: number; //	上臂中段头静脉内径	mm	数值
	szdjmnlSbzdtjmxzc: number; //	上臂中段头静脉狭窄处	mm	数值
	szdjmnlSbzdtjmcd: number; //上臂中段头静脉长度	mm	数值
	szdjmnlNlshdmhhdsxjmxzd: number;// 	内瘘术后动脉化后的上行静脉狭窄点	mm	数值
	szdjmnlNlshdmhhdsxjmcd: number; //	内瘘术后动脉化后的上行静脉长度	mm	数值
	szdjmnlDmccqaccd: string; //	动脉穿刺区A穿刺点		文本
	szdjmnlDmccqaccdcd: number; //	动脉穿刺区A穿刺点长度	cm	数值
	szdjmnlDmccqbccd: string; //	动脉穿刺区B穿刺点		文本
	szdjmnlDmccqbccdcd: number; //	动脉穿刺区B穿刺点长度	cm	数值
	szdjmnlJmccq1ccd: string; 	//静脉穿刺区1穿刺点		文本
	szdjmnlJmccq1ccdcd: number;//	静脉穿刺区1穿刺点长度	cm	数值
	szdjmnlJmccq2ccd: string; //	静脉穿刺区2穿刺点		文本
	szdjmnlJmccq2ccdcd: number; //	静脉穿刺区2穿刺点长度	cm	数值
	szdjmnlJmccq3ccd: string; //	静脉穿刺区3穿刺点		文本
	szdjmnlJmccq3ccdcd: number; //	静脉穿刺区3穿刺点长度	cm	数值
	szdjmnlJmccq4ccd: string //	静脉穿刺区4穿刺点		文本
	szdjmnlMjccq4ccdcd: number; //	静脉穿刺区4穿刺点长度	cm	数值
	cdt: string;
}