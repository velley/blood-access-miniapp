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
      url: 'https://wx.xuetouyun.com/miniapp/addImage',
      name: 'file',
      filePath: files[0].url,
      success: res => props.urlHandler( JSON.parse(res.data).data )
    })
  }, [files])

  return (
    <AtImagePicker count={1} showAddBtn={files.length < 1} files={files} onChange={ setFiles }></AtImagePicker>
  )
}