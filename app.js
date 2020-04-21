var GA = require('./GA/ga.js').default;



let config = {
  transferRequest(config) {
    console.log('do something before sending the hit')
    //config.data.dp = "/test"
    return config
  },
  data: {  //common request payload
    v: 1,
    cid: 1234556,
    tid: "UA-71412438-1",
    dp: "not_set",
    ds: "wechat",
    t:"pageview",
  },
  transferResponse(res) {
    console.log("do something for the response")
    return res
  },
  validateHit:true,
  debug:true,

  validateHit: false, // will send to the vvalidation endpoint(optional)
  onSuccess(config) {
    console.log("success") //your custom success function (options)
  },
  onError(config,res) {
    console.log("Error Event")
    wx.g.post({
      t:"event",
      ec:"Error",
      ea:res,
    })
  },
  maxLogLength:10,
  enableLogger: true,
}





var GA = new GA(config)
//window.GA= GA
GA.interceptors.request.use(function (config) { // push a handler function before send request
  //config.data.dp = getCurrentPageUrlWithArgs()
  console.log(JSON.stringify(config.data))
  return config;
});

wx.g = GA



App({
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function (options) {
    console.log('App Show')
    let utm = {
      cs: "wechat",
      cm: options.scene,
      cn: "Campaign Name",
      cc: "content"
    }
    config.data = {
      ...config.data,
      ...utm
    }
    console.log(options.scene)
    console.log(config)
  },
  GA,
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false
  }
})
