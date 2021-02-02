import { View, Text, ScrollView } from "@tarojs/components"
import React, { useEffect } from 'react';
import { AtButton } from "taro-ui";
import Taro, { useDidShow } from '@tarojs/taro';
import { usePagingData } from "../../../hooks/usePagingData";
import { FeedBackData } from "../../../domain/feedback.domain";

import './index.scss'
import { useAuthInfo } from "../../../hooks/useLogin";
import { Empty } from "../../../components/empty";

export default function FeedBackList() {

  const [, patient]     = useAuthInfo(true);
  const [list, action, status]  = usePagingData<FeedBackData>('/miniapp/getUserFeedback', {patientId: patient?.patientId}, {manual: true});  

  useEffect( () => {
    if(patient) action.setFilters({patientId: patient?.patientId})
  }, [patient])

  useDidShow( () => {
    status.httpState && action.refresh()
  })   

  return (
    <View className="feedback-container page col-page grey-bg">
      <ScrollView className="group flex-1 scroll-y" scrollY onScrollToLower={_ => action.nextPage()}>
        {
          list.length ? list.map( item => (
            <View 
              className="item white-box" 
              onClick={ _ => Taro.navigateTo({url: `/pages/feedback/detail/index?id=${item.feedbackId}`})}
            >              
              <View className="info">
                <View className="info-cell m-text">血透机构：{item.organizationName}</View>
                <View className="info-cell m-text">血透时间：{item.datetime}</View>
              </View>
              <View className="reply m-text">
                {item.hasReply ? `医生回复：${item.reply}` : '暂无医生回复'}
              </View>
              { !item.hasReply ? '' : item.readStatus ? "" :  <View className="unread-point"></View> }
            </View>
          )) : <Empty></Empty>
        }
      </ScrollView>
      <AtButton 
        full 
        type="primary" 
        circle onClick={ _ => Taro.navigateTo({url: '/pages/feedback/form/index'})}
      >
        添加反馈
      </AtButton>      
    </View>
  )
}