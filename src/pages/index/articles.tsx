import { View, Text, RichText, ScrollView, Image } from "@tarojs/components";
import React, { useEffect, useMemo, useState } from 'react';
import { ArticleData } from "../../domain/information.domain";
import { usePagingData } from "../../hooks/usePagingData";
import { AtTabs } from 'taro-ui';
import Taro, { usePageScroll } from '@tarojs/taro';
import { useRequest } from "../../hooks/useRequest";
import { Subject } from "rxjs";
import { debounceTime, tap } from "rxjs/operators";
import { Empty } from "../../components/empty";

export function Articles() {

  const [ articleList, action, status ] = usePagingData<ArticleData>('/miniapp/queryArticleListByPage', {}, {method: 'POST', manual: true});
  const [ groupList ] = useRequest<any[]>('/miniapp/queryArticleGroupList');
  const [freshing, setFreshing] = useState(false);
  
  const [ tabList, setTabs ]   = useState<any>();
  const [ active, setActive ]  = useState(0);

  useEffect( () => {
    if(!groupList) return;
    const tabs = groupList.map( item => ({ title: item.articleGroupName}));    
    !tabList && setTabs(tabs);    
    
    action.setFilters({ articleGroupId: groupList[active].articleGroupId }) ;
    console.log(freshing)
  }, [groupList, active])

  useEffect( () => {
    console.log('fresh', freshing)
    setFreshing(false)
  }, [articleList])
 
  const pull$ = useMemo( () => new Subject(), [articleList] );
  useEffect( () => {
    const sub = pull$.pipe(
      debounceTime(500),
    ).subscribe( _ => {action.refresh();console.log('hahah')} );
    return () => setTimeout( _ => sub.unsubscribe(), 550) 
  }, [articleList])  
  
  return (
    <View className="article-container flex-1 col-page">      
      <AtTabs customStyle="height: auto;" tabList={tabList} current={active} onClick={_ => setActive(_) }>       
      </AtTabs>
      <ScrollView 
        scrollY 
        className="article-list flex-1" 
        refresherEnabled={true} 
        refresherTriggered={freshing}
        onRefresherPulling={_ => {pull$.next(); setFreshing(true)}}
        onScrollToLower={_ => action.nextPage()}
      >   
        {
          articleList?.length ? articleList.map( article => (
            <View 
              className="article-item white-box shadow " 
              onClick={ _ =>Taro.navigateTo({url: `/pages/article/index?articleId=${article.articleId}`})}
            > 
              <View className="g-title">{article?.title}</View>              
              <View className="content-box ">                
                <RichText className="content text" nodes={article.content.replace(/<img.+>/g, '')} />
                {article.imageUrl && <Image style="width:120px;height:120px;background: #eee;" className="photo" mode="widthFix" src={article.imageUrl}></Image>} 
              </View>
              
            </View>
          )) : (<Empty></Empty>)
        }
      </ScrollView>
    </View>    
  )
}