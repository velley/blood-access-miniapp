import { View, Image, Text } from "@tarojs/components";
import { previewImage } from "@tarojs/taro";
import React from 'react'
import { Empty } from "./empty";

export function PreviewImage(props: {src: string[]}) {

  return (
    <View>
      { props.src?.filter( item => !!item ).length ? props.src.map( item => (        
          <Image src={item} mode="aspectFit" style="width: 80px;height:80px;background: #eee;display:inline-block;margin: 0 10px;" onClick={_ =>previewImage({urls: props.src})}>
          </Image>        
      )) : <Empty hideImg={true}></Empty>}
    </View>     
  )
}