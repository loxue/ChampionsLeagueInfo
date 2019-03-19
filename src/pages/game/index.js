import Taro, { Component } from '@tarojs/taro'
import { View, Form, Map, Canvas } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
  onTap() { }
  config = {
    navigationBarTitleText:'比赛'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Form onSubmit={this.formSubmit} onReset={this.formReset} >
          <View className='example-body'>
            <Switch name='switch' className='form-switch'></Switch>
          </View>
        </Form>
        <Map onClick={this.onTap} />
        <Canvas style='width: 300px; height: 200px;' canvasId='canvas' />
      </View>
    )
  }
}

