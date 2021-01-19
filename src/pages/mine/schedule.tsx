import { View, Text } from "@tarojs/components";
import React from "react";
import { useRequest } from "../../hooks/useRequest";


export function Schedule() {

  // const [ schedule, getSchedule ] = useRequest('/XX');

  return (
    <View className="schedule-container white-box">
      <View className="title">我的排期</View>
      <View className="info">2020-2-3 下周三</View>
    </View>
  )
}