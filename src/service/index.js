import $http from './http'
import api from './api';
export * from './main'

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
  return $http({
    method: 'post',
    api: api.register,
    params,
  });
}



/**
 * 发送短信
 */
export const sendSMS = (url, params)=>{
  return $http({
    method: 'post',
    api: api.sendSMS + url,
    options:{
      filter_code: true
    },
    params,
  });
}



/**
 * 发送短信
 */
export const sendSMSH5Api = (params)=>{
  return $http({
    method: 'post',
    api: api.sendSMSH5Api,
    options:{
      filter_code: true
    },
    params,
  });
}




/**
 * 获取图形验证码
 */
export const getPicCodeApi = ( params)=>{
  return $http({
    method: 'get',
    api: api.getPicCodeApi,
    params,
  }).then(r=>{
    let url = '';
    if(location.href.includes(require('@/config').pro.origin)){
      url = require('@/config').pro.url
    }else if(location.href.includes(require('@/config').uat.origin)){
      url = require('@/config').uat.url
    }else if(location.href.includes(require('@/config').test.origin)){
      url = require('@/config').test.url
    }else{
      url = require('@/config').dev.url
    }
    return {
      url:`${url}${r.pic_verify_url_}?id_=${r.id_}`,
      id: r.id_
    }
  });
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
