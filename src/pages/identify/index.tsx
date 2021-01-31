import { Button, View } from "@tarojs/components";
import Taro, { useRouter } from '@tarojs/taro';
import React, { useEffect } from "react";
import { AtButton, AtForm, AtInput } from "taro-ui";
import { useFormer } from "../../hooks/useFormer";
import { useAuthInfo } from "../../hooks/useLogin";
// import React from "react";

import './index.scss';
import { VerifyCode } from "./verify-code";

interface IdentifyData{
  phone?: string;
  verifyCode?: string;
  openid?: string;
}

export default function Identify() {

  const router = useRouter()
  const [ openid ] = useAuthInfo();
  const [ formData, submit, action, formState ] = useFormer<IdentifyData>('/miniapp/bindPatient', { openid });

  useEffect( () => {
    if(router.params.tips) {
      Taro.showToast({title: '请绑定就诊人', icon: 'none'})
    }
  })

  useEffect( () => {
    console.log('openid', openid)
  }, [openid])

  useEffect( () => {
    if(formState.httpState === 'success' && action.resData) {
      action.resData && Taro.setStorage({key: 'patient', data: action.resData});
      Taro.navigateBack();
    };    
  }, [formState])

  const setWxUserInfo = (data: any) => {
    console.log(data.detail.userInfo)
    submit({...data.detail.userInfo, openid})
  }
 
  
  return(
    <View className="identify-container page grey-bg">
      <AtForm 
        className="form-container white-box"
        onSubmit={_ => console.log('3e', formData)}
      >  
        <AtInput
          name='value6'
          border={true}
          title='手机号码'
          type='text'
          placeholder='请输入手机号码'
          value={formData.phone}
          onChange={ val => action.patchValue('phone', val.toString()) }
        />
        <AtInput
          name='value7'
          border={true}
          title='验证码'
          type='text'
          placeholder='请输入验证码'
          value={formData.verifyCode}
          onChange={ code => action.patchValue('verifyCode', code.toString()) }
        >
          <VerifyCode disabled={!/^1\d{10}$/.test(formData.phone)} phone={formData.phone}></VerifyCode>
        </AtInput>
        <Button style="background:#0050b3" type="primary" disabled={!formData.phone || !formData.verifyCode} openType="getUserInfo" onGetUserInfo={data => setWxUserInfo(data)} >确认</Button>
      </AtForm>      
    </View>
  )
}