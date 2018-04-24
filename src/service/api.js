export default {

  login: 'user/login', // 登录

  isRegister: 'user/isRegister',//是否注册

  register: 'user/register', // 注册

  forgetPassWord: 'user/forgetPassWord', // 忘记密码

  getToken: 'user/getToken', // 获取token

  getSmsCode: 'user/getSmsCode', // 发送短信验证码(合规平台)

  sendSmsCode: 'account/filter/sendSmsCode', // 发送短信验证码(合规汇付)

  getValidateImage: 'user/getValidateImage', // 获取图片验证码

  getBanks: 'account/filter/getBanks', // 获取支持银行卡列表接口

  openAccount: 'account/filter/openAccount', // 用户开户接口

  productSearchBidsList: 'bid/searchBidsList', // 产品页

  userActivate: '/account/filter/userActivate', // 用户激活

  getProductBidsList: 'bid/getProductBidsList', //产品列表页

  searchProductBidsDetail: 'bid/searchProductBidsDetail', //产品详情页

  doConfirmBuyPage: 'product/filter/doConfirmBuyPage', //确认购买页

  autoInvestQuary: 'account/filter/queryTenderPlan', //自动复投信息查询

  wealthIndex: "account/filter/searchUserAccount", //财富首页信息

  invesProperty: "account/filter/invesProperty", //财富首页信息

  getPromiseInviteList: 'promise/filter/getPromiseInviteList', // 履行承诺列表

  userReskEvaluation: "evaluation/filter/userReskEvaluation", // 风险评测

  getCouponBenefit: 'coupon/filter/getCouponBenefit', // 选取优惠

  searchGiveCouponList: 'coupon/filter/searchGiveCouponList', // 查询卡券礼物列表

  searchCouponReceiveDetails: 'coupon/filter/searchCouponReceiveDetails', // 查询卡券规则详情信息

  getPossibleInviteList: 'showChance/getPossibleInviteList', // 展业良机

  showGiveCouponList: 'coupon/filter/showGiveCouponList', // 选择可送优惠

  searchExistingCustomers: 'home/filter/searchExistingCustomers', // 获取已有客户

  searchMyManagerUserInfo: 'user/filter/searchMyManagerUserInfo', // 我的理财师

  getExistingCustomers: 'home/filter/getExistingCustomers', // 查询已有客户信息详情

  searchPotentialCustomers: 'home/filter/searchPotentialCustomers', // 获取潜在客户

  searchUserInfo: 'user/filter/searchUserInfo', // 查询用户信息

  saveGiveCoupon: 'coupon/filter/saveGiveCoupon', // 赠送优惠

  getShowBusinessHistory: 'home/filter/getShowBusinessHistory', // 获取历史展业登记

  getUserBrokerageRecordList: 'brokerage/filter/getUserBrokerageRecordList', // 获取用户佣金流水信息

  noviceExclusive: 'product/noviceExclusive', //新手专享

  recommendProduct: 'product/recommendProduct', //为您推荐

  sellsProduct: 'product/sellsProduct', //热销产品

  searchManagerCheckStatus: 'manager/filter/searchManagerCheckStatus', //理财师审核状态查询

  saveUserManager: 'manager/filter/saveUserManager', //加盟理财师

  getUserStatus: 'account/filter/getUserStatus', //获取用户状态

  accountAcmountInfo: 'account/filter/accountAcmountInfo', //获取用户各种金额

  getExpectedRevenue: 'bid/filter/getExpectedRevenue', //计算收益

  searchCouponList: 'coupon/filter/searchCouponList', //查询购买的可用卡券数量

  borrowInvest: 'bid/filter/borrowInvest', //购买标的

  selectBeforeRecharge: 'account/filter/selectBeforeRecharge', //充值前信息查询

  rechargeSendSmsCode: 'account/filter/sendSmsCode', //充值发送短信

  searchUserCouponInfo: 'coupon/filter/searchUserCouponInfo', // 我的优惠

  submitUserRecharge: 'account/filter/submitUserRecharge', //充值提交

  searchBidsInvestList: 'bid/searchBidsInvestList', //购买记录

  standardAndPlanList: 'bid/standardAndPlanList', //严选优质列表

  userCashFee: 'account/filter/userCashFee', //取现手续费

  toCash: 'account/filter/toCash', //取现

  autoTenderPlan: 'account/filter/autoTenderPlan', //自动复投

  signingContract: 'contract/filter/signingContract', //生成合同

  querySigningStatus: 'contract/filter/querySigningStatus', //签约状态

  quickBinding: 'account/filter/quickBinding', //换绑银行卡

  transactionRecord: 'account/filter/transactionRecord', //交易记录

  getUserEarningsDetail: 'account/filter/getUserEarningsDetail', //续投列表接口

  continueOpenOperator: 'account/filter/continueOpenOperator', //续投开关

  uploadFile: 'image/filter/uploadFile', //上传图片

  investPropertyDetail: 'account/filter/investPropertyDetail', //持有债券详情

  serchDebtHoldedRecord: 'debt/filter/serchDebtHoldedRecord', //持有债券列表
  
  invesPropertyCustomer:'account/filter/invesPropertyCustomer',//理财师客户资产
  
  getProductList:'product/getProductList',//推荐产品列表
  
  showBusinessRecord:'home/filter/showBusinessRecord',//展业登记
  
  searchCouponSendList:'coupon/filter/searchCouponSendList',//赠送记录
  
   getZwToken:'user/getZwToken',//获取卓信token
  
  sendMessage:'user/filter/sendMessage',//发送短信
  
  updateManagerUserForM:'user/filter/updateManagerUserForM',//添加理财师
  
  updateUserForM:'user/filter/updateUserForM',//添加客户
  
  getCustomer:'/home/filter/getCustomer',//查询客户
 
  promiseInvite:'promise/filter/promiseInvite',//发起邀约
  
  getUserManagerPromiseInviteList:'promise/filter/getUserManagerPromiseInviteList',//邀约记录
  
  getInviteRecordList:'home/filter/getInviteRecordList',//邀请好友记录
  
  registerForFriend:'user/registerForFriend',//邀请好友注册
  
}
