import { View, Text } from "@tarojs/components";
import React, { useEffect } from 'react'
import { AccessData } from "../../../domain/access.domain";
import { useAuthInfo } from "../../../hooks/useLogin";
import { usePagingData } from "../../../hooks/usePagingData";
import { timeToString } from "../../../utils/format";
import Taro from '@tarojs/taro'
import './index.scss'
import { Empty } from "../../../components/empty";
import { AtButton } from "taro-ui";

export default function AccessList () {
  const [, patient] = useAuthInfo(true)
  const [list, action] = usePagingData<AccessData>('/miniapp/queryTreatmentByPage', {patientId: patient?.patientId}, {manual: true});

  useEffect( () => {
    if(patient) action.setFilters({patientId: patient?.patientId})
  }, [patient])

  return list && (
    <View className="page grey-bg col-page scroll-y">
      {
        list.length ? list.map( item => (
          <View className="item white-box" onClick={ _ => Taro.navigateTo({url: `/pages/access/detail/index?id=${item.treatmentId}`}) }>
            <View className="info-item">
              <Text className="titile m-text">记录时间：</Text>
              <Text className="m-text">{timeToString(item.cdt)}</Text>              
            </View>
            <View className="info-item">
              <Text className="titile m-text">血透中心：</Text>
              <Text className="m-text">{item.organizationName}</Text>   
            </View>
            <View className='at-icon at-icon-chevron-right'></View>
          </View>
        )) : <Empty></Empty>
      }
    </View>
  )
}