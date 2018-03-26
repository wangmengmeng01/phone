<template>
	<div class="buyBid">
		<!--头部信息-->
		<div class="buyBidTop">
			<p class="buyBidTopName">
				<span>{{detail.bidName}}</span>
				<span>{{detail.profitPlan|profitPlan}}</span>
			</p>
	
			<p class="buyBidTopMes">
				<span>{{rate}}<i class="i1">%</i></span>
				<span>{{detail.periodLength}}<i class="i2">{{detail.periodUnit | Totime}}</i></span>
				<span>{{detail.amountWait| formatNum}}<i class="i2">元</i></span>
			</p>
			<p class="buyBidTopWord">
				<span>历史年化收益率</span>
				<span>项目期限</span>
				<span>剩余可投</span>
			</p>
		</div>
	
		<!--购买信息-->
	
		<div class="buyBidCenter">
			<p class="pdcTitle">
				<span>买入金额</span>
			</p>
			<div class="buyBidInvest">
				<i>￥</i>
				<input type="tel" class="buyBidInput" :class="inviteBol?'':'unClick'" v-model="investMoney" :placeholder="`${detail.investMinAmount}元起，${detail.investAscendingAmount}元递增`" @blur="inputBlur(0)" oninput="if( ! /^-?\d+\.?\d{0,2}$/.test(this.value)){ var s = this.value;this.value=s.substring(0,s.length-1);}"
				/>
				<span class="allInvestBtn" :class="inviteBol?'':'unClick'" @click="investAll">全投</span>
			</div>
			<p class="userAccount">
				可用余额<i>{{accountBalance.availableAmount}}元</i>
			</p>
		</div>
	
		<!--自动续费-->
		<div class="buyBidCenter">
			<div class="pdcTitle">
				<span>到期后自动续费</span>
				<p class="autoRenewBtn" @click="autoRenewBol=!autoRenewBol">
					<span v-show="autoRenewBol">关</span>
					<span v-show="!autoRenewBol">开</span>
				</p>
			</div>
	
			<p class="buyBidCenterautoRenewTips marTop">开启自动续期，到期后本金将自动购买同款产品</p>
			<p class="buyBidCenterautoRenewTips marBot">避免资金闲置而损失收益</p>
	
		</div>
	
		<!--我的优惠券-->
	
		<div class="buyBidCenter" @click="choose">
			<div class="pdcTitle" style="margin: 0.28rem 0;">
				<span>我的优惠</span>
				<span v-if="counpBol" style="color: #F84740;">{{counpNum}}张可用 <img  src="../../assets/main/home/nextIcon.png" alt="" /></span>
				<span v-else style="color: #F84740;">已选择{{counpNum}}张 <img  src="../../assets/main/home/nextIcon.png" alt="" /></span>
			</div>
	
		</div>
	
		<!--阅读协议-->
		<div class="buyBidCenter">
			<div class="pdcTitle">
				<span>已阅读同意</span>
				<span> <img src="../../assets/main/home/nextIcon.png" alt="" /></span>
			</div>
	
			<div class="checkAgreement">
				<p class="checkAgreementImg" @click="agreCheckBol=!agreCheckBol">
					<img v-if="agreCheckBol" src="../../assets/common/check_succ.png" />
					<img v-else src="../../assets/common/check_none.png" />
				</p>
				<p class="agreement"> <span @click="loanAgreement">《投资出借服务协议》</span> <span @click="riskTips">《风险提示书》</span> </p>
			</div>
	
		</div>
	
		<!--确认购买-->
		<div class="buyBidBottom">
			<div class="buyBidBottomLeft">
				<p><span>{{rate+appendRate}}%</span><span>历史年化</span></p>
				<p><span>¥{{ExpectedRevenue}}</span><span>预期收益</span></p>
				<p><span>¥{{investMoney}}</span><span>实付款</span></p>
			</div>
			<p class="buyBidBottomRight" :class="agreCheckBol?'':'disable'" @click="submit">确认购买</p>
		</div>
	
	</div>
</template>

