import { View, Text, Image } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import React from 'react'
import { PreviewImage } from "../../../components/preview-image";
import { AccessData } from "../../../domain/access.domain";
import { useRequest } from "../../../hooks/useRequest";
import { timeToString } from "../../../utils/format";

import './index.scss'

export default function AccessDetail() {

  const router = useRouter();
  const [detail] = useRequest<AccessData>('/miniapp/checkTreatment', { treatmentId: parseInt(router.params.id) });

  return detail && (
    <View className="access-detail page scroll-y">
      <View className="text-cell">
        <Text className="title">患者编号：</Text>
        <Text>{detail.patientId}</Text>
      </View>
      <View className="text-cell">
        <Text className="title">患者姓名：</Text>
        <Text>{detail.patientName}</Text>
      </View>
      <View className="text-cell">
        <Text className="title">血透中心：</Text>
        <Text>{detail.organizationName}</Text>
      </View>

      <View className="dash-line"></View>

      <View className="info-group" nz-row>
        <View className="sub-title" nz-col >
          <Text>动静脉内瘘情况</Text>
        </View>
        <View className="text-cell" nz-col>
          <Text className="info-title">内瘘创建时间：</Text>
          <Text className="info-content">{timeToString(detail.djmnlNlcjsj)}</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">内瘘口大小：</Text>
          <Text className="info-content">{detail.djmnlNlkdx}</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">内瘘使用时长：</Text>
          <Text className="info-content">{detail.djmnlNlsysc}周</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">内瘘部位：</Text>
          <Text className="info-content">{detail.djmnlNlbw}</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">内瘘口位置：</Text>
          <Text className="info-content">{detail.djmnlNlkwz}</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">内瘘口情况：</Text>
          <Text className="info-content">{detail.djmnlNlkqk}</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">内瘘口流量：</Text>
          <Text className="info-content">{detail.djmnlNlkll}</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">内瘘使用频率：</Text>
          <Text className="info-content">{detail.djmnlNlsypl}次/周</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">动静脉穿刺点一般情况：</Text>
          <Text className="info-content">{detail.djmnlDjmccjybqk}</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">穿刺点周围皮肤情况：</Text>
          <Text className="info-content">{detail.djmnlCcjzwpfybqk}</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">静脉穿刺区内径、内膜表现：</Text>
          <Text className="info-content">{detail.djmnlDmccqnjnmbx}</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">穿刺方向：</Text>
          <Text className="info-content">{detail.djmnlCcfx}</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">穿刺成功率：</Text>
          <Text className="info-content">{detail.djmnlCccgl}%</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">透析流量：</Text>
          <Text className="info-content">{detail.djmnlTxll}ml/min</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">静脉压：</Text>
          <Text className="info-content">{detail.djmnlJmy}mmHg</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">动脉压：</Text>
          <Text className="info-content">{detail.djmnlDmy}mmHg</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">透析压迫时长：</Text>
          <Text className="info-content">{detail.djmnlThypsc}分钟</Text>
        </View>
      </View>

      <View className="dash-line"></View>

      <View className="info-group" nz-row>
        <View className="sub-title" nz-col >
          <Text >上肢动静脉内瘘超声报告</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">检查部位：</Text>
          <Text className="info-content">{detail.szdjmnlJcbw}</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">桡动脉头静吻合术后：</Text>
          <Text className="info-content">{detail.szdjmnlRdmtjwhsh}年</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">穿刺频率：</Text>
          <Text className="info-content">{detail.szdjmnlCcpl}次/周</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">肱动脉内径：</Text>
          <Text className="info-content">{detail.szdjmnlXdmnj}mm</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">肱动脉流量：</Text>
          <Text className="info-content">{detail.szdjmnlXdmxll}ml/min</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">肱动脉RI：</Text>
          <Text className="info-content">{detail.szdjmnlXdmri}</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">肱动脉内膜：</Text>
          <Text className="info-content">{detail.szdjmnlXdmnm}</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">桡动脉起始段内径：</Text>
          <Text className="info-content">{detail.szdjmnlRdmqsdnj}mm</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">桡动脉中段内径：</Text>
          <Text className="info-content">{detail.szdjmnlRdmzdnj}mm</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">吻合口近心端内径：</Text>
          <Text className="info-content">{detail.szdjmnlWhkjxdnj}mm</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">吻合口远心端内径：</Text>
          <Text className="info-content">{detail.szdjmnlWhkyxdnj}mm</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">吻合口内径：</Text>
          <Text className="info-content">{detail.szdjmnlWhknj}mm</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">吻合口钙化情况：</Text>
          <Text className="info-content">{detail.szdjmnlWhkghqk ? '是' : '否'}</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">吻合口头静脉内径：</Text>
          <Text className="info-content">{detail.szdjmnlWhktjmnj}mm</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">前臂中段头静脉内径：</Text>
          <Text className="info-content">{detail.szdjmnlQbzdtjmnj}mm</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">近肘部头静脉内径：</Text>
          <Text className="info-content">{detail.szdjmnlJzbtjmnj}mm</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">肘部贵要静脉内径：</Text>
          <Text className="info-content">{detail.szdjmnlZbgyjmnj}mm</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">肘部头静脉：</Text>
          <Text className="info-content">{detail.szdjmnlZbtjm}mm</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">上臂中段头静脉内径：</Text>
          <Text className="info-content">{detail.szdjmnlSbzdtjmnj}mm</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">臂中段头静脉狭窄处：</Text>
          <Text className="info-content">{detail.szdjmnlSbzdtjmxzc}mm</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">上臂中段头静脉长度：</Text>
          <Text className="info-content">{detail.szdjmnlSbzdtjmcd}mm</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">内瘘术后动脉化后的上行静脉狭窄点：</Text>
          <Text className="info-content">{detail.szdjmnlNlshdmhhdsxjmxzd}mm</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">内瘘术后动脉化后的上行静脉长度：</Text>
          <Text className="info-content">{detail.szdjmnlNlshdmhhdsxjmcd}mm</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">动脉穿刺区A穿刺点：</Text>
          <Text className="info-content">{detail.szdjmnlDmccqaccd}</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">动脉穿刺区A穿刺点长度：</Text>
          <Text className="info-content">{detail.szdjmnlDmccqaccdcd}cm</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">动脉穿刺区B穿刺点：</Text>
          <Text className="info-content">{detail.szdjmnlDmccqbccd}</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">动脉穿刺区B穿刺点长度：</Text>
          <Text className="info-content">{detail.szdjmnlDmccqbccdcd}cm</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">静脉穿刺区1穿刺点：</Text>
          <Text className="info-content">{detail.szdjmnlJmccq1ccd}</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">静脉穿刺区1穿刺点长度：</Text>
          <Text className="info-content">{detail.szdjmnlJmccq1ccdcd}cm</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">静脉穿刺区2穿刺点：</Text>
          <Text className="info-content">{detail.szdjmnlJmccq2ccd}</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">静脉穿刺区2穿刺点长度：</Text>
          <Text className="info-content">{detail.szdjmnlJmccq2ccdcd}cm</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">静脉穿刺区3穿刺点：</Text>
          <Text className="info-content">{detail.szdjmnlJmccq3ccd}</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">静脉穿刺区3穿刺点长度：</Text>
          <Text className="info-content">{detail.szdjmnlJmccq3ccdcd}cm</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">静脉穿刺区4穿刺点：</Text>
          <Text className="info-content">{detail.szdjmnlJmccq4ccd}</Text>
        </View>
        <View className="text-cell" nz-col >
          <Text className="info-title">静脉穿刺区4穿刺点长度：</Text>
          <Text className="info-content">{detail.szdjmnlMjccq4ccdcd}cm</Text>
        </View>
      </View>

      <View className="photo-group">
        {
          detail.djmnlCcdxz.map( item => (
            <PreviewImage src={[item]} />
          ))
        }        
      </View>
    </View>   
  )
}