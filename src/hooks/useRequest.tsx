import { useEffect, useState } from "react";
import Taro from '@tarojs/taro';
import { SERVER_ROOT_PATH } from "../const/http.config";
import { from } from "rxjs";
import { pluck, tap } from 'rxjs/operators'
import { HttpState, RequestOption } from "../domain/http.domain";

const defaultOption: RequestOption = {
  auto: true,
  plucker: ['data'],
  method: 'POST'
}

export function useRequest<T>(
  url: string,
  param: any = {},
  options?: RequestOption
): [T, (query?: any) => void, HttpState] {

  const [httpState, setState] = useState<HttpState>(null);
  const [data, setData]       = useState<T>(null);

  const setting = { ...defaultOption, ...options };

  const request = (query = {}) => {
    from(
      Taro.request({
        url: SERVER_ROOT_PATH + url,
        data: {...param, ...query }
      })
    ).pipe(
      tap(_ => setState('success'), _ => setState('failed') ),
      pluck<unknown, T>('data', ...setting.plucker)
    )
    .subscribe( data => {setData(data); console.log(data)} )    
  }  

  useEffect( () => {
    if(!setting.auto) return;
    request();
  }, [])

  
  useEffect( () => {    
    switch(httpState) {
      case 'failed':
        Taro.showToast({title: '请求失败...', icon: 'none'});        
      break;
      case 'success':
        setting.successTip && Taro.showToast({title: setting.successTip , icon: 'success'});        
      break;
      case 'pending':
        Taro.showLoading({title: '加载中...'})
      break;
    }
  }, [httpState])

  return [
    data,
    request,
    httpState
  ]

}