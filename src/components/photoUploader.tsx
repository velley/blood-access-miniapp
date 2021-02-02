import React, { useEffect, useMemo, useState } from "react"
import { AtImagePicker } from "taro-ui";
import Taro from '@tarojs/taro';

export function PhotoUploader(props: {count?: number, urlHandler: (url: string | string[]) => void }) {

  const [files, setFiles] = useState([]);
  const [serveUrl, setUrl] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const pathList = useMemo( () => [], []);

  useEffect(()=> {
    if(!files?.length) return;
    console.log(files);
    const file = [...files].pop()
    Taro.uploadFile({
      url: 'https://wx.xuetouyun.com/miniapp/addImage',
      name: 'file',
      filePath: file.url,
      success: res => {
        const url = JSON.parse(res.data).data;
        pathList.push(url)
        props.urlHandler(pathList)
      } 
    })
  }, [files])

  const onFileChange = (res: any[]) => {
    if(res.length > files.length) {
      setFiles(res)
    } else {
      pathList.splice(index,1);
      files.splice(index,1)
      props.urlHandler(pathList)
    }
    
  }

  return (
    <AtImagePicker count={props.count || 1} showAddBtn={files.length < props.count} files={files} onImageClick={setIndex} onChange={  res =>onFileChange(res) }></AtImagePicker>
  )
}