import React from 'react';
import { View, Text } from '@tarojs/components';
import { AtButton } from 'taro-ui';

import './index.scss'
import { Banner }from './banner';
import { Articles } from './articles';

export default function Home() { 
 
    return (
      <View className='home page col-page grey-bg'>
        <Banner></Banner>
        <Articles></Articles>        
      </View>
    )
  
}
