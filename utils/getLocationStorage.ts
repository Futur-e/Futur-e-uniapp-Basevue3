/*

import { SCHOOLINFO_CHACHE_KEY } from '../constants';
import {
  getNearregions
} from '@/api/home'

const setSchoolInfoStorage = async (payload) => {
  uni.setStorage({
    key: SCHOOLINFO_CHACHE_KEY,
    data: JSON.stringify(payload),
  });
}

export const changeSchoolInfoStorage = async (payload, main) => {
  let cache = await uni.getStorageSync(SCHOOLINFO_CHACHE_KEY);

  cache = cache && JSON.parse(cache);
  if (cache && cache.code !== 2) {
    cache.data.schoolInfo = payload;
    uni.setStorage({
      key: SCHOOLINFO_CHACHE_KEY,
      data: JSON.stringify(cache),
    });

     main.SET_SCHOOLINFO(payload);
  }
}

export const getLocationStorage = async (): Promise<null | {longitude: number; latitude: number; }> => {
  return new Promise(resolve => {
    uni.getLocation(({
      type: 'wgs84',
      success: function (res) {
        console.log('location1:', res)

        const location = {
          latitude: res.latitude,
          longitude: res.longitude
        }
        // setLocationStorage(location);
        resolve(location);
      },
      fail: function (res) {
        uni.showToast({
          title: '获取位置失败，请检查是否开启相关权限',
          duration: 2000,
          icon: 'error'
        });
        resolve(null);
        // uni.openSetting();
      },
      complete: function () {
        resolve(null);
      }
    }));

  });
}

/!**
 * 
 * @param type
 * @returns 
 * code 0: 成功 有定位有学校 { code 0, data: { location, schoolInfo } }
 * code 1: 成功 有定位无学校 { code 1, data: { location } }
 * code 2: 成功 无定位无学校 { code 2, data: null }
 *!/

export const getSchoolInfo = async (type: string) => {
  try {
    if (type !== 'reload') {
      let cache = await uni.getStorageSync(SCHOOLINFO_CHACHE_KEY);

      cache = cache && JSON.parse(cache);
      if (cache && cache.code !== 2) {
        return cache;
      }
    }
    const location = await getLocationStorage();
    let schoolInfo = null;
    if (location) {
      const list = await getNearregions({
        lng: location.longitude,
        lat: location.latitude
      });
      schoolInfo = list?.[0];
      // schoolInfo = null;
    }

    const resData = {
      location,
      schoolInfo
    }

    const code = location ? (schoolInfo ? 0 : 1) : 2;

    const res = {
      code,
      data: resData
    }
    setSchoolInfoStorage(res);
    return res;
  } catch(e) {
    console.error(e);
    return null;
  }
}

export const reloadSchoolInfo = () => getSchoolInfo('reload');*/
