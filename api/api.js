// #ifdef H5
// h5端
import Fly from 'flyio/dist/npm/fly'
// #endif

// #ifdef APP-PLUS
// app端
import Fly from 'flyio/dist/npm/wx'
// #endif

// #ifdef MP-WEIXIN
import Fly from 'flyio/dist/npm/wx'
// #endif

import { handleLoginFailure } from '@/utils'
import { isWeixin } from '@/utils/util'
import { VUE_APP_API_URL } from '@/config'
import cookie from '@/utils/cookie'
import { replace } from '@/utils/router'
import { SCHOOLINFO_CHACHE_KEY } from '@/constants';

const fly = new Fly()
fly.config.baseURL = VUE_APP_API_URL

fly.interceptors.response.use(
  response => {
    console.log('response', response)
    // 定时刷新access-token
    return response
  },
  error => {

    console.log('response008:', error)
    if (error.toString() == 'Error: Network Error') {
      handleLoginFailure()
      return Promise.reject({ msg: '未登录', toLogin: true })
    }
    if (error.status == 401) {
      handleLoginFailure()
      return Promise.reject({ msg: '未登录', toLogin: true })
    }
    if (error.response.data.status == 5109) {
      uni.showToast({
        title: error.response.data.msg,
        icon: 'none',
        duration: 2000,
      })
    }
    return Promise.reject(error)
  }
)

let tenantId = undefined;

const defaultOpt = { login: true }

function baseRequest(options) {
  const token = cookie.get('accessToken')
  // console.log('--> % token % token:\n', token)

  // 获取配置到缓存的 tenantId
  let cache = uni.getStorageSync(SCHOOLINFO_CHACHE_KEY);
  cache = cache && JSON.parse(cache);

  if (cache && cache.code === 0) {
    tenantId = cache.data?.schoolInfo?.tenantId || '';
  }

  options.headers = {
    ...options.headers,
  }

  // if (options.login === true) {
  options.headers = {
    'tenant-id': tenantId,
    ...options.headers,
    Authorization: 'Bearer ' + token,
  }
  // }

  if (!options.headers['tenant-id']) {
    delete options.headers['tenant-id'];
  }

  // 结构请求需要的参数
  const { url, params, data, login, ...option } = options

  // 发起请求
  return fly
    .request(url, params || data, {
      ...option,
    })
    .then(res => {

      const data = res.data || {}
      //console.log('res.status:',res)
      console.log('res.code:', res.code)
      // #ifdef H5
      if (res.data.code == 1004004002) {
        if (isWeixin()) {
          const url = cookie.get('index_url')
          //console.log('redirect_uri:',url)
          //const url = `${location.origin}/h5/#/pages/index/index`
          location.href = url
          return
        }
      }
      // #endif

      if (res.status !== 200) {
        return Promise.reject({ msg: '请求失败', res, data })
      }


      if (data.code == 401) {
        uni.hideLoading()
        handleLoginFailure()
        uni.showToast({
          title: data.msg,
          icon: 'none',
          duration: 2000,
        })
        return Promise.reject({ msg: data.msg, res, data })
      }

      if (data.code != 0) {
        uni.showToast({
          title: data.msg,
          icon: 'none',
          duration: 2000,
        })
        return Promise.reject({ data, res })
      }


      return Promise.resolve(data.data, res)

      // if ([401, 403].indexOf(data.status) !== -1) {
      //   handleLoginFailure()
      //   return Promise.reject({ msg: res.data.msg, res, data, toLogin: true })
      // } else if (data.status === 200) {
      //   return Promise.resolve(data, res)
      // } else if (data.status == 5101) {
      //   return Promise.reject({ msg: res.data.msg, res, data })
      // } else {
      //   return Promise.reject({ msg: res.data.msg, res, data })
      // }
    })
}

/**
 * http 请求基础类
 * 参考文档 https://www.kancloud.cn/yunye/axios/234845
 *
 */
const request = ['post', 'put', 'patch'].reduce((request, method) => {
  /**
   *
   * @param url string 接口地址
   * @param data object get参数
   * @param options object axios 配置项
   * @returns {AxiosPromise}
   */
  request[method] = (url, data = {}, options = {}) => {
    console.log(url, data)
    return baseRequest(Object.assign({ url, data, method }, defaultOpt, options))
  }
  return request
}, {})

  ;['get', 'delete', 'head'].forEach(method => {
    /**
     *
     * @param url string 接口地址
     * @param params object get参数
     * @param options object axios 配置项
     * @returns {AxiosPromise}
     */
    request[method] = (url, params = {}, options = {}) => {
      return baseRequest(Object.assign({ url, params, method }, defaultOpt, options))
    }
  })

export default request
