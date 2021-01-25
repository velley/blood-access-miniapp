import { STORE } from "./store.class";
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { useState, useEffect } from "react";

export function useStoreRefer<T>(
  stateNames: string[], 
  receiver: (states: any[]) => T, 
  storeName = 'root'
) {

  const index = STORE.storeNames.indexOf(storeName);
  if(index < -1) throw new Error(`找不到该store对象`)

  const store       = STORE.storeList[index]
  const statesPubs  = [] as Observable<any>[]
  for(let name of stateNames) {
    statesPubs.push(store.get(name))
  } 
  const referObs$ = combineLatest(...statesPubs).pipe(map(receiver))

  const [value, setValue] = useState<T>()

  useEffect(
    () => { 
      const subcription = referObs$.subscribe( data => {             
        setValue(data)
      })
      return () => subcription.unsubscribe()
    },
    []
  )

  return value

}