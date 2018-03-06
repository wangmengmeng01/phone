import $http from './http'
import api from './api';
/**
 * 产品列表页
 */
export const productSearchBidsList = async (params)=>{
  return await $http({
    method: 'get',
    api: api.productSearchBidsList,
    options: {
      loading: false,
      filter_code: false
    },
    params,
  });
}