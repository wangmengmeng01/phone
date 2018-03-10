import $http from './http'
import api from './api';

/**
 * 首页新手专享
 */
export const noviceExclusive = async (params)=>{
  return await $http({
    method: 'get',
    api: api.noviceExclusive,
    params,
  });
}

/**
 * 首页为您推荐
 */
export const recommendProduct = async (params)=>{
  return await $http({
    method: 'get',
    api: api.recommendProduct,
    params,
  });
}

/**
 * 首页热销产品
 */
export const sellsProduct = async (params)=>{
  return await $http({
    method: 'get',
    api: api.sellsProduct,
    params,
  });
}