<script>
	import loanAgreement from '@/components/loanAgreement'
	import riskTips from '@/components/riskTips'
	import {
		doConfirmBuyPage,
		accountAcmountInfo,
		getExpectedRevenue,
		searchCouponList,
		borrowInvest
	} from '@/service'
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
	
		name: 'buyBid',
	
		data() {
			return {
				item: {
					bidNo: this.$route.query.bidNo,
					promiseInviteId: ''
				},
				detail: {},
				accountBalance: {},
				itemProd: {}, //计算收益参数
				investMoney: '', //够买金额
				ExpectedRevenue: 0, //预期收益
				autoRenewBol: true, //自动续费
				agreCheckBol: false, //是否同意协议
				counpNum: 0, //优惠券可用张数
				counpBol: true, //是否选择优惠券
				appendRate: 0, //优惠券加息
				rate: 0, //总利息
				buyItem: {
					bidNo: this.$route.query.bidNo,
					retUrl: '',
					couponRate: '',
					receiveNo: '',
					couponNo: '',
					promiseInviteId: '',
				},
				inviteAmount: '', //履行承诺带入购买金额
				inviteBol: true, //是否金额带入
			}
		},
		computed: {
			...mapGetters([
				'coupon'
			])
	
		},
		created() {
	
			if (this.$route.query.promiseInviteId != undefined || this.$route.query.promiseInviteId != null) {
				this.buyItem.promiseInviteId = this.$route.query.promiseInviteId;
			}
			//从卡券页面 返回来   记录一些状态
			if (this.$route.query.linkType == "0") {
	
				this.coupon.params.agreCheckBol ? this.agreCheckBol = this.coupon.params.agreCheckBol : this.agreCheckBol = false;
	
				this.investMoney = this.coupon.params.investAmount;
	
				if (this.coupon.params.autoRenewBol == undefined) {
	
					this.autoRenewBol = true;
				} else {
					this.autoRenewBol = false;
				}
				this.buyItem.couponRate = this.$route.query.couponRate;
				this.buyItem.receiveNo = this.$route.query.receiveNo;
				this.buyItem.couponNo = this.$route.query.couponNo;
				//获取选择的卡券
	
				console.log(this.coupon.data.length);
	
				if (this.coupon.data.length) {
					this.counpBol = false;
					this.counpNum = this.coupon.data.length;
	
					for (var i = 0; i < this.coupon.data.length; i++) {
	
						if (this.coupon.data[i].type == "1") {
							//获取总的附加利率
							this.appendRate += this.coupon.data[i].profitRate;
						}
					}
	
				}
	
			}
	
			doConfirmBuyPage(this.item).then(res => {
				console.log(res);
				this.detail = res;
				this.itemProd = {
					appendRate: this.detail.appendRate,
					annualizedRate: this.detail.annualizedRate + this.appendRate,
					periodLength: this.detail.periodLength,
					periodUnit: this.detail.periodUnit,
					profitPlan: this.detail.profitPlan,
				};
				this.rate = res.annualizedRate + res.appendRate;
				this.buyItem.investAmount = res.investAmount;
				//从卡券页面 返回来
				if (this.$route.query.linkType == "0") {
					if (this.coupon.params.investAmount) {
						this.inputBlur(1);
					};
	
				} else {
					this.SET_COUPON({
						data: []
					});
				}
				if (this.$route.query.inviteAmount) {
					this.investMoney = this.$route.query.inviteAmount;
					this.inviteBol = false;
					this.CouponList();
					this.inputBlur();
				}
	
			});
	
			accountAcmountInfo().then(res => {
				console.log(res);
				this.accountBalance = res;
			});
	
		},
		methods: {
			...mapMutations([
				'RESET',
				'SET_COUPON',
				'SET_SUCC_PAGE',
			]),
			loanAgreement() {
				this.$alert({
					type: 'protocol',
					content: loanAgreement
				})
			},
			riskTips() {
				this.$alert({
					type: 'protocol',
					content: riskTips
				})
			},
			choose() {
				const bidNo = this.item.bidNo;
				this.SET_COUPON({
					backurl: this.$route.path,
					params: {
						productNo: this.detail.productNo,
						investAmount: this.investMoney,
						agreCheckBol: this.agreCheckBol,
						autoRenewBol: this.autoRenewBol,
					},
	
				});
				this.$go('/coupon/choose', {
					bidNo,
					linkType: 0,
					promiseInviteId: this.buyItem.promiseInviteId,
					inviteAmount: this.investMoney,
				})
			},
			submit() {
				let amountWait = this.detail.amountWait; //标的剩余金额
				let accountBalance = this.accountBalance.availableAmount; //账户余额
				let maxInvest = this.detail.investMaxAmount; //最大金额
				let minInvest = this.detail.investMinAmount; //起投金额
				let investAscendingAmount = this.detail.investAscendingAmount; //递增金额
				if (this.investMoney != "") {} else {
					this.$toask("请输入购买金额");
					return;
				};
	
				if (parseFloat(this.investMoney) > accountBalance) {
					this.$toask("账户余额不足");
					return;
				};
	
				if (parseFloat(this.investMoney) < minInvest) {
					this.$toask("购买金额小于最低起投金额");
					return;
				};
	
				if (parseFloat(this.investMoney) > maxInvest) {
					this.$toask("购买金额大于单笔上限");
					return;
				};
	
				if (parseFloat(this.investMoney) > amountWait) {
					this.$toask("购买金额大于标的剩余额度");
					return;
				};
	
				if (parseFloat(this.investMoney) % investAscendingAmount != 0) {
					this.$toask("请输入" + investAscendingAmount + "的整数倍");
					return;
				};
				if (this.agreCheckBol) {} else {
					this.$toask("请勾选协议书");
					return;
				};
				if (this.autoRenewBol) {
					this.buyItem.autoOpen = 2;
				} else {
					this.buyItem.autoOpen = 1;
				}
	
				this.buyItem.payAmount = this.investMoney;
				this.buyItem.annualizedProfit = this.rate + this.appendRate;
	
				borrowInvest(this.buyItem).then(res => {
					console.log(res);
					let params = {
						"title": "恭喜，购买成功",
						'sub_title': "您已成功购买了该标的",
						"btn_text": "继续购买其他标的",
						"backurl": "/product",
						"sub_btn_text": "查看我的资产",
						"sub_backurl": "/wealth"
					};
					this.SET_SUCC_PAGE(params);
					this.$go('/static/succ');
				});
	
	
			},
			//全投
			investAll() {
				let amountWait = this.detail.amountWait; //标的剩余金额
				let accountBalance = this.accountBalance.availableAmount; //账户余额
				let maxInvest = this.detail.investMaxAmount; //最大金额
				let minInvest = this.detail.investMinAmount; //起投金额
				let investAscendingAmount = this.detail.investAscendingAmount; //递增金额
				if (accountBalance >= amountWait) {
					this.investMoney = amountWait;
	
					this.itemProd.amount = amountWait;
					getExpectedRevenue(this.itemProd).then(res => {
						this.ExpectedRevenue = (res.amount - this.investMoney).toFixed(2);
					});
					this.CouponList();
				} else {
					if (accountBalance < minInvest) {
						this.$toask("账户余额小于起投金额");
					} else {
						//取余
						let remainder = Math.floor(accountBalance / investAscendingAmount);
						if (remainder == 0) {
							this.investMoney = minInvest;
						} else {
							this.investMoney = remainder * investAscendingAmount;
						}
						this.itemProd.amount = this.investMoney;
						getExpectedRevenue(this.itemProd).then(res => {
							this.ExpectedRevenue = (res.amount - this.investMoney).toFixed(2);
						});
						this.CouponList();
					}
	
				}
	
			},
			//查询卡券数目
			CouponList() {
				searchCouponList({
					productNo: this.detail.productNo,
					investAmount: this.investMoney,
					useType: '1',
					pageIndex: '1',
	
				}).then(res => {
					this.counpNum = res.availableNum;
				});
			},
	
			//计算收益
	
			inputBlur(type) {
	
				this.itemProd.amount = this.investMoney;
				getExpectedRevenue(this.itemProd).then(res => {
					this.ExpectedRevenue = (parseFloat(res.amount) - this.investMoney).toFixed(2);
					this.buyItem.expectedRevenue = res.amount;
				});
	
				if (!type) {
	
					this.CouponList();
				}
	
			},
	
		}
	}
