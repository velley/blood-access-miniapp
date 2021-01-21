import { View } from "@tarojs/components";
import Taro from '@tarojs/taro';
import React, { ReactText, useEffect, useState } from "react";
import { AtButton, AtForm, AtInput } from "taro-ui";
import { useFormer } from "../../hooks/useFormer";
// import React from "react";

import './index.scss';
import { VerifyCode } from "./verify-code";

interface IdentifyData{
  phone?: string;
  verifyCode?: string
}

export default function Identify() {

  const [formData, submit, action, formState] = useFormer<IdentifyData>('/miniapp/user/addPatientByPhone', { })

  useEffect( () => {
    console.log('39200', formState)
    if(formState.httpState === 'success') Taro.navigateBack();
  }, [formState])
  
  return(
    <View className="identify-container page grey-bg">
      <AtForm 
        className="form-container white-box"
        onSubmit={_ => console.log('3e')}
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
          <VerifyCode disabled={!/^1\d{10}$/.test(formData.phone)}></VerifyCode>
        </AtInput>
        <AtButton type="primary" onClick={_ => submit()}>确认</AtButton>
      </AtForm>      
    </View>
  )
}