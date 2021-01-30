import React, { useEffect } from 'react';
import Taro, { useDidShow } from '@tarojs/taro';
import { View, Text, OpenData } from '@tarojs/components';
import { AtAvatar, AtIcon } from 'taro-ui';

import './index.scss';
import { Schedule } from './schedule';
import { useAuthInfo } from '../../hooks/useLogin';
import { useRequest } from '../../hooks/useRequest';
import { timeToString } from '../../utils/format';

export default function Mine() {

	const [openid, patient, setPatient ] = useAuthInfo();
	const [ schedule, getSchedule ] = useRequest<any>('/miniapp/queryLatestSchedule', { }, {auto: false});

	useEffect( () => {
		if(patient) getSchedule({patientId: patient?.patientId})
	}, [patient])

	useDidShow( () => {
		if(!openid) return;	
		const patient = Taro.getStorageSync('patient')
		setPatient(patient)
	})

	return (
		<View className="page grey-bg">
			<View 
				className="top-header white-box shadow at-row at-row__align--center "				
			>
				
				<OpenData className="avatar" type='userAvatarUrl'style="flex-shrink: 0"/>				
				 
				{ 
					patient ? <View className="patient-info">
						<View className="name info-cell m-text">{patient?.name}  / {patient?.sex ? '男' : '女'}</View>
						<View className="phone info-cell m-text">{patient?.phone}</View>						   
					</View> : (
						<View onClick={_ => Taro.navigateTo({url: '/pages/identify/index'})} className="at-row at-row__align--center">
							<Text className="at-col at-col__offset-1">添加就诊人</Text>
							<AtIcon value='chevron-right' size='30' color="#1890ff"></AtIcon>
						</View>						
					)
				}
				
			</View>

			{ patient ? <View className="schedule-container white-box" onClick={_ => Taro.navigateTo({url: '/pages/schedule/index'})}>				
				<View className="title">我的排期</View>
				<View className="info">{ schedule?.touxiTime ? timeToString(schedule?.touxiTime) : "暂无" }</View>
			</View> : null}

			<View className="nav-box white-box">
				<Text className="nav-header">常用服务</Text>
				<View className="nav-list at-row at-row__justify--around">
					<View className="nav-item " onClick={ _ =>Taro.navigateTo({url: '/pages/doctor/index'}) }>
						<AtIcon className="nav-ico" value='streaming' size='40' color='#1890ff'></AtIcon>
						<Text className="m-text">我的医生</Text>
					</View>
					<View className="nav-item" onClick={ _ =>Taro.navigateTo({url: '/pages/notify/index'}) }>
						<AtIcon className="nav-ico" value='bell' size='40' color='#1890ff'></AtIcon>
						<Text className="m-text">我的消息</Text>
					</View>					
				</View>
			</View>

			<View className="nav-box white-box">
				<Text className="nav-header">问诊服务</Text>
				<View className="nav-list at-row at-row__justify--around">
					<View className="nav-item " onClick={_ => Taro.navigateTo({url: '/pages/feedback/list/index'})}>
						<AtIcon className="nav-ico" value='message' size='40' color='#1890ff'></AtIcon>
						<Text className="m-text">血透反馈</Text>
					</View>
					<View className="nav-item " onClick={_ => Taro.navigateTo({url: '/pages/access/list/index'})}>
						<AtIcon className="nav-ico" value='bookmark' size='40' color='#1890ff'></AtIcon>
						<Text className="m-text">随访记录</Text>
					</View>					
				</View>
			</View>
			
		</View>
	)
}