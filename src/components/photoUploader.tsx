import React, { useEffect, useState } from "react"
import { AtImagePicker } from "taro-ui";
import Taro from '@tarojs/taro';

export function PhotoUploader(props: { urlHandler: (url: string | string[]) => void }) {

  const [files, setFiles] = useState([]);
  const [serveUrl, setUrl] = useState<string[]>([]);

  useEffect(()=> {
    if(!files?.length) return;
    console.log(files);
    Taro.uploadFile({
      url: 'https://wx.xuetouyun.com/upload/addImage',
      name: 'feed',
      filePath: files[0].url
    })
  }, [files])

  return (
    <AtImagePicker files={files} onChange={ setFiles }></AtImagePicker>
  )
}