import { View, Text } from "@tarojs/components";
import React from "react";
import { AtAvatar, AtButton } from "taro-ui";

import './index.scss';

export default function MyDoctor() {

  return (
    <View className="doc-container page grey-bg">
      <View className="top-header white-box shadow at-row at-row__justify--between">
				<AtAvatar circle image='https://jdc.jd.com/img/200'></AtAvatar>
        <View className="doc-info flex-1">
          <Text className="at-col at-col__offset-1">医生姓名</Text>
          <Text className="at-col at-col__offset-1">医生科室</Text>
        </View>		
        <AtButton type='primary'>咨询</AtButton>		
			</View>
    </View>
  )
}