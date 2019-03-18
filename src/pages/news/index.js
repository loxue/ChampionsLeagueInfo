import Taro, { Component } from "@tarojs/taro";
import {
  View,
  Image,
  Text,
  Swiper,
  SwiperItem,
  Button
} from "@tarojs/components";

import logoImg from "../../images/logo.png";
import qr from "../../images/qr.jpg";
import styles from "./index.module.scss";
import authInfo from "../../config";

const appId = authInfo.appId;
const secret = authInfo.secret;

class Index extends Component {
  openid;
  sessionKey;
  config = {
    navigationBarTitleText: "首页"""
  };

  state = {
    userInfo: {
      avatarUrl: null,
      nickName: null
    },
    swiperList: [
      { text: 1 },
      { text: 2 },
      { text: 3 },
      { text: 4 },
      { text: 5 }
    ]
  };

  /**
   * 获取用户登陆码
   */
  getLoginCode = () => {
    Taro.login({
      success: res => {
        console.log("login code : ", res);
        this.getOpenId(res.code);
      }
    });
  };

  /**
   * 获取用户openId
   */
  getOpenId = code => {
    Taro.request({
      url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${secret}&js_code=${code}&grant_type=authorization_code`,
      data: {},
      header: {
        "content-type": "application/json"
      },
      success: res => {
        // 获取data里的openid和session_key
        console.log(
          `openId : ${res.data.openid}，session_key：${res.data.session_key}`
        );
        this.openId = res.data.openId;
        this.sessionKey = res.data.session_key;
      }
    });
  };

  onGotUserInfo = info => {
    console.log("onGotUserInfo : ", info);
    Taro.request({
      url: "http://127.0.0.1:8081/aes",
      data: {
        appId,
        sessionKey: this.sessionKey,
        encryptedData: info.detail.encryptedData,
        iv: info.detail.iv
      },
      header: {
        "content-type": "application/json"
      },
      success: res => {
        // 获取data里的openid和session_key
        console.log(res);

        // 临时添加数据
        res.data.credits = "2000";
        res.data.level = "金卡";
        res.data.userCode = "asdfasdfasdfasdfasdf";

        this.setState({
          userInfo: res.data
        });
      }
    });
  };

  componentDidMount() {
    this.getLoginCode();
  }

  render() {
    const { userInfo, swiperList } = this.state;
    const {
      avatarUrl,
      nickName,
      credits = "",
      level = "",
      userCode = ""
    } = userInfo;

    return (
      <View className={styles.indexRoot}>
        {/* 卡片及积分信息 */}
        <View className={styles.pageTop}>
          {/* 会员卡 */}
          <View className={`${styles.cardWrap} b-s-b`}>
            {/* cardInfo */}
            <View className={`${styles.cardInfo} b-s-b`}>
              <View className={styles.cardTop}>
                <View className={styles.left}>
                  {/* logo */}
                  <View className={styles.logo}>
                    <Image src={logoImg} className={styles.logoImg} />
                    <Text className={styles.logoText}>万用积分卡</Text>
                  </View>
                  {/* user */}
                  <View className={styles.userInfo}>
                    <View className={`${styles.userPhoto} b-s-b`}>
                      {avatarUrl && (
                        <View className={styles.avatarWrap}>
                          <Image src={avatarUrl} className={styles.avatar} />
                        </View>
                      )}
                    </View>
                    <View className={styles.userName}>
                      {nickName ? (
                        nickName
                      ) : (
                        <Button
                          className={styles.loginBtn}
                          open-type="getUserInfo"
                          lang="zh_CN"
                          onGetUserInfo={this.onGotUserInfo}
                        >
                          点击登录
                        </Button>
                      )}
                    </View>
                  </View>
                </View>
                {/* 二维码 */}
                <View className={styles.right}>
                  <Image src={qr} className={styles.qrImg} />
                </View>
              </View>
              {/* 会员编号 */}
              <View className={styles.cardBottom}>
                会员编号
                <Text>{userCode ? userCode : ""}</Text>
              </View>
            </View>
          </View>
          {/* 积分信息 */}
          <View className={styles.credits}>
            <View className={styles.left}>
              <View>
                <View>积分商城</View>
                <View>{credits ? credits : "--"}</View>
              </View>
            </View>
            <View className={styles.right}>
              <View>
                <View>等级</View>
                <View>{level ? level : "--"}</View>
              </View>
            </View>
          </View>
        </View>
        {/* 卡片及积分信息 */}
        <View className={styles.pageCenter}>
          <View className={styles.btn}>连接你的各种积分卡</View>
        </View>
        {/* swiper */}
        <Swiper
          className={styles.swiper}
          indicatorColor="#999"
          indicatorActiveColor="#333"
          circular
          indicatorDots
          autoplay
        >
          {swiperList.map((item, idx) => {
            return (
              <SwiperItem className={styles.item} key={idx}>
                <View className={styles.swiperCont}>{item.text}</View>
              </SwiperItem>
            );
          })}
        </Swiper>
      </View>
    );
  }
}

export default Index;
