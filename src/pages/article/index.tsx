import { View, RichText } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import React, { useEffect } from 'react';
import { ArticleData } from "../../domain/information.domain";
import { useRequest } from "../../hooks/useRequest";

import './index.scss'

export default function Article() {

  const router = useRouter();
  const [ details ] = useRequest<ArticleData>('/miniapp/getArticleDetail', { articleId: router.params.articleId });  

  return details && (
    <View className="article-container at-article scroll-y page white-box">
      <View className='at-article__h1'>
        {details.title}
      </View>
      <View className='at-article__info'>
        {details.publisher}
      </View>
      <RichText className='at-article__content' nodes={details.content}></RichText>
    </View>  
  )    
  
}