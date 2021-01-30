import { View, RichText, Image } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import React, { useEffect } from 'react';
import { ArticleData } from "../../domain/information.domain";
import { useRequest } from "../../hooks/useRequest";
import { timeToString } from "../../utils/format";

import './index.scss'

export default function Article() {

  const router = useRouter();
  const articleId = parseInt(router.params.articleId)
  const [ details ] = useRequest<ArticleData>('/miniapp/getArticleDetail', { articleId }, {method: 'GET'});  

  return details && (
    <View className="article-container at-article scroll-y page white-box">
      { details.imageUrl && <Image src={details.imageUrl} mode="aspectFit" style="width:100%"></Image>}
      <View className='at-article__h1'>
        {details.title}
      </View>
      <View className='at-article__info' style="margin-bottom: 5px">
        {details.publisher}
      </View>
      <View className='at-article__info'>
        {timeToString(details.cdt)}
      </View>
      
      <RichText className='at-article__content' nodes={details.content}></RichText>
    </View>  
  )    
  
}