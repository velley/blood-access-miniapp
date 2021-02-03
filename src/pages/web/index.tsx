import { WebView } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import React from "react";


export default function WebPage() {
  const router = useRouter();
  const url = router.params.url
  return(
    <WebView src={url} onError={ _ => console.log('err', _)} />
  )
}