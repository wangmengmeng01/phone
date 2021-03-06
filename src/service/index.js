import $http from './http'
import config from '@/config'
import {
  transformRequest
} from '@/until'
import store from '@/store/'
import api from './api';
export * from './main'
export * from './product'
export * from './coupon'
export * from './bank'
export * from './mine'
export * from './wealth'
export * from './home'
export * from './found'


/**
 * 登录
 */
export const login = async (params) => {
  return await $http({
    method: 'post',
    api: api.login,
    options: {
      loading: params.loading
    },
    params,
  });
}

/**
 * 是否登录
 */
export const isRegister = async (params) => {
  return await $http({
    method: 'get',
    api: api.isRegister,
    options: {
      loading: false,
      filter_msg: false
    },
    params,
  });
}


/**
 * 注册
 */
export const register = (params) => {
  params.token = store.state.token;
  return $http({
    method: 'post',
    api: api.register,
    params,
  })
}




/**
 * 忘记密码
 */
export const forgetPassWord = (params) => {
  params.token = store.state.token;
  return $http({
    method: 'post',
    api: api.forgetPassWord,
    params,
  })
}



/**
 * 发送短信
 */
export const sendSMS = (params) => {
  params.token = store.state.token;
  return $http({
    method: 'post',
    api: api.getSmsCode,
    params,
  })
}



/**
 * 发送汇付短信
 */
export const sendSmsCode = (params) => {
  return $http({
    method: 'post',
    api: api.sendSmsCode,
    params,
  })
}



/**
 * 获取token
 */
export const getToken = () => {
  return $http({
    method: 'post',
    api: api.getToken,
  });
};


/**
 * 获取图形验证码
 */
export const getValidateImage = () => {
  return new Promise((resolve) => {
    getToken().then(r => {
      const params = {
        token: r.token,
        timestamp: +new Date()
      };
      resolve(`${config.url}${api.getValidateImage}?${transformRequest(params)}`);
      store.commit('SET_IMGCODE_TOKEN', r.token);
      sessionStorage.setItem("token",r.token)
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
export const logout = (params) => {
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
export const findPasswordBack = (params) => {
  return $http({
    method: 'post',
    api: api.findPasswordBack,
    params,
  });
}




/**
 * 银行开户
 * @param  {String} pid 产品id
 */
export const openAccount = (params) => {
  return $http({
    method: 'post',
    api: api.openAccount,
    params
  });
}

/**
 * 银行换绑卡
 * @param  {String} pid 产品id
 */
export const quickBinding = (params) => {
  return $http({
    method: 'post',
    api: api.quickBinding,
    params,
    options: {
      filter_code: false,
      filter_msg: false
    }
  });
}

/**
 * 用户激活
 * @param  {String} pid 产品id
 */
export const userActivate = (params) => {
  return $http({
    method: 'post',
    api: api.userActivate,
    params
  });
}
