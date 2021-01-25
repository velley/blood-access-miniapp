import React, { Component} from 'react';
import './app.scss';

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    // const AuthProvider = useProvider()
    return this.props.children;
    // return AuthProvider({children: this.props.children})
  }
}

export default App
