import $http from './http'
import api from './api';

/**
 * 产品页
 */
export const productSearchBidsList = async (params)=>{
  return await $http({
    method: 'get',
    api: api.productSearchBidsList,
    params,
  });
}


/**
 * 产品列表页
 */
export const getProductBidsList = async (params)=>{
  return await $http({
    method: 'get',
    api: api.getProductBidsList,
    params,
  });
}

/**
 * 产品详情页
 */
export const searchProductBidsDetail = async (params)=>{
  return await $http({
    method: 'get',
    api: api.searchProductBidsDetail,
    params,
  });
}

/**
 * 确认购买页
 */
export const doConfirmBuyPage = async (params)=>{
  return await $http({
    method: 'get',
    api: api.doConfirmBuyPage,
    params,
  });
}
/**
 * 获取用户状态
 */
export const getUserStatus = async (params)=>{
  return await $http({
    method: 'get',
    api: api.getUserStatus,
    params,
    options: {
      filter_code:false,
      filter_msg:false
    }
  });
}

