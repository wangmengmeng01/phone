export default {

  login: 'user/login', // 登录

  logout: 'membership/logout', // 退出登录

  sendSMS:'toolbox/sms/sendSMS/',  // 发送短信

  sendSMSH5Api: 'toolbox/sms/sendSMSH5Api', // 发送图像验证码短信

  getPicCodeApi: 'membership/getPicCodeApi', // 图形验证码

  register: 'membership/register', // 注册

  newsummary: 'new/summary', // 首页接口

  countStationLetterMsg:	'operation/countStationLetterMsg', // 站内信用户未读信息统计接口

  showMsgPreview: "operation/showMsgPreview",  // 站内信未读已读列表

  displayGrade: 'operation/experienceValueGradeAPI/displayGrade', // 经验值体系-展示等级

  level_myGrade: 'operation/experienceValueGradeAPI/myGrade', // 经验值体系-我的等级

  detailRule: 'operation/experienceValueGradeAPI/detailRule', // 经验值体系-详细规则

  expValueDetail: 'operation/experienceValueGradeAPI/expValueDetail', // 经验值体系-经验值明细

  fundtask: 'user/senior/info',     // 获取高级认证状态

  mxsbtask_create: 'resource/mxsbtask_create',        // 社保认证

  mxmailtask_create: 'resource/mxmailtask_create',    // 信用卡认证

  ebankTaskSubmit: 'auth/ebank/ebankTaskSubmit', // 工资流水

  send_info: 'user/measurement/info',        // 发送测评

  increaseQuotaApply:'increaseQuotaApply',  //提额测评

  get_amount:'user/verify/amount',     // 得到测评额度

  questions:'product/getCommonProblemApi',// 获取常见问题

  getProductNewProtocolApi: 'product/getProductNewProtocolApi', // 获取产品协议（新产品）

  lzhz: 'quonline/link',                // 量子互助链接

  feedback: 'user/common/saveFeedBack', //意见反馈

  bank_list: 'bank/card/list',          // 银行列表

  getSupportBankListApi: 'card/getSupportBankListApi', // 所属银行列表

  saveAccountBankCard: 'membership/saveAccountBankCard', // 保存银行卡

  updatePassword: 'membership/updatePassword',  // 修改密码

  findPasswordBack: 'membership/findPasswordBack', //找回密码

  confirmApply: 'application/confirmApply', // 申请确认查询

  calcRepayAmount: 'application/repayAmount/calc', // 计算还款

  applicationCreate: 'application/new/create', // 提交进件

  loan: 'application/new/loan', // 提款页显示

  drawApply: 'coregw/draw/new/drawApply', // 提款

  getContractStagingInfo: 'order/contractStaging/getContractStagingInfo', // 还款列表

  repayAmount: 'order/calculate/show/repay/amount', // 还款金额显示

  getuse: 'operation/client/getuse', // 获取优惠券

  doRepayOrSettleWithPeriod: 'order/doRepayOrSettleWithPeriod', // 还款

  getThirdProductList: 'product/getThirdProductList',   // 精选平台

  productClickStatics: 'market/operation/ProductClickStatics', // 精选平台埋点

  loanList: 'order/user/loanList', // 借款记录

  getRecomfrInfo: 'product/getRecomfrInfo',//获取邀请好友规则

  base: 'user/info/base', // 认证状态

  getDictCodeList: 'dict/getDictCodeList', // 获取字典值

  saveCustomerContactInfo: 'membership/customerAuth/saveCustomerContactInfo', // 保存联系人信息

  saveCustomerCarrer: 'membership/customer/saveCustomerCarrer', // 保存客户职业信息

  contactInfo: 'user/contact/info', // 获取用户联系人认证信息是否完整

  otherInfo: 'user/other/info', // 第三方认证

  getCarrierNameByMobile: 'getCarrierNameByMobile', // 获取运营商

  saveCustomerAuthTcMobile: 'saveCustomerAuthTcMobile', // 手机认证

  getCustomerCarrer: 'membership/customer/getCustomerCarrer', // 获取客户信息

  getCustomerBase: 'membership/customer/getCustomerBase', // 获取身份信息

  uploadIdcardHand: 'membership/uploadFileBase64', // 上传手持身份证

  saveCustomerIDInfoH5: 'membership/customerAuth/saveCustomerIDInfoH5', // 上传身份证正反面

  // getAllRegionByOrderList: 'region/getAllRegionByOrderList', // 获取省市区 弃用
  getAllRegionByOrderList: 'user/common/getAllRegion', // 获取省市区

  saveCustomerBaseInfo: 'membership/customerAuth/saveCustomerBaseInfo', // 保存身份信息

  loadWithdrawCash: 'operation/withdrawCashAPI/loadWithdrawCash', //现金红包,账户余额（点击列表操作展示提现页）

  checkWithdrawCash: 'operation/withdrawCashAPI/checkWithdrawCash', //校验提现条件

  checkIdInfo: 'operation/checkIdInfo', //验证身份证（设置交易密码-验证身份证号）

  queryDetail: 'operation/withdrawCashAPI/queryDetail', //收支明细

  withdrawCash: 'operation/withdrawCashAPI/withdrawCash', //现金红包提现

  checkSMSCodeValid: 'toolbox/sms/checkSMSCodeValid',  //验证验证码

  verifyPayPassword: 'operation/verifyPayPassword', //验证原交易密码

  savePayPassword: 'operation/savePayPassword', //保存交易密码

  updatePayPassword: 'operation/updatePayPassword', //修改交易密码

  showStationLetterMsg: 'market/operation/showStationLetterMsg', // 消息详情

}
