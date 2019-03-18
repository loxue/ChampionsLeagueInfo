import Taro, { Component } from "@tarojs/taro";

import Index from "./pages/mine";
import "./app.scss";

class App extends Component {
  config = {
    pages: [
      "pages/news/index",
      "pages/mine/index",
      "pages/game/index"
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#000000",
      navigationBarTextStyle: "white"
    },
    tabBar: {
      list: [
        {
          pagePath: "pages/news/index",
          text: "新闻",
          iconPath: "pages/images/news.png",
          selectedIconPath: "pages/images/news_high.png"
        }, {
          pagePath: "pages/game/index",
          text: "比赛",
          iconPath: "pages/images/game.png",
          selectedIconPath: "pages/images/game_high.png"
        },{
          pagePath: "pages/mine/index",
          text: "我的",
          iconPath: "pages/images/mine.png",
          selectedIconPath: "pages/images/mine_high.png"
        }
      ],
      color: "#888",
      selectedColor: "#3eb7b5",
      backgroundColor: "#fff"
    }
  };

  render() {
    return <Index />;
  }
}

Taro.render(<App />, document.getElementById("app"));
