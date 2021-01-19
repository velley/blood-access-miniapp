export default {
  pages: [
    'pages/index/index',
    'pages/mine/index',
    'pages/notify/index',
    'pages/notify-detail/index',
    'pages/article/index',
    'pages/doctor/index',
    'pages/identify/index',
    'pages/feedback/list/index',
    'pages/feedback/form/index',
    'pages/feedback/detail/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    "selectedColor": "#40a9ff",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "资讯",
        "iconPath": "assets/news.png",
        "selectedIconPath": "assets/news_select.png"
      },
      {
        "pagePath": "pages/mine/index",
        "text": "我的",
        "iconPath": "assets/mine.png",
        "selectedIconPath": "assets/mine_select.png"
      }
    ]
  },
}
