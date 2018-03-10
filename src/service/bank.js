import $http from './http'
import api from './api';


/**
 * 查询用户信息
 */
export const getBanks = async (params)=>{
  return await $http({
    method: 'get',
    api: api.getBanks,
    params,
  });
}
