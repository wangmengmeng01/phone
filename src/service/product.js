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

