import $http from './http'
import api from './api';

/**
 * 产品页
 */
export const productSearchBidsList = async (params) => {
  return await $http({
    method: 'get',
    api: api.productSearchBidsList,
    params,
  });
}


/**
 * 产品列表页
 */
export const getProductBidsList = async (params) => {
  return await $http({
    method: 'get',
    api: api.getProductBidsList,
    params,
  });
}

/**
 * 推荐产品列表页
 */
export const getProductList = async (params) => {
  return await $http({
    method: 'get',
    api: api.getProductList,
    params,
  });
}
/**
 * 产品详情页
 */
export const searchProductBidsDetail = async (params) => {
  return await $http({
    method: 'get',
    api: api.searchProductBidsDetail,
    params,
  });
}

/**
 * 确认购买页
 */
export const doConfirmBuyPage = async (params) => {
  return await $http({
    method: 'get',
    api: api.doConfirmBuyPage,
    params,
  });
}
/**
 * 获取用户状态
 */
export const getUserStatus = async (params) => {
  return await $http({
    method: 'get',
    api: api.getUserStatus,
    params,
    options: {
      filter_code: false,
      filter_msg: false
    }
  });
}

/**
 * 获取用户各种金额
 */
export const accountAcmountInfo = async (params) => {
  return await $http({
    method: 'get',
    api: api.accountAcmountInfo,
    params,
  });
}


/**
 * 计算收益
 */
export const getExpectedRevenue = async (params) => {
  return await $http({
    method: 'post',
    api: api.getExpectedRevenue,
    params,
    options: {
      loading: params.loading
    },
  });
}


/**
 * 购买
 */
export const borrowInvest = async (params) => {
  return await $http({
    method: 'post',
    api: api.borrowInvest,
    params,
  });
}

/**
 * 查询可用卡券数目
 */
export const searchCouponList = async (params) => {
  return await $http({
    method: 'get',
    api: api.searchCouponList,
    params,
    options: {
      loading: params.loading
    },
  });
}

/**
 * 购买记录
 */
export const searchBidsInvestList = async (params) => {
  return await $http({
    method: 'get',
    api: api.searchBidsInvestList,
    params,
  });
}
/**
 * 严选优质列表
 */
export const standardAndPlanList = async (params) => {
  return await $http({
    method: 'get',
    api: api.standardAndPlanList,
    params,
  });
}

//查询客户
export const getCustomer = async (params) => {
  return await $http({
    method: 'get',
    api: api.getCustomer,
    params,
  });
}
//发起邀约
export const promiseInvite = async (params) => {
  return await $http({
    method: 'post',
    api: api.promiseInvite,
    params,
  });
}
