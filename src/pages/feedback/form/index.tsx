import { Picker, View, Text, Textarea } from "@tarojs/components";
import React, { useEffect, useState } from "react";
import { AtInputNumber, AtButton } from "taro-ui";
import { FeedBackData, OrganData } from "../../../domain/feedback.domain";
import { useFormer } from "../../../hooks/useFormer";
import { useRequest } from "../../../hooks/useRequest";
import { PhotoUploader } from '../../../components/photoUploader';
import Taro from '@tarojs/taro';

import './index.scss'
import { useAuthInfo } from "../../../hooks/useLogin";

export default function FeedbackForm() {

  const [, patient] = useAuthInfo()

  // 构建表单对象
  const [formData, submit, action, formState] = useFormer<FeedBackData>('/miniapp/addFeedback', {});
  useEffect(() => {
    if (formState.httpState) Taro.navigateBack()
  }, [formState])

  const onSubmit = () => {
    if(!formData.weight){
      Taro.showToast({title: '请填写体重', icon: 'none'})
    }
    if(!formData.datetime){
      Taro.showToast({title: '请选择血透日期', icon: 'none'})
    }
    if(!formData.sp || !formData.dp){
      Taro.showToast({title: '请完善血压信息', icon: 'none'})
    }

    if(formData.weight && formData.sp && formData.dp && formData.datetime) {
      submit({ patientId: patient?.patientId });
      Taro.requestSubscribeMessage({
        tmplIds: ['hotyl5DLXO5Jwac1cHSagrkquZzOd6K1syZ7jiDF7yE'],
        success(res) {
          //发送请求到后端，后端接收到请求后调用订阅消息接口进行推送
          console.log("subscribe res code:" + res.code);
          console.log(res)
        }
      })
    }    
  }

  // 监听机构选择
  const [organList] = useRequest<OrganData[]>('/miniapp/queryOrganization', {}, { method: 'GET' });
  const [organIndex, setIndex] = useState(0);
  useEffect(() => {
    organList && action.patchValue('organizationId', organList[organIndex].organizationId);
  }, [organIndex, organList])

  // 监听穿刺点选择
  const [jmIndex, setJmIndex] = useState(0);
  const [dmIndex, setDmIndex] = useState(0);
  const positionOfDmcuanci = ['A穿刺点', 'B穿刺点'];
  const positionOfJmcuanci = ['1穿刺点', '2穿刺点', '3穿刺点', '4穿刺点'];
  useEffect(() => {
    action.patchValue('dmccd', positionOfDmcuanci[dmIndex]);
    action.patchValue('jmccd', positionOfJmcuanci[jmIndex]);
  }, [dmIndex, jmIndex])


  return (
    <View className="form-box page col-page grey-bg">
      <View className="form-group flex-1 scroll-y">
        <View className="white-box form-item ">
          <Picker mode='date' value={formData.datetime} onChange={
            event => action.patchValue('datetime', event.detail.value)
          }> 
            <View className="text-item">
              <Text className="title">选择时间</Text>
              <Text className="value">{formData.datetime}</Text>
            </View>            
          </Picker>

          <Picker mode='selector' range={organList} rangeKey="name" onChange={
            event => setIndex(event.detail.value as number)
          }>          

            <View className="text-item">
              <Text className="title">血透中心</Text>
              <Text className="value">{organList && organList[organIndex].name}</Text>
            </View>
            
          </Picker>
        </View>

        <View className="white-box form-item">
          <Text className="g-title">穿刺位置</Text>

          <Picker mode='selector' range={positionOfDmcuanci} onChange={
            event => setDmIndex(event.detail.value as number)
          }>           
            <View className="text-item">
              <Text className="title">动脉穿刺点</Text>
              <Text className="value">{formData.dmccd}</Text>
            </View>
          </Picker>

          <Picker mode='selector' range={positionOfJmcuanci} onChange={
            event => setJmIndex(event.detail.value as number)
          }>           
            <View className="text-item">
              <Text className="title">静脉穿刺点</Text>
              <Text className="value">{formData.jmccd}</Text>
            </View>
          </Picker>
        </View>



        <View className="white-box form-item">
          <View className="g-title">血压/mmHg</View>
          <View className='text-item' >
            <Text className="title">收缩压(SP)</Text>
            <AtInputNumber className="value" type="number" min={0} max={500} step={1} value={formData.sp || 0} onChange={event => action.patchValue('sp', event)}>
            </AtInputNumber>
          </View>

          <View className='text-item' >
            <Text className="title">舒张压(DP)</Text>            
            <AtInputNumber className="value" type="number" min={0} max={500} step={1} value={formData.dp || 0} onChange={event => action.patchValue('dp', event)}>
            </AtInputNumber>
          </View>
        </View>

        <View className="form-item white-box">
          <View className='text-item' >
            <Text className="title">体重/kg</Text> 
            <AtInputNumber className="value" type="number" min={0} max={200} step={1} value={formData.weight} onChange={event => action.patchValue('weight', event)}>
            </AtInputNumber>
          </View>
        </View>

        <View className="form-item white-box">
          <Text className="g-title">反馈描述</Text>
          <Textarea style='min-height:40px;padding:10rpx  0;' placeholder="请留言您的问题，医生会为您解答" autoHeight onInput={ e => action.patchValue('description', e.detail.value)}/>          
        </View>

        <View className="form-item white-box">
          <Text className="g-title">反馈图片</Text>          
          <PhotoUploader count={3} urlHandler={event => {action.patchValue('xgccImageUrl', event);console.log('upload success', event)}}></PhotoUploader>
        </View>
      </View>


      <AtButton full type="primary" onClick={_ => onSubmit()}>提交</AtButton>
    </View>
  )
}