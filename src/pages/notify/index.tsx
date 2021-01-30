import { View } from "@tarojs/components"
import React, { useEffect } from "react";
import Taro, { useDidShow } from '@tarojs/taro';
import { AtTag } from "taro-ui"
import { NotifyData } from "../../domain/notify.domain"
import { usePagingData } from "../../hooks/usePagingData";

import './index.scss'
import { timeToString } from "../../utils/format";
import { Empty } from "../../components/empty";
import { useAuthInfo } from "../../hooks/useLogin";

export default function Notify() {

  const [, patient]     = useAuthInfo(true);  
  const [notifyList, action] = usePagingData<NotifyData>('/miniapp/getNotifyMsgByPage', {}, {manual: true});

  useEffect( () => {
    if(patient) action.setFilters({patientId: patient?.patientId})
  }, [patient])

  useDidShow( () => {
    if(notifyList.length) action.refresh()
  })

  return (
    <View className="notify-container page grey-bg scroll-y">
      {
        notifyList.length ? notifyList?.map( item => (
          <View className="notify-box-item" onClick={ _ => Taro.navigateTo({url: `/pages/notify-detail/index?id=${item.taskRecordId}`})}>
            <View className="time">{timeToString(item?.notifyTime)}</View>
            <View className="conent-card white-box shadow">
              <AtTag className={`tag text ${item?.type === 1 ? 'doctor' : ''}`}  active size="small">{item?.type === 1 ? '排班提醒' : '系统推送'}</AtTag>
              { item.readStatus ? "" :  <View className="unread-point"></View> }                     
              <View className="notify-content text">
                {item?.notifyContent}
              </View>
            </View>
          </View>
        )) : <Empty></Empty>
      }      
    </View>
  )
}

Notify.config = {
  navigationBarTitleText: '消息',
}