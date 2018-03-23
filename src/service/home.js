import $http from './http'
import api from './api';

/**
 * 首页新手专享
 */
export const noviceExclusive = async (params) => {
  return await $http({
    method: 'get',
    api: api.noviceExclusive,
    params,
  });
}

/**
 * 首页为您推荐
 */
export const recommendProduct = async (params) => {
  return await $http({
    method: 'get',
    api: api.recommendProduct,
    params,
  });
}

/**
 * 首页热销产品
 */
export const sellsProduct = async (params) => {
  return await $http({
    method: 'get',
    api: api.sellsProduct,
    params,
  });
}


/**
 * 理财师审核状态查询
 */
export const searchManagerCheckStatus = async (params) => {
  return await $http({
    method: 'get',
    api: api.searchManagerCheckStatus,
    params,
    options: {
      filter_code: false,
      filter_msg: false
    },
  });
}


/**
 * 加盟理财师
 */
export const saveUserManager = async (params) => {
  return await $http({
    method: 'post',
    api: api.saveUserManager,
    params,
    options: {
      filter_code: false,
      filter_msg: false
    },
  });
}

/**
 * 加盟上传图片
 */
export const uploadFile = async (params) => {
  return await $http({
    method: 'post',
    api: api.uploadFile,
    params,
    options: {
      filter_code: false,
      filter_msg: false
    },
  });
}
