/**
 * Created by gxx on 2018/1/2.
 */
import $http from './http'
import api from './api';


/**
 * 量子互助
 * @param  {String} pid 产品id
 */
export const lzhz = (params)=>{
  return $http({
    method: 'get',
    api: api.lzhz,
    params,
  });
}


/**
 * 首页
 * @param  {String} pid 产品id
 */
export const getHome = (params)=>{
  return $http({
    method: 'get',
    api: api.newsummary,
    options: {
      loading: false,
    },
    params,
  });
}


/**
 * 我的页面，获取消息
 * @param  {String} pid 产品id
 */
export const countStationLetterMsg = (params)=>{
  return $http({
    method: 'get',
    api: api.countStationLetterMsg,
    options: {
      loading: false,
    },
    params,
  });
}


/**
 * 提额 -获取高级认证状态
 * @param  {String}
 */
export const fundtask = (params)=>{
  return $http({
    method: 'get',
    api: api.fundtask,
    options: {
      loading: false,
    },
    params,
  });
}


/**
 * 提额 -社保认证记录
 * @param  {String} taskid
 */
export const mxsbtask_create = (params)=>{
  return $http({
    method: 'get',
    api: api.mxsbtask_create,
    params,
  });
}


/**
 * 提额 -信用卡认证记录
 * @param  {String} taskid
 */
export const mxmailtask_create = (params)=>{
  return $http({
    method: 'get',
    api: api.mxmailtask_create,
    params,
  });
};


/**
 * 提额 -测评
 * @param  {String}
 */
export const increaseQuotaApply = (params)=>{
  return $http({
    method: 'get',
    api: api.increaseQuotaApply,
    params,
    options: {
      filter_msg: true,
      filter_code: true
    },
  });
};


/**
 * 提额 -得到测评额度
 * @param  {String}
 */
export const get_amount = (params)=>{
  return $http({
    method: 'get',
    api: api.get_amount,
    options: {
      loading: false,
    },
    params,
  });
}


/**
 * 精选平台
 * @param  {String}
 */
export const getThirdProductList = (params)=>{
  return $http({
    method: 'get',
    api: api.getThirdProductList,
    params,
  });
}


/**
 * 精选平台埋点
 * @param  {String}
 */
export const productClickStatics = (params)=>{
  return $http({
    method: 'get',
    api: api.productClickStatics,
    params,
  });
}



