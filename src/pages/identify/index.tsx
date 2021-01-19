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

  const [formData, submit, action, httpState] = useFormer<IdentifyData>('/miniapp/user/addPatientByPhone', { })

  useEffect( () => {
    if(httpState === 'success') Taro.navigateBack();
  }, [httpState])
  
  return(
    <View className="identify-container page grey-bg">
      <AtForm 
        className="form-container white-box"
        // onSubmit={_ => submit()}
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
        <AtButton formType='submit' type="primary" onClick={_ => submit()}>确认</AtButton>
      </AtForm>      
    </View>
  )
}