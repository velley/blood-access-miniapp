import { View } from "@tarojs/components";
import { switchMap, tap, takeWhile, take } from "rxjs/operators";
import React, { useMemo } from 'react';
import { useCallback, useEffect, useState } from "react";
import { Subject, timer } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { AtButton } from "taro-ui";

const LIMIT = 30;

export function VerifyCode(props: {disabled: boolean}) { 
  const stream$                    = useMemo( () => new Subject(), []) ;
  const [retryTime, setVerifyTime] = useState(0);

  const listen = useCallback( () => {
    stream$.pipe(
      debounceTime(300),
      tap( _ => setVerifyTime(LIMIT)),
      switchMap( _ => timer(1000, 1000).pipe(take(LIMIT)) ),      
      tap(_ => console.log(retryTime)),
      tap( _ => setVerifyTime( val => val -1 )),      
    ).subscribe()
  }, [])

  useEffect( () => {    
    listen()
  },[])

  return (
    <AtButton disabled={retryTime > 0 || props.disabled} onClick={_ => stream$.next()}>
      {retryTime ? `${retryTime}s后重试` : '获取验证码'}
    </AtButton>
  )
}