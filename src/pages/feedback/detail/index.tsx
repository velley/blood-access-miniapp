import { View, Image } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import React from "react";
import { AtList, AtListItem } from "taro-ui";
import { FeedBackData } from "../../../domain/feedback.domain";
import { useRequest } from "../../../hooks/useRequest";

export default function FeedBackDataDetail() {

  const router = useRouter();
  const [ detail ] = useRequest<FeedBackData>('/miniapp/checkFeedback', {feedbackId: parseInt(router.params.id) });

  return detail && (
    <View>
      <View className="header-title">
      <AtList>
        <AtListItem title='血透时间' extraText={detail.datetime} />
        <AtListItem title='血透机构' extraText={detail.organizationId.toString()} />
        {/* <View className="dash-line"></View> */}
        <AtListItem title='动脉穿刺点' extraText={detail.dmccd} />
        <AtListItem title='静脉穿刺点' extraText={detail.jmccd} />
        {/* <View className="dash-line"></View> */}
        <AtListItem title='血压' extraText={`${detail.sp}\/${detail.sp}mmHg`} />
        <AtListItem title='体重' extraText={detail.weight + 'kg'} />
      </AtList>
      {/* <View>反馈图片</View> */}
      <Image src={detail.xgccImageUrl} mode="aspectFit" style="margin:0 20px;width: 75%;display: block;"></Image>
      </View>
    </View>
  )
}