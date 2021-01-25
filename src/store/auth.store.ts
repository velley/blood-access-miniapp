
import { defineStoreFactory } from './lib/store.factory';

export const AuthStore = defineStoreFactory('auth', {
  code: '',
  openid: '3232342',
  patientId: '',
  token: ''
})