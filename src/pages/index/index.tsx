import React from 'react';
import { View, Text } from '@tarojs/components';
import { AtButton } from 'taro-ui';

import './index.scss'
import { Banner }from './banner';
import { Articles } from './articles';
import { useLogin } from '../../hooks/useLogin';

import { AuthStore } from '../../store/auth.store';
const { useProvider } = AuthStore;

export default function Home() { 
    // useLogin()
    const AuthProvider = useProvider();
    return (
      <AuthProvider>
        <View className='home page col-page grey-bg'>
          <Banner></Banner>
          <Articles></Articles>        
        </View>
      </AuthProvider>      
    )  
}
