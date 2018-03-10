import $http from './http'
import api from './api';

/**
 * 获取已有客户
 */
export const searchExistingCustomers = async (params)=>{
  return await $http({
    method: 'get',
    api: api.searchExistingCustomers,
    params,
  });
}


/**
 * 获取潜在客户
 */
export const searchPotentialCustomers = async (params)=>{
  return await $http({
    method: 'get',
    api: api.searchPotentialCustomers,
    params,
  });
}



/**
 * 赠送优惠
 */
export const saveGiveCoupon = async (params)=>{
  return await $http({
    method: 'post',
    api: api.saveGiveCoupon,
    params,
  });
}


/**
 * 获取已有客户
 */
export const getUserBrokerageRecordList = async (params)=>{
  return await $http({
    method: 'get',
    api: api.getUserBrokerageRecordList,
    params,
  });
}


/**
 * 获取历史展业登记
 */
export const getShowBusinessHistory = async (params)=>{
  return await $http({
    method: 'get',
    api: api.getShowBusinessHistory,
    params,
  });
}



/**
 * 查询已有客户信息详情
 */
export const getExistingCustomers = async (params)=>{
  return await $http({
    method: 'get',
    api: api.getExistingCustomers,
    params,
  });
}


/**
 * 查询用户信息
 */
export const searchUserInfo = async (params)=>{
  return await $http({
    method: 'get',
    api: api.searchUserInfo,
    params,
  });
}
