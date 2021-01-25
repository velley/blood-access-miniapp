import React from 'react';
import { Text, Textarea, View } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import { NotifyData } from "../../domain/notify.domain";
import { useRequest } from "../../hooks/useRequest";

import './index.scss';

export default function NotifyDetail() {

  const router    = useRouter();
  const [detail]  = useRequest<NotifyData>('/miniapp/readNotifyMsg', {notifyId: parseInt(router.params.id) } )

  return detail && (
    <View className="detail-container page grey-bg white-box">     

      <View className="m-text indent">{detail.notifyContent}</View>

      <View className="text time">{detail.sendTime}</View>
      
    </View>
  )
}