import { useEffect, useRef, useState } from "react";
import { HttpState, RequestOption } from "../domain/http.domain";
import { useRequest } from "./useRequest";

type PagingState = 'empty' | 'unfulled' | 'fulled';

interface PagingAction {
  refresh: () => void;
  nextPage: () => void;
  setFilters: (querys: object) => void;
}

interface PagingData<T> {
  list: T[];
  sartPage: number;
  pageSize: number;
  total: number;
}

interface PagingStatus {
  pagingState: PagingState;
  httpState: HttpState;
  refreshing: boolean;
}

interface PagingOption extends RequestOption {
  start?: 0 | 1;    
  manual?: boolean;
}

const pagingOption = {
  waterFall: true
}


export function usePagingData<T>(
  url: string,
  querys: any,
  options: PagingOption = {}
): [ T[], PagingAction, PagingStatus ] {

  const [ pagingData, getPagingData, httpState ]  = useRequest<PagingData<T>>(url, querys, {auto: false, ...options});  
  const [ pagingState, setPagingState ]           = useState<PagingState>('unfulled');
  const [ refreshing, setRefreshState ]           = useState<boolean>(true);
  const [ pageNo, setPageNo ]                     = useState(0);
  const [ listCache, setCache ]                   = useState<T[]>([]);
  const [ filters, setFilters ]                   = useState(querys);

  const counter = useRef(0);
  counter.current ++ ;
  
  useEffect( () => {  
    
    // 根据刷新状态判断是否累计cache还是重置cache，操作后将刷新状态状态设为false
    if(refreshing) setCache([]);
    setRefreshState(false);

     // 累计list数据赋值给cache，用于瀑布流加载
     pagingData && setCache(cache => cache.concat(pagingData.list));

    // 判断数据状态，是否为空或已加载完毕
    if(pagingData?.list.length) {      
      setPagingState('unfulled')      
    } else {
      if(pageNo === 0) {
        setPagingState('empty')
      } else {
        setPagingState('fulled')
      }
    }
  }, [pagingData])


  // 监听pageNo变量变化并发送数据请求
  useEffect(() => {
    if(options.manual && pageNo === 0) return;
    if(!refreshing && pageNo === 0) return;
    getPagingData({startPage: pageNo, pageSize: 10, ...filters});
  }, [pageNo])

  const refresh = () => {   
    console.log('refresh')
    if(counter.current !== 1) setRefreshState(true);    
    if(pageNo !== 0) {      
      setPageNo(0);   
    } else {
      getPagingData({startPage: pageNo, pageSize: 10, ...filters})
    }     
  }

  useEffect( () => {
    if(counter.current === 1) return;    
    refresh()
  }, [filters])


  const nextPage = () => {        
    if(pagingState === 'fulled') return;
    setPageNo(pageNo +1)
  }

  return [
    listCache,
    { refresh, setFilters, nextPage },
    { httpState, pagingState, refreshing }
  ]
  
}