import { View } from "@tarojs/components";
import React from 'react'
import { useAuthInfo } from "../../../hooks/useLogin";
import { usePagingData } from "../../../hooks/usePagingData";

export default function AccessList () {
  const [, patient] = useAuthInfo()
  const [list] = usePagingData('/miniapp/queryTreatmentByPage', {patientId: patient?.patientId}, {manual: true})

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