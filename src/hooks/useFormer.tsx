import { useState } from "react";
import { HttpState } from "../domain/http.domain";
import { useRequest } from "./useRequest";

interface FormScope{
  [prop: string] : any;
}

interface FormAction<T, R> {
  patchValue: (key: keyof T, value: any) => void;
  resData: R;
}

interface FormState {
  httpState?: HttpState;
  invalid?: boolean;
  valid?: boolean;
  checking?: boolean;
}

export function useFormer<T extends FormScope, R = any>(
  url: string,
  data: T
): [T, (data?: any) => void, FormAction<T, R>, FormState] {
  const [formData, setFormData] = useState<T>(data);
  const [resData, request, httpState] = useRequest<R>(url, {}, {auto: false, successTip: '提交成功'});

  const submit = (dat: any = {}) => {
    request({...formData, ...data})
  }

  const patchValue = (key: keyof T, value: any) => {
    setFormData( data => ({ ...data,  [key]: value }))
  } 

  return [
    formData,
    submit,
    { patchValue, resData },
    { httpState }
  ]
}