</script>

<style scoped>
	.i1 {
		font-style: inherit;
		font-size: 0.48rem;
	}
	
	.i2 {
		font-style: inherit;
		font-size: 0.24rem;
	}
	
	.buyBidTop {
		margin: 0 auto;
		padding: 0;
		width: 6.7rem;
		height: 3.0rem;
		padding: 0 0.4rem;
		background-color: #3299D1;
		color: #FFFFFF;
		overflow: hidden;
	}
	
	.buyBidTopName {
		float: left;
		margin-top: 0.36rem;
		width: 6.7rem;
		height: 0.44rem;
		overflow: hidden;
	}
	
	.buyBidTopName span:nth-child(1) {
		float: left;
		text-align: left;
		height: 0.44rem;
		font-size: 0.32rem;
		line-height: 0.44rem;
		margin-right: 0.3rem;
	}
	
	.buyBidTopName span:nth-child(2) {
		float: left;
		margin: 0.1rem 0;
		height: 0.24rem;
		line-height: 0.24rem;
		text-align: left;
		font-size: 0.24rem;
	}
	
	.buyBidTopMes {
		float: left;
		margin-top: 0.46rem;
		width: 6.7rem;
		height: 1.06rem;
		overflow: hidden;
	}
	
	.buyBidTopMes>span:nth-child(1) {
		float: left;
		width: 2.35rem;
		line-height: 1.06rem;
		font-size: 0.76rem;
		text-align: left;
	}
	
	.buyBidTopMes>span:nth-child(2) {
		float: left;
		margin: 0.48rem 0 0.08rem;
		width: 2.0rem;
		height: 0.5rem;
		line-height: 0.5rem;
		font-size: 0.36rem;
		text-align: center;
	}
	
	.buyBidTopMes span:nth-child(3) {
		float: left;
		margin: 0.48rem 0 0.08rem;
		width: 2.35rem;
		height: 0.5rem;
		line-height: 0.5rem;
		font-size: 0.36rem;
		text-align: right;
	}
	
	.buyBidTopWord {
		float: left;
		margin-bottom: 0.32rem;
		width: 6.7rem;
		height: 0.34rem;
		line-height: 0.34rem;
		font-size: 0.24rem;
		overflow: hidden;
	}
	
	.buyBidTopWord span:nth-child(1) {
		float: left;
		width: 2.35rem;
		text-align: left;
	}
	
	.buyBidTopWord span:nth-child(2) {
		float: left;
		width: 2.0rem;
		text-align: center;
	}
	
	.buyBidTopWord span:nth-child(3) {
		float: left;
		width: 2.35rem;
		text-align: right;
	}
	
	.buyBidCenter {
		margin: 0 auto;
		padding: 0;
		width: 6.7rem;
		background-color: #FFFFFF;
		padding: 0 0.4rem;
		margin-top: 0.4rem;
		color: #FFFFFF;
		overflow: hidden;
	}
	
	.pdcTitle {
		float: left;
		width: 6.7rem;
		padding: 0.04rem 0;
		height: 0.48rem;
		overflow: hidden;
		margin-top: 0.36rem;
	}
	
	.pdcTitle>span:nth-child(1) {
		float: left;
		font-size: 0.32rem;
		line-height: 0.44rem;
		text-align: left;
		color: #181818;
		overflow: hidden;
	}
	
	.pdcTitle>span:nth-child(2) {
		float: right;
		font-size: 0.32rem;
		line-height: 0.44rem;
		text-align: right;
		color: #8D8D94;
		overflow: hidden;
	}
	
	.pdcTitle>span:nth-child(2) img {
		float: right;
		margin: 0.04rem 0 0.04rem 0.14rem;
		width: 0.2rem;
		height: 0.34rem;
		background-size: 100% 100%;
	}
	
	.buyBidInvest {
		float: left;
		width: 6.7rem;
		height: 0.80rem;
		padding: 0.56rem 0 0.18rem;
		overflow: hidden;
		border-bottom: 0.04rem solid #CDCED3;
	}
	
	.buyBidInvest>i {
		font-style: inherit;
		float: left;
		font-size: 0.56rem;
		line-height: 0.8rem;
		width: 0.34rem;
		height: 0.8rem;
		margin-right: 0.38rem;
		color: #181818;
	}
	
	.buyBidInput {
		float: left;
		width: 4.0rem;
		height: 0.5rem;
		font-size: 0.36rem;
		color: #181818;
		text-align: left;
		border: none;
		margin: 0.14rem 0;
	}
	
	.allInvestBtn {
		float: right;
		margin: 0.13rem 0;
		width: 1.32rem;
		height: 0.52rem;
		background-color: #F0F0F8;
		text-align: center;
		line-height: 0.52rem;
		font-size: 0.32rem;
		color: #3299D1;
		border-radius: 0.32rem;
	}
	
	.userAccount {
		float: left;
		width: 6.7rem;
		margin: 0.44rem 0 0.98rem;
		color: #181818;
		font-size: 0.28rem;
		height: 0.40rem;
		line-height: 0.4rem;
		text-align: left;
	}
	
	.userAccount>i {
		font-style: inherit;
		color: #8D8D94;
		margin-left: 0.2rem;
	}
	
	.autoRenewBtn {
		float: right;
		width: 1.0rem;
		height: 0.52rem;
		background-color: #F0F0F8;
		border-radius: 0.32rem;
		position: relative;
	}
	
	.autoRenewBtn>span:nth-child(1) {
		position: absolute;
		width: 0.6rem;
		height: 0.52rem;
		left: 0;
		top: 0;
		border-radius: 0.32rem;
		background-color: #3299D1;
		font-size: 0.28rem;
		text-align: center;
		line-height: 0.52rem;
	}
	
	.autoRenewBtn>span:nth-child(2) {
		position: absolute;
		width: 0.6rem;
		height: 0.52rem;
		right: 0;
		top: 0;
		border-radius: 0.32rem;
		background-color: #3299D1;
		font-size: 0.28rem;
		text-align: center;
		line-height: 0.52rem;
	}
	
	.buyBidCenterautoRenewTips {
		float: left;
		width: 6.7rem;
		text-align: left;
		font-size: 0.24rem;
		line-height: 0.34rem;
		height: 0.34rem;
		margin-bottom: 0.08rem;
		color: #8D8D94;
	}
	
	.marTop {
		margin-top: 0.7rem;
	}
	
	.marBot {
		margin-bottom: 0.94rem;
	}
	
	.checkAgreement {
		float: left;
		width: 6.7rem;
		height: 0.34rem;
		margin: 0.66rem 0 1.0rem;
		overflow: hidden;
	}
	
	.checkAgreementImg {
		float: left;
		width: 0.32rem;
		height: 0.32rem;
		margin: 0.01rem 0;
		position: relative;
	}
	
	.checkAgreementImg>img {
		position: absolute;
		left: 0;
		top: 0;
		width: 0.32rem;
		height: 0.32rem;
		background-size: 100% 100%;
	}
	
	.checkInput {
		position: absolute;
		width: 0.34rem;
		height: 0.34rem;
		left: 0;
		top: 0;
		opacity: 0;
	}
	
	.agreement {
		margin-left: 0.06rem;
		float: left;
		width: 6.30rem;
		font-size: 0.22rem;
		line-height: 0.34rem;
		text-align: left;
		color: #181818;
	}
	
	.buyBidBottom {
		margin: 0 auto;
		padding: 0;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		width: 7.5rem;
		height: 1.1rem;
		overflow: hidden;
	}
	
	.buyBidBottomLeft {
		float: left;
		width: 5.1rem;
		height: 1.1rem;
		color: #8D8D94;
		font-size: 0.2rem;
		text-align: left;
		background-color: #FFFFFF;
	}
	
	.buyBidBottomRight {
		float: left;
		width: 2.4rem;
		height: 1.1rem;
		line-height: 1.1rem;
		font-size: 0.36rem;
		text-align: center;
		color: #FFFFFF;
		background-color: #3299D1;
	}
	
	.disable {
		background: #98cceb;
	}
	
	.buyBidBottomLeft p:nth-child(1) {
		float: left;
		margin-left: 0.6rem;
		width: 1.5rem;
		overflow: hidden;
	}
	
	.buyBidBottomLeft p:nth-child(2) {
		float: left;
		width: 1.48rem;
		overflow: hidden;
	}
	
	.buyBidBottomLeft p:nth-child(3) {
		float: left;
		width: 1.52rem;
		overflow: hidden;
	}
	
	.buyBidBottomLeft span:nth-child(1) {
		float: left;
		width: 100%;
		margin: 0.2rem 0 0.08rem;
		font-size: 0.24rem;
		line-height: 0.34rem;
		color: #181818;
	}
	
	.buyBidBottomLeft span:nth-child(2) {
		float: left;
		width: 100%;
		font-size: 0.20rem;
		line-height: 0.28rem;
	}
	
	.unClick {
		pointer-events: none;
	}
</style>
