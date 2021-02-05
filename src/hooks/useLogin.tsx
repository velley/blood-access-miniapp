import { useEffect, useLayoutEffect, useState } from "react";
import Taro from '@tarojs/taro'
import { useRequest } from "./useRequest";
import { AuthStore } from '../store/auth.store';
import { PatientData } from "../domain/patient.domain";

const { useInjector } = AuthStore;

interface LoginResData {
  openid: string;
  patient: PatientData;
}

export function useAuthInfo(check?: boolean): [string, PatientData, (d?: PatientData) => void, () => void] {
  const [data, login, status]             = useRequest<LoginResData>('/miniapp/loginByWxCode', {}, {auto: false});
  const [openid, setOpenid]       = useState('');
  const [patientInfo, setPatient] = useState<PatientData>();

  useLayoutEffect( () => {
    if(Taro.getStorageSync('openid')) {
      setOpenid( Taro.getStorageSync('openid') );
      setPatient( Taro.getStorageSync('patient') );
    }else {
      Taro.login().then( res => {        
        login({code: res.code})
      })
    }    
  }, [])

  useEffect( () => {
    console.log('login data', status)
    // if(!data?.patient && check) {      
    //   Taro.redirectTo({url: '/pages/identify/index?tips=true'})         
    // }
    if(data) {
      setOpenid(data?.openid);
      setPatient(data?.patient);
      Taro.setStorage({key: 'openid', data: data.openid});
      Taro.setStorage({key: 'patient', data: data.patient});
    }    
  }, [data])

  useEffect( () => {
    const patient = Taro.getStorageSync('patient')
    if(check && !patient) {
      Taro.redirectTo({url: '/pages/identify/index?tips=true'})
    }
  }, [])

  const clear = () => {
    Taro.removeStorageSync('patient');
    setPatient(null);
  }

  return [openid, patientInfo, setPatient, clear];
}