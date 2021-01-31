import React, { Component} from 'react';
import Taro from '@tarojs/taro'
import './app.scss';

class App extends Component {

  componentDidMount () {
    Taro.removeStorage({key: 'patient'});
    Taro.removeStorage({key: 'openid'});
  }

  componentDidShow () {
    //  Taro.authorize({
    //   scope: "scope.userInfo"
    // })
  }

  componentDidHide () {
    
  }

  componentWillUnmount() {
    Taro.removeStorage({key: 'patient'});
    Taro.removeStorage({key: 'openid'});
  }

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    // const AuthProvider = useProvider()
    return this.props.children;
    // return AuthProvider({children: this.props.children})
  }
}

export default App
