import { Picker, View } from "@tarojs/components";
import React from "react";
import { FeedBackData } from "../../../domain/feedback.domain";
import { useFormer } from "../../../hooks/useFormer";

export default function FeedbackForm() {

  const [ formData, submit, action ] = useFormer<FeedBackData>('/miniapp/addFeedback', {});


  return (
    <View className="form-box">
      <Picker mode='date' value={formData.datetime} onChange={event => action.patchValue('datetime', event.detail.value)}>
        <View className='picker'>
          当前选择：{formData.datetime}
        </View>
      </Picker>
    </View>
  )
}