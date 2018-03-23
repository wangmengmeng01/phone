import $http from './http'
import api from './api';


/**
 * 查询卡券礼物列表
 */
export const searchGiveCouponList = async (params) => {
  return await $http({
    method: 'get',
    api: api.searchGiveCouponList,
    params,
  });
}



/**
 * 领取优惠券
 */
export const searchCouponReceiveDetails = async (params) => {
  return await $http({
    method: 'post',
    api: api.searchCouponReceiveDetails,
    params,
  });
}




/**
 * 履行承诺列表
 */
export const getPromiseInviteList = async (params) => {
  return await $http({
    method: 'get',
    api: api.getPromiseInviteList,
    params,
  });
}



/**
 * 展业良机
 */
export const getPossibleInviteList = async (params) => {
  return await $http({
    method: 'get',
    api: api.getPossibleInviteList,
    params,
  });
}
