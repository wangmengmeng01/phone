<template>
	<div class="buyBid">
		<!--头部信息-->
		<div class="buyBidTop">
			<p class="buyBidTopName">
				<span>{{detail.bidName}}</span>
				<span>{{detail.profitPlan|profitPlan}}</span>
			</p>

			<p class="buyBidTopMes">
				<span>{{detail.annualizedRate}}<i class="i1">%</i></span>
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
				<input type="tel" class="buyBidInput" placeholder="1000元起，100元递增" oninput="if( ! /^-?\d+\.?\d{0,2}$/.test(this.value)){ var s = this.value;this.value=s.substring(0,s.length-1);}" />
				<span class="allInvestBtn">全投</span>
			</div>
			<p class="userAccount">
				可用余额<i>0.00元</i>
			</p>
		</div>

		<!--自动续费-->
		<div class="buyBidCenter">
			<div class="pdcTitle">
				<span>到期后自动续费</span>
				<p class="autoRenewBtn">
					<span>开</span>
				</p>
			</div>

			<p class="buyBidCenterautoRenewTips marTop">开启自动续期，到期后本金将自动购买同款产品</p>
			<p class="buyBidCenterautoRenewTips marBot">避免资金闲置而损失收益</p>

		</div>

		<!--我的优惠券-->

		<div class="buyBidCenter">
			<div class="pdcTitle" style="margin: 0.28rem 0;">
				<span>我的优惠</span>
				<span style="color: #F84740;">2张可用 <img  src="../../assets/main/home/nextIcon.png" alt="" /></span>
			</div>

		</div>

		<!--阅读协议-->
		<div class="buyBidCenter">
			<div class="pdcTitle">
				<span>已阅读同意</span>
				<span> <img src="../../assets/main/home/nextIcon.png" alt="" /></span>
			</div>

			<div class="checkAgreement">
				<p class="checkAgreementImg">
					<img src="../../assets/common/check_succ.png" />
					<input type="checkbox" class="checkInput" name="" id="" value="" />
				</p>
				<p class="agreement">《投资出借服务协议》《自动投标授权合同》《风险揭示函》</p>
			</div>

		</div>

		<!--确认购买-->
		<div class="buyBidBottom">
			<div class="buyBidBottomLeft">
				<p><span>10.11%</span><span>历史年化</span></p>
				<p><span>¥0.00</span><span>预期收益</span></p>
				<p><span>¥999.00</span><span>实付款</span></p>
			</div>
			<p class="buyBidBottomRight">确认购买</p>
		</div>

	</div>
</template>

<script>
	import { doConfirmBuyPage } from '@/service'
	export default {

		name: 'buyBid',

		data() {
			return {
				item: {
					bidNo: this.$route.query.bidNo,
					promiseInviteId:''
				},
				detail: {},
			}
		},
		created() {
			doConfirmBuyPage(this.item).then(res => {
				log(res);
				this.detail = res;
			});
		},
		methods: {}
	}
</script>

<style scoped>
	.i1{
		font-style: inherit;
		font-size: 0.48rem;
	}
	.i2{
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
	
	.autoRenewBtn>span {
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
</style>