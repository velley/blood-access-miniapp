import { View, Image, Text } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import React from "react";
import { AtList, AtListItem } from "taro-ui";
import { Empty } from "../../../components/empty";
import { PreviewImage } from "../../../components/preview-image";
import { FeedBackData } from "../../../domain/feedback.domain";
import { useRequest } from "../../../hooks/useRequest";
import './index.scss'

export default function FeedBackDataDetail() {

  const router = useRouter();
  const [ detail ] = useRequest<FeedBackData>('/miniapp/checkFeedback', {feedbackId: parseInt(router.params.id) });

  return detail && (
    <View className="page grey-bg scroll-y">
      <View className="content white-box">    
        <View className="g-title">基本信息</View>    
        <View className="text-item">
          <Text className="title">血透时间</Text>
          <Text className="value">{detail.datetime}</Text>
        </View>
        <View className="text-item">
          <Text className="title">血透机构</Text>
          <Text className="value">{detail.organizationName}</Text>
        </View>
        <View className="text-item">
          <Text className="title">动脉穿刺点</Text>
          <Text className="value">{detail.dmccd}</Text>
        </View>
        <View className="text-item">
          <Text className="title">静脉穿刺点</Text>
          <Text className="value">{detail.jmccd}</Text>
        </View>
        <View className="text-item">
          <Text className="title">血压</Text>
          <Text className="value">{`${detail.sp}\/${detail.sp}mmHg`}</Text>
        </View>
        <View className="text-item">
          <Text className="title">体重</Text>
          <Text className="value">{detail.weight + 'kg'}</Text>
        </View>  
      </View>

      <View className="content white-box">
        <View className="g-title">反馈描述</View>
        { detail.description ? <Text className="text">{detail.description}</Text> : <Empty hideImg></Empty>}
      </View>

      <View className="content white-box">
        <View className="g-title">反馈图片</View>
         <PreviewImage src={[detail.xgccImageUrl]} />
      </View>

      <View className="content white-box">
        <View className="g-title">医生回复</View>
         {detail.reply ? <Text className="text">{detail.reply}</Text> : <Empty hideImg></Empty>}
      </View>
    </View>
  )
}