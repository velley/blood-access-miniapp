import React from 'react';
import { View } from '@tarojs/components';

import './index.scss'
import { Banner }from './banner';
import { Articles } from './articles';


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
