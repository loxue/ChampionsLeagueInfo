import Taro, { Component } from '@tarojs/taro'
import { View, Input, Text, MovableArea, MovableView, Button } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  constructor() {
    super()
  }
  config = {
    navigationBarTitleText: '新闻'
  }
  state = {
    btn: [
      {
        text: '页面主操作 Normal',
        size: 'default',
        type: 'primary'
      },
      {
        text: '页面主操作 Loading',
        size: 'default',
        type: 'primary',
        loading: true,
      },
      {
        text: '页面主操作 Disabled',
        size: 'default',
        type: 'primary',
        disabled: true,
      },
      {
        text: '页面次要操作 Normal',
        size: 'default',
        type: 'default'
      },
      {
        text: '页面次要操作 Disabled',
        size: 'default',
        type: 'default',
        disabled: true,
      },
      {
        text: '警告类操作 Normal',
        size: 'default',
        type: 'warn'
      },
      {
        text: '警告类操作 Disabled',
        size: 'default',
        type: 'warn',
        disabled: true,
      }
    ]
  }
  
  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='example-body'>
        <Text>header content input</Text>
          <Input type='text' placeholder='武磊获得首胜' focus />

        <MovableArea style='height: 200px; width: 375px; background: red;'>
          <MovableView style='height: 50px; width: 50px; background: blue;' direction='all'>
            <Text>点我啊</Text>
          </MovableView>
        </MovableArea>
        <View className='container'>
          {this.state.btn.map(item => {
            return (
              <Button
                size={item.size ? item.size : ''}
                type={item.type ? item.type : ''}
                loading={item.loading ? item.loading : false}
                disabled={item.disabled ? item.disabled : false}
              >
                {item.text}
              </Button>
            )
          })}
          <Button size='mini' type='primary'>按钮</Button>
          <Button size='mini' >按钮</Button>
          <Button size='mini' type='warn'>按钮</Button>
        </View>
      </View>
    )
  }
}