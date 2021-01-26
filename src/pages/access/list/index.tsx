import { View } from "@tarojs/components";
import React, { useEffect } from 'react'
import { useAuthInfo } from "../../../hooks/useLogin";
import { usePagingData } from "../../../hooks/usePagingData";

export default function AccessList () {
  const [, patient] = useAuthInfo()
  const [list, action] = usePagingData('/miniapp/queryTreatmentByPage', {patientId: patient?.patientId}, {manual: true});

  useEffect( () => {
    if(patient) action.refresh()
  }, [patient])

  return list && (
    <View className="page">
      {
        list.map( item => (
          <View>
            
          </View>
        ))
      }
    </View>
  )
}