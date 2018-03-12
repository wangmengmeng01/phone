import $http from './http'
import api from './api';


/**
 * 查询用户信息
 */
export const searchGiveCouponList = async (params)=>{
  return await $http({
    method: 'get',
    api: api.searchGiveCouponList,
    params,
  });
}
