import { ScrollView, View, Text } from "@tarojs/components";
import React, { useEffect } from "react";
import { Empty } from "../../components/empty";
import { ScheduleTag } from "../../domain/schedule.domain";
import { useAuthInfo } from "../../hooks/useLogin";
import { usePagingData } from "../../hooks/usePagingData"
import { timeToString } from "../../utils/format";

import './index.scss';

export default function ScheduleList() {

  const [, patient]     = useAuthInfo();
  const [list, action ] = usePagingData<ScheduleTag>('/miniapp/queryScheduleByPage', {patientId: patient?.patientId}, {manual: true})

  useEffect( () => {
    if(patient) action.setFilters({patientId: patient?.patientId})
  }, [patient])

  return list && (
    <ScrollView className="schedule-container page grey-bg " scrollY onScrollToLower={_ => action.nextPage()}>     
      {
        list.length ? list.map( item => (
          <View 
            className="item white-box"                   
          >              
            <View className="info">
              <View className="info-cell m-text">血透机构：{item.organizationName}</View>              
              <View className="info-cell m-text">套餐：{item.suitname}</View>
              <View className="info-cell m-text">备注：{item.note}</View>
            </View> 
            <View className="time">
              <View className='at-icon at-icon-clock'></View>
              <Text >{ timeToString(item.touxiTime) }</Text>              
            </View>             
          </View>
        )) : <Empty></Empty>
      }              
    </ScrollView>
  )
}