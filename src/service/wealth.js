import $http from './http'
import api from './api';

/**
 * 财富页
 */

/**
 * 自动复投查询
 */

export const autoInvestQuary = async(params) => {
	return await $http({
		method: 'get',
		api: api.autoInvestQuary,
		params,
	});
};

// 财富首页
export const wealthIndex = async(params) => {
	return await $http({
		method: 'get',
		api: api.wealthIndex,
		params,
	});
};

// 财富我的资产
export const invesProperty = async(params) => {
	return await $http({
		method: 'get',
		api: api.invesProperty,
		params,
	});
};

// 风险评测
export const userReskEvaluation = async(params) => {
	return await $http({
		method: 'post',
		api: api.userReskEvaluation,
		params,
	});
};

// 充值前信息查询
export const selectBeforeRecharge = async(params) => {
	return await $http({
		method: 'get',
		api: api.selectBeforeRecharge,
		params,
	});
};

// 充值短信
export const rechargeSendSmsCode = async(params) => {
	return await $http({
		method: 'post',
		api: api.rechargeSendSmsCode,
		params,
		options: {
			filter_code: false,
			filter_msg: false
		}
	});
};


// 我的优惠
export const searchUserCouponInfo = async (params)=>{
  return await $http({
    method: 'get',
    api: api.searchUserCouponInfo,
    params,
  });
};


// 充值提交
export const submitUserRecharge = async (params)=>{
  return await $http({
    method: 'post',
    api: api.submitUserRecharge,
    params,
  });
};

// 取现手续费
export const userCashFee = async (params)=>{
  return await $http({
    method: 'post',
    api: api.userCashFee,
    params,
  });
};


