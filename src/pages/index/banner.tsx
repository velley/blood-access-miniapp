import { Swiper, SwiperItem, View, Image } from "@tarojs/components";
import Taro from '@tarojs/taro';
import React, { useEffect, useState } from "react";
import { BannerData } from "../../domain/information.domain";
import { useRequest } from "../../hooks/useRequest";

import { AuthStore } from '../../store/auth.store';
const { useInjector } = AuthStore

export function Banner() {
 
  const [ bannerList ] = useRequest<BannerData[]>('/miniapp/queryBanner', {}, {method: 'GET'});  

  const [openid, ] = useInjector('openid');
  useEffect(() => {
    console.log(openid)
  })

  const gotoByType = (item: BannerData) => {
    if(item.relateType === 1) {
      Taro.navigateTo({url: `/pages/article/index?articleId=${item.articleId}`})
    } else {
      Taro.navigateTo({url: `/pages/web/index?url=${item.linkUrl}`})
    }
  }

  return (
    <Swiper
      className='banner-container'
      indicatorColor='#999'   
      indicatorActiveColor='#333'      
      circular
      indicatorDots
      autoplay
    >
      {
        bannerList?.map( item => (
          <SwiperItem onClick={_ => gotoByType(item)}>            
            <Image className="full-photo" src={item.imageUrl} mode="aspectFit"></Image>
          </SwiperItem>
        ))
      }    
      
    </Swiper>
  )
}