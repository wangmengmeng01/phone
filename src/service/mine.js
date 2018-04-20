import $http from './http'
import api from './api';

/**
 * 获取已有客户
 */
export const searchExistingCustomers = async (params) => {
  return await $http({
    method: 'get',
    api: api.searchExistingCustomers,
    params,
  });
}


/**
 * 获取潜在客户
 */
export const searchPotentialCustomers = async (params) => {
  return await $http({
    method: 'get',
    api: api.searchPotentialCustomers,
    params,
  });
}

/**
 * 赠送优惠
 */
export const saveGiveCoupon = async (params) => {
  return await $http({
    method: 'post',
    api: api.saveGiveCoupon,
    params,
  });
}

/**
 * 赠送记录
 */
export const searchCouponSendList = async (params) => {
  return await $http({
    method: 'get',
    api: api.searchCouponSendList,
    params,
  });
}

/**
 * 获取已有客户
 */
export const getUserBrokerageRecordList = async (params) => {
  return await $http({
    method: 'get',
    api: api.getUserBrokerageRecordList,
    params,
  });
}


/**
 * 获取历史展业登记
 */
export const getShowBusinessHistory = async (params) => {
  return await $http({
    method: 'get',
    api: api.getShowBusinessHistory,
    params,
  });
}



/**
 * 查询已有客户信息详情
 */
export const getExistingCustomers = async (params) => {
  return await $http({
    method: 'get',
    api: api.getExistingCustomers,
    params,
  });
}


/**
 * 查询用户信息
 */
export const searchUserInfo = async (params) => {
  return await $http({
    method: 'get',
    api: api.searchUserInfo,
    params,
  });
}

/**
 * 展业登记
 */
export const showBusinessRecord = async (params) => {
  return await $http({
    method: 'post',
    api: api.showBusinessRecord,
    params,
  });
}


/**
 * 查询理财师信息
 */
export const searchMyManagerUserInfo = async (params) => {
  let filter_msg = true;
  try {
    filter_msg = !params.filter_msg
  } catch (e) {}
  return await $http({
    method: 'get',
    api: api.searchMyManagerUserInfo,
    params,
    options: {
      filter_msg:false
    }
  });
}
/**
 * 获取token
 */
export const getZwToken = async (params) => {
  return await $http({
    method: 'post',
    api: api.getZwToken,
    params,
  });
}


/**
 * 发送短信
 */
export const sendMessage = async (params) => {
  return await $http({
    method: 'post',
    api: api.sendMessage,
    params,
    options: {
      filter_code: false,
      filter_msg: false
    }
  });
}

/**
 * 添加理财师
 */
export const updateManagerUserForM = async (params) => {
  return await $http({
    method: 'post',
    api: api.updateManagerUserForM,
    params,
  });
}

/**
 * 添加客户
 */
export const updateUserForM = async (params) => {
  return await $http({
    method: 'post',
    api: api.updateUserForM,
    params,
  });
}

