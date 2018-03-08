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
	
  showGiveCouponList: 'coupon/filter/showGiveCouponList', // 选择可送优惠(GET请求)


}
