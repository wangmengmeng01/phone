export default {

  login: 'user/login', // 登录

  register: 'user/register', // 注册

  getToken: 'user/getToken', // 获取token

  getSmsCode: 'user/getSmsCode', // 发送短信验证码(合规平台)

  sendSmsCode: 'account/filter/sendSmsCode',  // 发送短信验证码(合规汇付)

  getValidateImage: 'user/getValidateImage', // 获取图片验证码

	productSearchBidsList:'bid/searchBidsList',//产品页

	getProductBidsList:'bid/getProductBidsList',//产品列表页

	searchProductBidsDetail:'bid/searchProductBidsDetail',//产品详情页

	doConfirmBuyPage:'product/filter/doConfirmBuyPage',//确认购买页

  autoInvestQuary:'account/filter/queryTenderPlan',//自动复投信息查询

  wealthIndex:"account/filter/searchUserAccount" ,//财富首页信息

  showGiveCouponList: 'coupon/filter/showGiveCouponList', // 选择可送优惠

  searchExistingCustomers: 'home/filter/searchExistingCustomers', // 获取已有客户

  searchPotentialCustomers: 'home/filter/searchPotentialCustomers', // 获取潜在客户

  searchUserInfo: 'user/filter/searchUserInfo', // 查询用户信息

  saveGiveCoupon: 'coupon/filter/saveGiveCoupon', // 赠送优惠

  getShowBusinessHistory: 'home/filter/getShowBusinessHistory', // 获取历史展业登记

  getUserBrokerageRecordList: 'brokerage/filter/getUserBrokerageRecordList',  // 获取用户佣金流水信息

  noviceExclusive:'product/noviceExclusive',//新手专享

	recommendProduct:'product/recommendProduct',//为您推荐

	sellsProduct:'/product/sellsProduct',//热销产品
}
