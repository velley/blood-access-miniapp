import { useState } from "react";
import { HttpState } from "../domain/http.domain";
import { useRequest } from "./useRequest";

interface FormScope{
  [prop: string] : any;
}

interface FormAction<T> {
  patchValue: (key: keyof T, value: any) => void
}

interface FormState {
  httpState?: HttpState;
  invalid?: boolean;
  valid?: boolean;
  checking?: boolean;
}

export function useFormer<T extends FormScope>(
  url: string,
  data: T
): [T, () => void, FormAction<T>, FormState] {
  const [formData, setFormData] = useState<T>(data);
  const [, request, httpState] = useRequest(url, {}, {auto: false, successTip: '提交成功'});

  const submit = () => {
    request(formData)
  }

  const patchValue = (key: keyof T, value: any) => {
    setFormData( data => ({ ...data,  [key]: value }))
  } 

  return [
    formData,
    submit,
    { patchValue },
    { httpState }
  ]
}