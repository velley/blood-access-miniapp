import { View } from "@tarojs/components"
import React from "react";
import Taro from '@tarojs/taro';
import { AtTag } from "taro-ui"
import { NotifyData } from "../../domain/notify.domain"
import { usePagingData } from "../../hooks/usePagingData";

import './index.scss'

export default function Notify() {

  const [notifyList] = usePagingData<NotifyData>('/miniapp/getNotifyMsgByPage', {})

  return (
    <View className="notify-container page grey-bg scroll-y">
      {
        notifyList?.map( item => (
          <View className="notify-box-item" onClick={ _ => Taro.navigateTo({url: `/pages/notify-detail/index?id=${item.notifyId}`})}>
            <View className="time">{item?.sendTime}</View>
            <View className="conent-card white-box shadow">
              <AtTag className={`tag text ${item?.type === 1 ? 'doctor' : ''}`}  active size="small">{item?.type === 1 ? '系统消息' : '医生回复'}</AtTag>
              { item.readStatus ? "" :  <View className="unread-point"></View> }                     
              <View className="notify-content text">
                {item?.content}
              </View>
            </View>
          </View>
        ))
      }      
    </View>
  )
}

Notify.config = {
  navigationBarTitleText: '消息',
}