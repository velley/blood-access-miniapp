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

export function useAuthInfo(check?: boolean): [string, PatientData, (d?: PatientData) => void] {
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
    if(!data) {
      if(check && status ==='success' ) {
        Taro.navigateTo({url: '/pages/identify/index?tips=true'})
      }
      return;
    } 
    setOpenid(data.openid);
    setPatient(data.patient);
    Taro.setStorage({key: 'openid', data: data.openid});
    Taro.setStorage({key: 'patient', data: data.patient});
  }, [data])

  return [openid, patientInfo, setPatient];
}