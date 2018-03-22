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
		options: {
			filter_code: false,
			filter_msg: false
		}
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

// 取现
export const toCash = async (params)=>{
  return await $http({
    method: 'post',
    api: api.toCash,
    params,
  });
};
// 自动复投
export const autoTenderPlan = async (params)=>{
  return await $http({
    method: 'post',
    api: api.autoTenderPlan,
    params,
  });
};

// 生成合同
export const signingContract = async (params)=>{
  return await $http({
    method: 'post',
    api: api.signingContract,
    params,
  });
};


// 签约状态
export const querySigningStatus = async (params)=>{
  return await $http({
    method: 'post',
    api: api.querySigningStatus,
    params,
  });
};

// 交易记录
export const transactionRecord = async (params)=>{
  return await $http({
    method: 'get',
    api: api.transactionRecord,
    params,
  });
};

// 续投列表
export const getUserEarningsDetail = async (params)=>{
  return await $http({
    method: 'get',
    api: api.getUserEarningsDetail,
    params,
  });
};

// 续投开关
export const continueOpenOperator = async (params)=>{
  return await $http({
    method: 'post',
    api: api.continueOpenOperator,
    params,
  });
};

// 持有债券详情
export const investPropertyDetail = async (params)=>{
  return await $http({
    method: 'get',
    api: api.investPropertyDetail,
    params,
  });
};