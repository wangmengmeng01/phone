<template>
	<div class="buyBid">
		<!--<button class="btn returnBack" @click="returnbcak">选取</button>-->

		<!--购买想请-->
		<div class="buyBid-top" v-if="isPromiseBol">
			<div class="recommendDiv borderBottom">
				<p class="recommendDivTitle">{{detail.productName}}{{detail.bidName}}</p>
				<div class="bidMessage">
					<div>
						<p class="bidMesRate"><i>{{detail.annualizedRate}}</i>% <span v-show="detail.appendRate">+{{detail.appendRate}}%</span></p>
						<p class="bidMesP f24 color_font-99">历史年化</p>
					</div>
					<div>
						<p class="bidMesTime"><i>{{detail.periodLength}}</i>{{detail.periodUnit|Totime}}</p>
						<p class="bidMesP f24 color_font-99">投资期限</p>
					</div>
				</div>
			</div>

			<div class="buyBid-top-mes borderBottom">
				<div class="buyBid-top-mes-div">
					<p class="buyBid-top-mes-div-p1">
						<span class="f24 color_font-99">起息日期</span>
						<span class="f28">{{detail.interestStartDate||""}}</span>
					</p>
					<p class="buyBid-top-mes-div-p2">
						<span class="f24 color_font-99">锁定期限</span>
						<span v-if="detail.lockPeriod>=9999" class="f28">不可转让</span>
						<span v-else class="f28">{{detail.lockPeriod}}天可转让</span>
					</p>
				</div>
				<div class="buyBid-top-mes-div">
					<p class="buyBid-top-mes-div-p1">
						<span class="f24 color_font-99">到期日期</span>
						<span class="f28">{{detail.interestEndDate}}</span>
					</p>
					<p class="buyBid-top-mes-div-p2">
						<span class="f24 color_font-99">还款方式</span>
						<span class="f28">{{detail.profitPlan|profitPlan}}</span>
					</p>
				</div>
			</div>
			<div class="buyBid-top-money">
				<p class="f28">履约金额(元)</p>
				<p>{{investMoney}}</p>
			</div>
		</div>

		<div class="buyBid-div borderBottom" v-else>
			<p class="f36 color_font-36 buyBid-div-p1">购买金额(元)</p>
			<p class="f24 color_font-99 buyBid-div-p2">{{detail.investMinAmount|formatNum}}元起投，{{detail.investAscendingAmount|formatNum}}的整数倍递增</p>
			<div class="buyBid-div-input">
				<img @click="reduce" v-if="investMoney<=detail.investMinAmount" :class="investMoney.investMinAmount<=detail?'disable':''" src="../../assets/main/prod/reduce.png" />
				<img @click="reduce" v-else :class="investMoney<=detail.investMinAmount?'disable':''" src="../../assets/main/prod/reduce-h.png" />
				<input type="number" @blur="inputBlur(0)" v-model.number="investMoney" maxlength="10" />
				<img @click="add" v-if="investMoney<detail.investMaxAmount" :class="investMoney>=detail.investMaxAmount?'disable':''" src="../../assets/main/prod/add.png" />
				<img @click="add" v-else :class="investMoney<=detail.investMaxAmount?'disable':''" src="../../assets/main/prod/add-h.png" />
			</div>
		</div>
		<div class="buyBid-p1 borderBottom marginB">
			<span>可用余额(元)</span>
			<span>{{accountBalance.availableAmount}}</span>
		</div>
		<div class="buyBid-p1 borderBottom">
			<span>预计投资收益(元)</span>
			<span>{{ExpectedRevenue}}</span>
		</div>
		<div class="buyBid-p1 borderBottom" @click="choose">
			<span>我的优惠</span>
			<span v-if="counpBol">{{counpNum}}张可用 <img src="../../assets/common/arrow-right.png"/></span>
			<span v-else>已选择1张<img src="../../assets/common/arrow-right.png"/></span>
		</div>
		<div class="buyBid-auto borderBottom">
			<div class="buyBid-auto-div">
				<span class="f28">自动续期</span>
				<p @click="autoRenewBol=!autoRenewBol">
					<img v-show="autoRenewBol" src="../../assets/main/prod/off@2x.png" />
					<img v-show="!autoRenewBol" src="../../assets/main/prod/On@2x.png" />
				</p>
			</div>
			<p class="buyBid-auto-p f24 color_font-99">开启自动续期，到期后本金将自动购买同款产品避免资金闲置而损失收益</p>
		</div>

		<div class="buyBid-agreement">
			<div class="" @click="agreCheckBol=!agreCheckBol">
				<img v-if="agreCheckBol" src="../../assets/common/check_succ.png" />
				<img v-else src="../../assets/common/check_none.png" />
			</div>
			<p class="f28">我已阅读并同意<i @click="loanAgreement">《投资出借服务协议》</i>、<i>《自动投标授权委托书》</i>、<i @click="riskTips">《风险提示书》</i></p>
		</div>

		<div class="btn buyBid-btn" :class="agreCheckBol?'':'disableBtn'" @click="submit">
			确认支付{{investMoney|formatNum}}元
		</div>

		<!--头部信息-->
		<!--<div class="buyBidTop">
			<p class="buyBidTopName">
				<span>{{detail.bidName}}</span>
				<span>{{detail.profitPlan|profitPlan}}</span>
			</p>
	
			<p class="buyBidTopMes">
				<span>{{rate}}<i class="i1">%</i></span>
				<span>{{detail.periodLength}}<i class="i2">{{detail.periodUnit | Totime}}</i></span>
				<span>{{detail.amountWait}}<i class="i2">元</i></span>
			</p>
			<p class="buyBidTopWord">
				<span>历史年化</span>
				<span>项目期限</span>
				<span>剩余可投</span>
			</p>
		</div>-->

		<!--购买信息-->

		<!--<div class="buyBidCenter">
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
		</div>-->

		<!--自动续费-->
		<!--<div class="buyBidCenter">
			<div class="pdcTitle">
				<span>到期后自动续费</span>
				<p class="autoRenewBtn" @click="autoRenewBol=!autoRenewBol">
					<span v-show="autoRenewBol"  >关</span>
					<span v-show="!autoRenewBol">开</span>
				</p>
			</div>
	
			<p class="buyBidCenterautoRenewTips marTop">开启自动续期，到期后本金将自动购买同款产品</p>
			<p class="buyBidCenterautoRenewTips marBot">避免资金闲置而损失收益</p>
	
		</div>-->

		<!--我的优惠券-->

		<!--<div class="buyBidCenter" @click="choose">
			<div class="pdcTitle" style="margin: 0.28rem 0;">
				<span>我的优惠</span>
				<span v-if="counpBol" style="color: #F84740;">{{counpNum}}张可用 <img  src="../../assets/main/home/nextIcon.png" alt="" /></span>
				<span v-else style="color: #F84740;">已选择{{counpNum}}张 <img  src="../../assets/main/home/nextIcon.png" alt="" /></span>
			</div>
	
		</div>
	-->
		<!--阅读协议-->
		<!--<div class="buyBidCenter">
			<div class="pdcTitle">
				<span>已阅读同意</span>
			</div>
	
			<div class="checkAgreement">
				<p class="checkAgreementImg" @click="agreCheckBol=!agreCheckBol">
					<img v-if="agreCheckBol" src="../../assets/common/check_succ.png" />
					<img v-else src="../../assets/common/check_none.png" />
				</p>
				<p class="agreement"> <span >《投资出借服务协议》</span> <span >《风险提示书》</span> </p>
			</div>
	
		</div>-->

		<!--确认购买-->
		<!--<div class="buyBidBottom">
			<div class="buyBidBottomLeft">
				<p><span>{{rate+appendRate}}%</span><span>历史年化</span></p>
				<p><span>¥{{ExpectedRevenue}}</span><span>预期收益</span></p>
				<p><span>¥{{investMoney||0.00}}</span><span>实付款</span></p>
			</div>
			<p class="buyBidBottomRight" :class="agreCheckBol?'':'disable'" @click="submit">确认购买</p>
		</div>-->

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
				isPromiseBol: false,
				buyItem: {
					bidNo: this.$route.query.bidNo,
					retUrl: '',
					couponRate: '',
					receiveNo: '',
					couponNos: '',
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
			console.log(this.$route.query.promiseInviteId);
			if(this.$route.query.promiseInviteId == undefined || this.$route.query.promiseInviteId == null || this.$route.query.promiseInviteId == "") {
			}else{
				this.buyItem.promiseInviteId = this.$route.query.promiseInviteId;
				this.isPromiseBol = !this.isPromiseBol;
			}
			//从卡券页面 返回来   记录一些状态
			if(this.$route.query.linkType == "0") {

				this.coupon.params.agreCheckBol ? this.agreCheckBol = this.coupon.params.agreCheckBol : this.agreCheckBol = false;

				this.investMoney = parseFloat(this.coupon.params.investAmount);

				if(this.coupon.params.autoRenewBol == true) {

					this.autoRenewBol = true;
				} else {
					this.autoRenewBol = false;
				}
//				this.buyItem.couponRate = this.$route.query.couponRate;
				this.buyItem.receiveNos = this.$route.query.receiveNo;
//				this.buyItem.couponNo = this.$route.query.couponNo;
				//获取选择的卡券

				console.log(this.coupon.data.length);

				if(this.coupon.data.length) {
					this.counpBol = false;
					this.counpNum = this.coupon.data.length;
					for(var i = 0; i < this.coupon.data.length; i++) {
						if(this.coupon.data[i].type == "1") {
							//获取总的附加利率
							this.appendRate += this.coupon.data[i].profitRate;
						}
					}
				} else {
					this.buyItem.couponRate = '';
					this.buyItem.receiveNo = '';
					this.buyItem.couponNo = '';
				}
			}

			doConfirmBuyPage(this.item).then(res => {
				console.log(res);
				this.detail = res;
				this.investMoney = res.investMinAmount;
				this.itemProd = {
					appendRate: this.detail.appendRate,
					annualizedRate: this.detail.annualizedRate + this.appendRate,
					periodLength: this.detail.periodLength,
					periodUnit: this.detail.periodUnit,
					profitPlan: this.detail.profitPlan,
				};
				this.rate = res.annualizedRate + res.appendRate;
				this.buyItem.investAmount = res.investAmount;
				this.inputBlur(0);
				//从卡券页面 返回来
				if(this.$route.query.linkType == "0") {
					if(this.coupon.params.investAmount) {
						this.inputBlur(1);
					};
				} else {
					this.SET_COUPON({
						data: []
					});
				}
				if(this.$route.query.inviteAmount) {
					this.investMoney = parseFloat(this.$route.query.inviteAmount);
					this.inviteBol = false;
					this.CouponList();
					this.inputBlur(1);
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
			reduce() {
				if(this.investMoney < this.detail.investAscendingAmount) {
					return;
				}
				this.investMoney -= parseInt(this.detail.investAscendingAmount);
				if(this.$route.query.linkType == "0") {
					this.inputBlur(1);
				} else {
					this.inputBlur(0);
				}
			},
			add() {
				this.investMoney += parseInt(this.detail.investAscendingAmount);
				console.log(typeof(this.investMoney));
				if(this.$route.query.linkType == "0") {
					this.inputBlur(1);
				} else {
					this.inputBlur(0);
				}
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
			ff() {
				this.$go('/');
			},
			submit() {
				let amountWait = this.detail.amountWait; //标的剩余金额
				let accountBalance = this.accountBalance.availableAmount; //账户余额
				let maxInvest = this.detail.investMaxAmount; //最大金额
				let minInvest = this.detail.investMinAmount; //起投金额
				let investAscendingAmount = this.detail.investAscendingAmount; //递增金额
				if(this.investMoney != "") {} else {
					this.$toask("请输入购买金额");
					return;
				};

				if(parseFloat(this.investMoney) > accountBalance) {
					this.$alert({
						title: '温馨提示',
						content: '可用余额不足请先充值！',
						yes: "立即充值",
						no: '知道了'
					}).then(function(b) {
						window.location.href = window.location.origin + '/wealth/recharge';
					});
					return;
				};

				if(parseFloat(this.investMoney) < minInvest) {
					this.$toask("购买金额小于最低起投金额");
					return;
				};

				if(parseFloat(this.investMoney) > maxInvest) {
					this.$toask("购买金额大于单笔上限");
					return;
				};

				if(parseFloat(this.investMoney) > amountWait) {
					this.$toask("购买金额大于标的剩余额度");
					return;
				};

				if(parseFloat(this.investMoney) % investAscendingAmount != 0) {
					this.$toask("请输入" + investAscendingAmount + "的整数倍");
					return;
				};
				if(this.agreCheckBol) {} else {
					this.$toask("请勾选协议书");
					return;
				};
				if(this.autoRenewBol) {
					this.buyItem.autoOpen = 2;
				} else {
					this.buyItem.autoOpen = 1;
				}

				this.buyItem.payAmount = this.investMoney;
				this.buyItem.annualizedProfit = this.rate + this.appendRate;
				borrowInvest(this.buyItem).then(res => {

					if(!this.isPromiseBol) {
						let params = {
							"title": "恭喜，购买成功",
							'sub_title': "您已成功购买" + this.detail.productName + this.detail.bidNo + "期,</br>交易金额为" + this.investMoney + "元",
							"btn_text": "继续购买",
							"backurl": "/product",
							"sub_btn_text": "查看我的资产",
							"sub_backurl": "/wealth"
						};
						this.SET_SUCC_PAGE(params);
						this.$go('/static/succ');
					} else {
						let params = {
							"title": "恭喜您，履约成功",
							'sub_title': "您已成功购买" + this.detail.productName + this.detail.bidNo + "期,</br>交易金额为" + this.investMoney + "元",
							"btn_text": "继续履行其它承诺",
							"backurl": "/mine",
							"sub_btn_text": "查看我的资产",
							"sub_backurl": "/wealth"
						};
						this.SET_SUCC_PAGE(params);
						this.$go('/static/succ');
					}

				});

			},
			//全投
			investAll() {
				let amountWait = this.detail.amountWait; //标的剩余金额
				let accountBalance = this.accountBalance.availableAmount; //账户余额
				let maxInvest = this.detail.investMaxAmount; //最大金额
				let minInvest = this.detail.investMinAmount; //起投金额
				let investAscendingAmount = this.detail.investAscendingAmount; //递增金额
				if(accountBalance >= amountWait) {
					this.investMoney = amountWait;

					this.itemProd.amount = amountWait;
					getExpectedRevenue(this.itemProd).then(res => {
						this.ExpectedRevenue = (res.amount - this.investMoney).toFixed(2);
					});
					this.CouponList();
				} else {
					if(accountBalance < minInvest) {
						this.$toask("账户余额小于起投金额");
					} else {
						//取余
						let remainder = Math.floor(accountBalance / investAscendingAmount);
						if(remainder == 0) {
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
				if(this.investMoney > this.detail.investMaxAmount) {
					this.investMoney = this.detail.investMaxAmount
				};
				if(this.investMoney == "") {
					this.investMoney = this.detail.investMinAmount;
				};
				this.itemProd.amount = this.investMoney;
				getExpectedRevenue(this.itemProd).then(res => {
					this.ExpectedRevenue = (parseFloat(res.amount) - this.investMoney).toFixed(2);
					this.buyItem.expectedRevenue = res.amount;
				});

				if(!type) {

					this.CouponList();
				}

			},
			returnbcak() {
				if(this.$route.query.linkType == "0") {
					this.$router.go(-2);
				} else {
					this.$router.go(-1);
				}

			}

		}
	}
</script>

<style lang="scss" scoped>
	.disable {
		pointer-events: none;
	}
	
	.disableBtn {
		background-color: #E1E1E1;
		pointer-events: none;
	}
	
	.buyBid {
		margin: 0 auto;
		padding: 0;
		width: 7.5rem;
		border-top: 1px solid rgba(0, 0, 0, 0.03);
		.borderBottom {
			border-bottom: 1px solid #ECECEC;
		}
		&-top {
			&-money {
				p:nth-child(1) {
					margin: .6rem 0 .26rem;
					color: #666666;
					text-align: center;
				}
				p:nth-child(2) {
					margin-bottom: .2rem;
					font-size: .6rem;
					text-align: center;
					color: #363636;
				}
			}
			&-mes {
				margin: 0 .3rem;
				padding-bottom: .5rem;
				width: 6.9rem;
				&-div {
					margin: .3rem 0 .1rem;
					width: 6.9rem;
					overflow: hidden;
					&-p1 {
						float: left;
						line-height: .28rem;
						overflow: hidden;
						span:nth-child(1) {
							float: left;
							width: 1.2rem;
							text-align: left;
						}
						span:nth-child(2) {
							float: left;
							width: 2.44rem;
							text-align: left;
							color: #666666;
						}
					}
					&-p2 {
						float: left;
						line-height: .28rem;
						overflow: hidden;
						span:nth-child(1) {
							float: left;
							width: 1.2rem;
							text-align: left;
						}
						span:nth-child(2) {
							float: left;
							width: 2.0rem;
							text-align: left;
							color: #666666;
						}
					}
				}
			}
			width: 7.5rem;
			.recommendDiv {
				width: 6.9rem;
				/*height: 2.52rem;*/
				overflow: hidden;
				margin: 0 .3rem;
			}
			.recommendDivTitle {
				float: left;
				width: 6.6rem;
				margin: .4rem 0 0 0;
				color: #666666;
				font-size: 0.28rem;
				height: 0.32rem;
				line-height: 0.32rem;
				text-align: left;
				font-weight: 500;
			}
			.bidMessage>div:nth-child(1) {
				float: left;
				width: 4.3rem;
				height: 1.6rem;
				text-align: left;
			}
			.bidMessage>div:nth-child(2) {
				float: left;
				width: 2.6rem;
				height: 1.6rem;
				text-align: left;
			}
			.bidMesRate {
				margin: 0.2rem 0 0.18rem 0;
				height: 0.52rem;
				line-height: 0.52rem;
				font-size: 0.36rem;
				text-align: left;
				color: #FF5513;
				font-weight: 500;
			}
			.bidMesRate i {
				font-size: .52rem;
				font-style: inherit;
			}
			.bidMesRate span {
				font-size: .36rem;
			}
			.bidMesTime {
				margin: 0.2rem 0 0.18rem 0;
				height: 0.52rem;
				line-height: 0.52rem;
				font-size: 0.24rem;
				text-align: left;
				color: #999999;
			}
			.bidMesTime i {
				font-style: inherit;
				color: #4a4a4a;
				font-size: 0.48rem;
			}
			.bidMesP {
				margin-bottom: 0.46rem;
			}
			.newTitle {
				float: left;
				width: 6.9rem;
				height: 0.92rem;
				font-size: 0.36rem;
				line-height: 0.92rem;
				color: #363636;
				text-align: left;
				padding: 0 .3rem;
			}
			.newTitlespan {
				font-size: 0.28rem;
				color: #999999;
				line-height: 0.92rem;
				margin-left: .22rem;
			}
			.newTitle .more {
				float: right;
				font-size: 0.28rem;
				color: #208AFF;
				line-height: 0.92rem;
			}
			.bottomBorder {
				border-bottom: 1px solid #ececec;
			}
			.borderTop {
				margin-top: .2rem;
			}
		}
		&-div {
			margin: 0 .3rem;
			width: 6.9rem;
			&-p1 {
				margin: .32rem 0 .14rem;
				line-height: .36rem;
			}
			&-p2 {
				line-height: .28rem;
			}
			&-input {
				text-align: center;
				height: 1.17rem;
				padding-top: .2rem;
				img {
					width: .5rem;
					height: .5rem;
					background-size: 100% 100%;
				}
				input {
					width: 4.7rem;
					font-size: .6rem;
					color: #363636;
					text-align: center;
				}
			}
		}
		&-p1 {
			margin: 0 .3rem;
			width: 6.9rem;
			height: 1.0rem;
			line-height: 1.0rem;
			color: #666666;
			font-size: .28rem;
			overflow: hidden;
			span:nth-child(1) {
				float: left;
			}
			span:nth-child(2) {
				float: right;
			}
			img {
				width: .14rem;
				height: .24rem;
				background-size: 100% 100%;
				margin-left: .42rem;
			}
		}
		&-auto {
			margin: 0 .3rem;
			width: 6.9rem;
			&-div {
				height: 1.1rem;
				line-height: 1.1rem;
				overflow: hidden;
				span {
					margin-top: .55rem;
					color: #666666;
				}
				p {
					float: right;
					img {
						margin-top: .27rem;
						width: 1.02rem;
						height: .62rem;
						background-size: 100% 100%;
					}
				}
			}
			&-p {
				line-height: .44rem;
				text-align: justify;
				margin-bottom: .4rem;
			}
		}
		&-agreement {
			margin: 0 .3rem;
			width: 6.9rem;
			overflow: hidden;
			img {
				margin-top: .48rem;
				float: left;
				width: .32rem;
				height: .32rem;
				background-size: 100% 100%;
			}
			p {
				margin-left: .16rem;
				margin-top: .4rem;
				float: left;
				width: 6.42rem;
				line-height: .4rem;
				text-align: justify;
				color: #666666;
				i {
					font-style: inherit;
					color: #208AFF;
				}
			}
		}
		&-btn {
			position: fixed;
			margin: 0 .3rem;
			width: 6.9rem;
			bottom: .36rem;
		}
		.marginB {
			margin-bottom: .24rem;
		}
	}
	
	.returnBack {
		position: fixed;
		z-index: 200;
		top: -0.88rem;
		left: 0;
		right: 0;
		font-size: .36rem;
		margin-top: 1rem;
		border-radius: 0;
		opacity: 0;
	}
	
	.unClick {
		pointer-events: none;
		background-color: #F0F0F8;
	}
</style>