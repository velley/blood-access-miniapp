import { STORE } from './store.class';


export function injectStore<T>(key: number | string) {' '

  if(key === 'root') return STORE.storeList[0]

  let store: STORE<T>;
  const index = STORE.storeList.findIndex( item => item.key === key);
  if(index === -1) {
    throw new Error(`无法注入key为${key}的store对象,你可能需要调用useStoreProvider来提供该store`)   
  } else {
    store = STORE.storeList[index]
  }
  return store

}
