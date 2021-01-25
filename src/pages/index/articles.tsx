import { View, Text, RichText, ScrollView, Image } from "@tarojs/components";
import React, { useEffect, useState } from 'react';
import { ArticleData } from "../../domain/information.domain";
import { usePagingData } from "../../hooks/usePagingData";
import { AtSegmentedControl } from 'taro-ui';
import Taro, { usePageScroll } from '@tarojs/taro';
import { useRequest } from "../../hooks/useRequest";

export function Articles() {

  const [ articleList, action, status ] = usePagingData<ArticleData>('/miniapp/queryArticleListByPage', {}, {method: 'POST'});
  const [ groupList,  ] = useRequest('/miniapp/queryArticleGroupList');
  const [ navIndex, setIndex ] = useState(0);
  const scroll = usePageScroll( (x) => {
    console.log('scroll', x)
  })

  useEffect( () => {
    console.log('res', articleList)
  }, [articleList])

  return (
    <View className="article-container flex-1 col-page">
      <AtSegmentedControl 
        className="tab-nav"
        values={['分类1', '分类2', '分类3']} 
        current={navIndex} onClick={ index => setIndex(index)  }
      /> 
      <ScrollView 
        scrollY 
        className="article-list flex-1" 
        refresherEnabled={true} 
        refresherTriggered={status.refreshing}
        onRefresherPulling={_ => action.refresh()}
        onScrollToLower={_ => action.nextPage()}
      >   
        {
          articleList.map( article => (
            <View 
              className="article-item white-box shadow at-row  at-row__justify--between" 
              onClick={ _ =>Taro.navigateTo({url: `/pages/article/index?articleId=${article.articleId}`})}
            > 
              <View className="left">
                <Text className="title">{article?.title}</Text>
                <RichText className="content" nodes={article.content} />
              </View>
              {article.imageUrl && <Image className="photo" mode="widthFix" src={article.imageUrl}></Image>} 
            </View>
          ))
        }
      </ScrollView>
    </View>    
  )
}