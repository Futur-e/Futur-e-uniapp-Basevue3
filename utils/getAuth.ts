/*
import {
  userAuthSession,
  wechatAuth
} from '@/api/auth'
import cookie from '@/utils/cookie'
import { isWeixin,parseQuery } from '@/utils/util'
import { APP_ID } from '@/config'

const wechatMiniLogin = (main) => {
  //this.$u.toast('登录中');
  uni.login({
    provider: 'weixin'
  }).then(async (res) => {
    let data = await userAuthSession({
      code: res.code
    });
    if (data) {
      console.log('data.openId:', data.openId)
      main.SET_OPENID(data.openId)
      if (data.hasOwnProperty('userInfo') && data.accessToken && data.accessToken != '') {
        main.SET_MEMBER(data.userInfo);
        main.SET_TOKEN(data.accessToken);
      }
    }
  });
}

const getAuthUrl = (appId) => {
  // #ifdef H5
  // #endif
  cookie.set('redirect', window.location.href)
  const url = `${location.origin}/h5/#/pages/index/index`
  cookie.set('index_url', url)
  let redirect_uri = encodeURIComponent(url)

  const state = 'STATE'
  return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
}

const oAuth = async (main) => {
  const WX_AUTH = 'wx_auth'
  return new Promise((resolve, reject) => {

    const accessToken = uni.getStorageSync('accessToken');
    if (cookie.has('wx_auth') && accessToken && main.isLogin) {
      reject()
      return
    }
    const { code } = parseQuery()
    if (!code) {
      //公众号appid
      const appid = APP_ID;
      location.href = getAuthUrl(appid)
      return
    } else {
      auth(code, main)
    }
    resolve()
  }).catch(error => {
    console.log(error)
  })
}

const auth = async (code, main) => {
  console.log('获取微信授权:', code)
  let data = await wechatAuth({ 'code': code })
  cookie.set('wx_auth', code)
  if (data) {
    main.SET_OPENID(data.openId)
    main.SET_MEMBER(data.userInfo);
    main.SET_TOKEN(data.accessToken);

    let newParams = cookie.get('params')
    if (newParams) {
      uni.navigateTo({
        url: '/pages/components/pages/scan/scan'
      })
    }
  }
}

export const handleGetAuth = async (main) => {
  // 检查用户登录情况
	// #ifdef H5
	if(isWeixin()){
	
		// H5编译的代码
		// 判断是否是微信浏览器
		
		oAuth(main)
		//return;
	}
	// #endif
	// #ifdef MP-WEIXIN
	wechatMiniLogin(main);
	// #endif
}
*/
