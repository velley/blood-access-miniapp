import { View, Image } from "@tarojs/components";
import React from 'react';
import emptyPng from '../assets/empty.png';

export function Empty(props: {hideImg?: boolean}) {
  return (
    <View className="empty" style="text-align: center;">
      { !props?.hideImg && <Image src={emptyPng} mode="aspectFit" style="width: 100px;height:120px;"></Image>} 
      <br/>
      <View style="color: #999;font-size: 15px;">暂无数据</View>
      
    </View>
    
  )
}