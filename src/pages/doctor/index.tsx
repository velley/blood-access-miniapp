import { View, Text } from "@tarojs/components";
import React, { useEffect } from "react";
import { AtAvatar, AtButton } from "taro-ui";
import { Empty } from "../../components/empty";
import { useAuthInfo } from "../../hooks/useLogin";
import { useRequest } from "../../hooks/useRequest";

import './index.scss';

export default function MyDoctor() {

  const [, patient] = useAuthInfo()
  const [ doctor, getDoctor ] = useRequest<any>('/miniapp/queryUserDoctor', {}, {auto: false});
  useEffect( () => {
    patient && getDoctor({patientId: patient?.patientId})
  }, [patient])

  return doctor ? (
    <View className="doc-container page grey-bg">
      <View className="top-header white-box shadow at-row at-row__justify--between">
				<AtAvatar circle image={doctor.headimageUrl}></AtAvatar>
        <View className="doc-info flex-1">
          <Text className="at-col at-col__offset-1">{doctor.realname}</Text>
          <Text className="at-col at-col__offset-1">{doctor.phone}</Text>
        </View>		
        <AtButton type='primary'>咨询</AtButton>		
			</View>
    </View>
  ) : <Empty></Empty>
}