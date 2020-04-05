//app.js
App({
  onLaunch: function() {
    wx.authorize({
      scope: 'scope.camera',
    })

    wx.authorize({
      scope: 'scope.userLocation',
    })
  }
})