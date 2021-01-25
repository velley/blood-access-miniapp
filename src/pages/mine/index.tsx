import React, { useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtAvatar, AtIcon } from 'taro-ui';

import './index.scss';
import { Schedule } from './schedule';
import { useAuthInfo } from '../../hooks/useLogin';

export default function Mine() {

	const [openid, patient] = useAuthInfo();

	useEffect( () => {
		console.log('mine', openid, patient)
	}, [openid])

	return (
		<View className="page grey-bg">
			<View 
				className="top-header white-box shadow at-row at-row__align--center"				
			>
				<AtAvatar circle image='https://jdc.jd.com/img/200'></AtAvatar>
				{ 
					patient ? <View className="patient-info">{patient.name}  /   {patient.phone}</View> : (
						<View onClick={_ => Taro.navigateTo({url: '/pages/identify/index'})}>
							<Text className="at-col at-col__offset-1">添加就诊人</Text>
							<AtIcon value='chevron-right' size='30' color="#1890ff"></AtIcon>
						</View>						
					)
				}
				
			</View>

			<Schedule></Schedule>

			<View className="nav-box white-box">
				<Text className="nav-header">常用服务</Text>
				<View className="nav-list at-row at-row__justify--around">
					<View className="nav-item " onClick={ _ =>Taro.navigateTo({url: '/pages/doctor/index'}) }>
						<AtIcon className="nav-ico" value='streaming' size='40' color='#1890ff'></AtIcon>
						<Text className="text">我的医生</Text>
					</View>
					<View className="nav-item" onClick={ _ =>Taro.navigateTo({url: '/pages/notify/index'}) }>
						<AtIcon className="nav-ico" value='bell' size='40' color='#1890ff'></AtIcon>
						<Text className="text">我的消息</Text>
					</View>					
				</View>
			</View>

			<View className="nav-box white-box">
				<Text className="nav-header">问诊服务</Text>
				<View className="nav-list at-row at-row__justify--around">
					<View className="nav-item " onClick={_ => Taro.navigateTo({url: '/pages/feedback/list/index'})}>
						<AtIcon className="nav-ico" value='message' size='40' color='#1890ff'></AtIcon>
						<Text className="text">血透反馈</Text>
					</View>
					<View className="nav-item " onClick={_ => Taro.navigateTo({url: '/pages/access/list/index'})}>
						<AtIcon className="nav-ico" value='bookmark' size='40' color='#1890ff'></AtIcon>
						<Text className="text">随访记录</Text>
					</View>					
				</View>
			</View>
			
		</View>
	)
}