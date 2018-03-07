import $http from './http'
import config from '@/config'
import { transformRequest } from '@/until'
import store from '@/store/'
import api from './api';
export * from './main'
export * from './product'
export * from './coupon'

/**
 * 登录
 */
export const login = async (params)=>{
  return await $http({
    method: 'post',
    api: api.login,
    options: {
      loading: false,
      filter_code: false
    },
    params,
  });
}



/**
 * 注册
 */
export const register = (params)=>{
  params.token = store.state.token;
  return $http({
    method: 'post',
    api: api.register,
    params,
  })
}



/**
 * 发送短信
 */
export const sendSMS = (params)=>{
  params.token = store.state.token;
  return $http({
    method: 'post',
    api: api.getSmsCode,
    params,
  })
}



/**
 * 获取token
 */
export const getToken = ()=>{
  return $http({
    method: 'post',
    api: api.getToken,
  });
};


/**
 * 获取图形验证码
 */
export const getValidateImage = ()=>{
  return new Promise((resolve)=>{
    getToken().then(r=>{
      const params = {
        token: r.token,
        timestamp: +new Date()
      };
      resolve(`${config.url}${api.getValidateImage}?${transformRequest(params)}`);
      store.commit('SET_TOKEN', r.token);
      $http({
        method: 'get',
        api: api.getValidateImage,
        params
      })
    });
  })
};



/**
 * 退出登录
 * @param  {String} pid 产品id
 */
export const logout = (params)=>{
  return $http({
    method: 'get',
    api: api.logout,
    params,
  });
}



/**
 * 找回密码
 * @param  {String} pid 产品id
 */
export const findPasswordBack = (params)=>{
  return $http({
    method: 'post',
    api: api.findPasswordBack,
    params,
  });
}




/**
 * 字典
 * @param  {String} pid 产品id
 */
export const getDictCodeList = (dict_type_)=>{
  return $http({
    method: 'get',
    api: api.getDictCodeList,
    params:{dict_type_},
  });
}
