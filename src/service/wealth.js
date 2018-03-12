import $http from './http'
import api from './api';

/**
 * 财富页
 */

/**
 * 自动复投查询
 */

export const autoInvestQuary = async (params)=>{
  return await $http({
    method: 'get',
    api: api.autoInvestQuary,
    params,
  });
};

// 财富首页
export const wealthIndex = async (params)=>{
  return await $http({
    method: 'get',
    api: api.wealthIndex,
    params,
  });
};

// 财富我的资产
export const invesProperty = async (params)=>{
  return await $http({
    method: 'get',
    api: api.invesProperty,
    params,
  });
};


// 风险评测
export const userReskEvaluation = async (params)=>{
  return await $http({
    method: 'post',
    api: api.userReskEvaluation,
    params,
  });
};
