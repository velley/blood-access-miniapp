import { Swiper, SwiperItem, View, Image } from "@tarojs/components";
import React, { useEffect, useState } from "react";
import { BannerData } from "../../domain/information.domain";
import { useRequest } from "../../hooks/useRequest";


export function Banner() {
 
  const [ bannerList ] = useRequest<BannerData[]>('/miniapp/queryBanner', {});  

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
          <SwiperItem>            
            <Image className="full-photo" src={item.imageUrl} mode="aspectFit"></Image>
          </SwiperItem>
        ))
      }    
      
    </Swiper>
  )
}