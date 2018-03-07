import $http from './http'
import api from './api';

/**
 * 产品列表页
 */
export const showGiveCouponList = (params)=>{
  return $http({
    method: 'get',
    api: api.showGiveCouponList,
    params,
  });
}
