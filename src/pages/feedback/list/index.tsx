import { View, Text } from "@tarojs/components"
import React from 'react';
import { AtButton } from "taro-ui";
import Taro from '@tarojs/taro';
import { usePagingData } from "../../../hooks/usePagingData";
import { FeedBackData } from "../../../domain/feedback.domain";

import './index.scss'

export default function FeedBackList() {

  const [list] = usePagingData<FeedBackData>('/miniapp/getUserFeedback', {});  

  return (
    <View className="feedback-container page col-page grey-bg">
      <View className="group flex-1 scroll-y">
        {
          list.map( item => (
            <View 
              className="item white-box" 
              onClick={ _ => Taro.navigateTo({url: `/pages/feedback/detail/index?id=${item.feedbackId}`})}
            >              
              <View className="info">
                <View className="info-cell">血透机构：{item.organizationId}</View>
                <View className="info-cell">血透时间：{item.datetime}</View>
              </View>
              <View className="reply">
                {item.hasReply ? `医生回复：${item.reply}` : '暂无医生回复'}
              </View>
            </View>
          ))
        }
      </View>
      <AtButton 
        full 
        type="secondary" 
        circle onClick={ _ => Taro.navigateTo({url: '/pages/feedback/form/index'})}
      >
        添加反馈
      </AtButton>      
    </View>
  )
}