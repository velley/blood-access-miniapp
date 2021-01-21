import { Picker, View, Text, Input } from "@tarojs/components";
import React, { useEffect, useState } from "react";
import { AtInput, AtList, AtListItem, AtInputNumber, AtImagePicker } from "taro-ui";
import { FeedBackData, OrganData } from "../../../domain/feedback.domain";
import { useFormer } from "../../../hooks/useFormer";
import { useRequest } from "../../../hooks/useRequest";
import { PhotoUploader } from '../../../components/photoUploader'

import './index.scss'

export default function FeedbackForm() {

  // 构建表单对象
  const [ formData, submit, action ] = useFormer<FeedBackData>('/miniapp/addFeedback', {});  

  // 监听机构选择
  const [ organList ]                = useRequest<OrganData[]>('/miniapp/queryOrganization');
  const [ organIndex, setIndex ]     = useState(0);
  useEffect( () => {    
    organList && action.patchValue('organizationId', organList[organIndex].organizationId);
  }, [organIndex, organList])

  // 监听穿刺点选择
  const [ jmIndex, setJmIndex ]      = useState(0);
  const [ dmIndex, setDmIndex ]      = useState(0);
  const positionOfDmcuanci = ['A穿刺点', 'B穿刺点'];
  const positionOfJmcuanci = ['1穿刺点', '2穿刺点', '3穿刺点', '4穿刺点'];
  useEffect( () => {
    action.patchValue('dmccd', positionOfDmcuanci[dmIndex]);
    action.patchValue('jmccd', positionOfJmcuanci[jmIndex]);
  }, [dmIndex, jmIndex])
  

  return (
    <View className="form-box page">     
        
      <Picker mode='date' value={formData.datetime} onChange={
        event => action.patchValue('datetime', event.detail.value)
      }>
        <AtList hasBorder={false}>
          <AtListItem
            title='选择时间'
            extraText={formData.datetime}
          />
        </AtList>
      </Picker>

      <Picker mode='selector' range={organList} rangeKey="organizationId" onChange={
        event => setIndex(event.detail.value as number)
      }>
        <AtList hasBorder={false}>
          <AtListItem
            title='血透中心'
            extraText={ organList && organList[organIndex].name}
          />
        </AtList>
      </Picker>

      <View className="sub-title">穿刺位置</View>

      <Picker mode='selector' range={positionOfDmcuanci} onChange={
        event => setDmIndex(event.detail.value as number)
      }>
        <AtList hasBorder={false}>
          <AtListItem
            title='动脉穿刺点'
            extraText={formData.dmccd}
          />
        </AtList>
      </Picker>

      <Picker mode='selector' range={positionOfJmcuanci} onChange={
        event => setJmIndex(event.detail.value as number)
      }>
        <AtList hasBorder={false}>
          <AtListItem
            title='静脉穿刺点'
            extraText={formData.jmccd}
          />
        </AtList>
      </Picker>

      <View className="sub-title">血压/mmHg</View>

      <AtList className='at-row at-row__justify--between at-row__align--center' hasBorder={false}>
        <AtListItem
          className="at-col at-col-6"
          title='收缩压(SP)'          
        />
        <AtInputNumber type="number" min={0} max={500}  step={1} value={formData.sp} onChange={event => action.patchValue('sp', event)}>          
        </AtInputNumber>
      </AtList>

      <AtList className='at-row at-row__justify--between at-row__align--center' hasBorder={false}>
        <AtListItem
          className="at-col at-col-6"
          title='舒张压(DP)'          
        />
        <AtInputNumber style="height:20px"  type="number" min={0} max={500}  step={1} value={formData.dp} onChange={event => action.patchValue('dp', event)}>          
        </AtInputNumber>
      </AtList>

      <AtList className='at-row at-row__justify--between at-row__align--center' hasBorder={false}>
        <AtListItem
          className="at-col at-col-6"
          title='体重/kg'          
        />
        <AtInputNumber type="number" min={30} max={200}  step={1} value={formData.weight} onChange={event => action.patchValue('sp', event)}>          
        </AtInputNumber>
      </AtList>  

      <PhotoUploader urlHandler={ event => action.patchValue('xgccImageUrl', event)}></PhotoUploader>  
    </View>
  )
}