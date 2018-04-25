<template>
	<div class="productDetail">
		<!--详情页-->
		<!--详情头部-->
		<div class="productDetailTop">
			<p class="pdtRate"><i>{{detail.initCashAmount|formatNum}}</i></p>
			<p class="pdtWord"></p>
			<div class="pdtMessage f24">
				<p>
					<!--{{detail.periodLength}}期限-->
					<span>{{detail.annualizedRate}}%</span>
					<span>历史年化</span>
				</p>
				<p>
					<!--{{detail.investMinAmount|formatNum}}元起投-->
					<span>{{detail.yesProfit|formatNum}}</span>
					<span>已获收益(元)</span>
					<span class="span1"></span><span class="span2"></span>
				</p>
				<p>
					<span>{{detail.waitProfit|formatNum}}</span>
					<span>待收收益(元)</span>
				</p>
			</div>
			<div class="pdtProgress">
				<span class="pdtRate1">{{detail.remainPeriod}}/{{detail.periodLength}}周</span>
				<p class="pdtGrayLine"></p>
				<p class="pdtLine" :style="{width:(detail.periodLength-detail.remainPeriod)/detail.periodLength*6/100+'rem'}"></p>
				<span class="pdtSpan" :style="{left:(detail.periodLength-detail.remainPeriod)/detail.periodLength*6/100+'rem'}"></span>
				<!--<p class="pdtProgressMes">剩余可投<i>{{detail.amountWait| formatNum}}元</i></p>-->
			</div>
			<div class="productDetailMes">
				剩余/总投资期限
			</div>
		</div>
		<div class="productDetailCenter boderB productDetailTips">
			<p><span>起息日期</span>{{detail.interestStartDate}}</p>
			<p><span>到期日期</span>{{detail.interestEndDate}}</p>
			<p><span>还款方式</span>一次性还款</p>
			<!--<p><span>可否转让</span>{{status}}</p>-->
		</div>

		<!--返佣规则-->
		<div class="productDetailCenter boderB">
			<div class="pdcIntroduce">
				<p @click="$go('/prod/bankDepository')">
					<img class="pdcIntroduceImg1" src="../../assets/main/prod/cg.png" />
					<span>资金银行存管</span>
				</p>
				<p @click="$go('/prod/higHqualityAssets',{rollType:1})">
					<img class="pdcIntroduceImg1" src="../../assets/main/prod/zc.png" />
					<span>严选优质资产</span></p>
				<p @click="$go('/prod/Honour')">
					<img class="pdcIntroduceImg2" src="../../assets/main/prod/df.png" />
					<span>历史100%兑付</span></p>
			</div>
		</div>
		<div class="productDetailCenter">
			<p class="productDetailCenterP boderB" @click="$go('/wealth/claims',{cashNo:item.cashNo})">现持债权 <img src="../../assets/main/home/nextIcon.png" /></p>
			<p class="productDetailCenterP boderB" @click="loanAgreement">出借协议<img src="../../assets/main/home/nextIcon.png" /></p>
			<!--<p class="productDetailCenterP boderB">常见问题<img src="../../assets/main/home/nextIcon.png"/></p>-->
			<p class="productDetailCenterP boderB" @click="riskTips">风险提示<img src="../../assets/main/home/nextIcon.png" /></p>
		</div>
	</div>
</template>

<script>
	import loanAgreement from '@/components/loanAgreement'
	import riskTips from '@/components/riskTips'
	import {
		investPropertyDetail
	} from '@/service'
	import axios from 'axios'
	export default {
		name: 'productDetail',
		data() {
			return {
				item: {
					bidNo: this.$route.query.bidNo,
					cashNo:this.$route.query.cashNo,
					bidType:this.$route.query.bidType,
				},
				itemStatus: {},
				detail: {},
				profitPlanArr: ['', '等额本息', '等额本金', '按期付息，到期还本', '一次性还款', '其他'],
				statusBol: true,
			}
		},
		created() {
			investPropertyDetail(this.item).then(res => {
				this.detail = res;
			});
		},
		methods: {
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.productDetailTop {
		margin: 0 auto;
		padding: 0;
		width: 6.7rem;
		/*height: 3.0rem;*/
		background-color: #1E76FD;
		padding: 0 0.4rem;
		color: #FFFFFF;
		overflow: hidden;
	}
	
	.pdtWord {
		float: left;
		width: 6.7rem;
		margin-bottom: 0.6rem;
		text-align: center;
		height: 0.24rem;
		line-height: 0.24rem;
		font-size: 0.24rem;
	}
	
	.pdtMessage {
		float: left;
		width: 6.7rem;
		height: 0.68rem;
		overflow: hidden;
		margin-bottom: 0.6rem;
		font-size: 0.24rem;
		line-height: .32rem;
	}
	.pdtMessage p>span:nth-child(1){
		display: block;
		margin-bottom: .2rem;
		line-height: .24rem;
	}
	.pdtMessage p>span:nth-child(2){
		display: block;
		color: #C6E1FF;
		line-height: .24rem;
	}
	.pdtMessage>p:nth-child(1) {
		float: left;
		text-align: center;
		width: 2.1rem;
		overflow: hidden;
	}
	
	.pdtMessage>p:nth-child(2) {
		float: left;
		text-align: center;
		width: 2.48rem;
		overflow: hidden;
		box-sizing: border-box;
		position: relative;
		.span1{
			position: absolute;
			opacity: 0.3;
			height: .32rem;
			width: 1px;
			left: 0;
			top: .16rem;
			background-color: #FFFFFF;
		}
		.span2{
			position: absolute;
			opacity: 0.3;
			height: .32rem;
			width: 1px;
			right: 0;
			top: .16rem;
			background-color: #FFFFFF;
		}
	}
	
	.pdtMessage>p:nth-child(3) {
		float: left;
		text-align: center;
		width: 2.1rem;
		overflow: hidden;
	}
	
	
	
	.pdtProgress {
		float: left;
		margin: 0 0.35rem;
		width: 6.0rem;
		height: 0.76rem;
		position: relative;
	}
	
	.pdtGrayLine {
		position: absolute;
		left: 0;
		bottom: 0.24rem;
		width: 6.0rem;
		height: 2px;
		background: #68A4FF;
	}
	
	.pdtLine {
		position: absolute;
		z-index: 2;
		left: 0;
		bottom: 0.24rem;
		width: 3.0rem;
		height: 2px;
		background: #FFFFFF;
	}
	
	.pdtSpan {
		position: absolute;
		z-index: 3;
		bottom: 0.21rem;
		width: 3px;
		height: 6px;
		background: #FFFFFF;
	}
	
	.pdtRate1 {
		position: absolute;
		z-index: 3;
		top: 0;
		right: 0;
		color: #FFFFFF;
		font-size: 0.24rem;
	}
	
	.pdtRate {
		float: left;
		width: 6.7rem;
		margin: 0.40rem 0 0 0.02rem;
		height: 0.76rem;
		text-align: center;
		font-size: 0.40rem;
	}
	
	.pdtRate>i {
		font-style: inherit;
		font-size: 0.76rem;
		line-height: 0.76rem;
		font-size: .72rem;
	}
	
	.productDetailMes {
		margin: 0 0.35rem;
		width: 6.0rem;
		height: 0.24rem;
		font-size: .24rem;
		line-height: .24rem;
		color: #FFFFFF;
		overflow: hidden;
		margin-bottom: .4rem;
		text-align: center;
	}
	
	
	.pdtBugMes {
		float: left;
		width: 7.5rem;
		height: 0.9rem;
		text-align: center;
		overflow: hidden;
		background-color: #EFF5FF;
		overflow: hidden;
	}
	
	.pdtBugMes>span {
		float: left;
		text-align: center;
		height: .9rem;
		line-height: 0.9rem;
		font-size: 0.28rem;
		color: #68A4FF;
	}
	
	.pdtBugMesImg1 {
		float: left;
		margin: 0.24rem 0.12rem 0.22rem 2.4rem;
		width: 0.44rem;
		height: 0.44rem;
		background-size: 100% 100%;
	}
	
	.pdtBugMesImg2 {
		float: left;
		margin: 0.05rem 0.07rem;
		width: 0.14rem;
		height: 0.24rem;
		background-size: 100% 100%;
	}
	
	.productDetailCenter {
		margin: 0 auto;
		padding: 0;
		width: 6.9rem;
		background-color: #FFFFFF;
		padding: 0 0.3rem;
		color: #FFFFFF;
		overflow: hidden;
	}
	
	.pdcTitle>span:nth-child(1) {
		float: left;
		font-size: 0.32rem;
		line-height: 0.44rem;
		text-align: left;
		color: #181818;
	}
	
	.pdcTime {
		float: left;
		width: 6.9rem;
		height: 2.0rem;
		overflow: hidden;
	}
	
	.pdcTimeWord {
		float: left;
		margin: 0.5rem 0.08rem 0;
		width: 6.74rem;
		height: 0.28rem;
		font-size: 0.24rem;
		color: #181818;
		line-height: 0.28rem;
		overflow: hidden;
	}
	
	.pdcTimeWord>span:nth-child(1) {
		float: left;
		text-align: center;
		width: 1.4rem;
	}
	
	.pdcTimeWord>span:nth-child(2) {
		float: left;
		text-align: center;
		width: 1.4rem;
		margin: 0 1.27rem;
	}
	
	.pdcTimeWord>span:nth-child(3) {
		float: left;
		text-align: center;
		width: 1.4rem;
	}
	
	.pdcTimeProgress {
		float: left;
		margin: 0 0.7rem;
		height: 0.44rem;
		width: 5.5rem;
		overflow: hidden;
	}
	
	.pdcTimeProgress>span:nth-child(1) {
		float: left;
		width: 0.2rem;
		height: 0.2rem;
		border-radius: 0.5rem;
		border: 2px solid #1E76FD;
		box-sizing: border-box;
		margin: 0.12rem 0;
	}
	
	.pdcTimeProgress>span:nth-child(2),
	.pdcTimeProgress>span:nth-child(4) {
		float: left;
		margin: 0.2rem 0.03rem;
		width: 2.37rem;
		height: 1px;
		background-color: #CCCCCC;
	}
	
	.pdcTimeProgress>span:nth-child(3) {
		float: left;
		width: 0.2rem;
		height: 0.2rem;
		border-radius: 0.5rem;
		border: 2px solid #1E76FD;
		box-sizing: border-box;
		margin: 0.12rem 0;
	}
	
	.pdcTimeProgress>span:nth-child(5) {
		float: left;
		width: 0.2rem;
		height: 0.2rem;
		border-radius: 0.5rem;
		border: 2px solid #1E76FD;
		box-sizing: border-box;
		margin: 0.12rem 0;
	}
	
	.pdcTimeT {
		float: left;
		margin: 0 0.08rem 0.5rem;
		width: 6.74rem;
		height: 0.28rem;
		font-size: 0.24rem;
		color: #181818;
		line-height: 0.28rem;
		overflow: hidden;
	}
	
	.pdcTimeT>span:nth-child(1) {
		float: left;
		text-align: center;
		width: 1.4rem;
	}
	
	.pdcTimeT>span:nth-child(2) {
		float: left;
		text-align: center;
		width: 1.4rem;
		margin: 0 1.27rem;
	}
	
	.pdcTimeT>span:nth-child(3) {
		float: left;
		text-align: center;
		width: 1.4rem;
	}
	
	.boderB {
		border-bottom: 1px solid #ececec;
	}
	
	.productDetailTips {
		padding: .21rem .3rem .62rem;
		width: 6.9rem;
	}
	
	.productDetailTips p {
		width: 6.9rem;
		height: .28rem;
		font-size: .28rem;
		line-height: .28rem;
		color: #666666;
		margin-top: .4rem;
	}
	
	.productDetailTips p>span {
		margin-right: .64rem;
		color: #999999;
	}
	
	.pdcFyWord {
		float: left;
		margin: 0.7rem 0.66rem 0.24rem;
		width: 5.38rem;
		height: 0.44rem;
		color: #8D8D94;
		line-height: 0.44rem;
		font-size: 0.32rem;
		overflow: hidden;
	}
	
	.pdcFyWord>span:nth-child(1) {
		float: left;
		width: 1.92rem;
		text-align: center;
	}
	
	.pdcFyWord>span:nth-child(2) {
		float: right;
		width: 1.92rem;
		text-align: center;
	}
	
	.pdcFyMes {
		float: left;
		margin: 0.22rem 0.66rem 0;
		width: 5.38rem;
		height: 0.44rem;
		color: #181818;
		line-height: 0.44rem;
		font-size: 0.32rem;
		overflow: hidden;
	}
	
	.pdcFyMes>span:nth-child(1) {
		float: left;
		width: 1.30rem;
		margin-right: 0.25rem;
	}
	
	.pdcFyMes>span:nth-child(2) {
		float: left;
		margin-top: 0.2rem;
		width: 1.80rem;
		height: 0.02rem;
		border: 0.02rem dashed #CDCED3;
		box-sizing: border-box;
	}
	
	.pdcFyMes>span:nth-child(3) {
		float: left;
		width: 1.0rem;
		margin-left: 0.33rem;
	}
	
	.pdcIntroduce {
		width: 6.9rem;
		height: 2.25rem;
		overflow: hidden;
		color: #666666;
		font-size: 0.28rem;
		display: flex;
		justify-content: space-around;
	}
	
	.pdcIntroduce p {
		text-align: center;
	}
	
	.pdcIntroduce img {
		margin: .39rem 0 .26rem;
		width: .76rem;
		height: .76rem;
		background-size: 100% 100%;
	}
	
	.pdcIntroduce span {
		float: left;
		width: 100%;
		height: .28rem;
		font-size: .28rem;
		line-height: .28rem;
		color: #666666;
		text-align: center;
	}
	
	.productDetailCenterP {
		height: 1.1rem;
		width: 6.9rem;
		line-height: 1.1rem;
		color: #666666;
		font-size: .28rem;
		overflow: hidden;
	}
	
	.productDetailCenterP img {
		margin-top: .47rem;
		float: right;
		width: .14rem;
		height: .24rem;
		background-size: 100% 100%;
	}
	
	.productDetailBottom {
		margin: 0 auto;
		padding: 0;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		width: 7.5rem;
		height: 1.0rem;
		overflow: hidden;
		line-height: 1.0rem;
		font-size: 0.36rem;
		text-align: center;
		background-color: #208AFF;
		color: #FFFFFF;
		box-shadow: 0 -1px 3px 0;
		.span {
			float: left;
			width: 1.4rem;
			height: 1.0rem;
			background-color: #FFFFFF;
			box-shadow: 0 -1px 3px 0 rgba(32, 138, 255, 0.10);
			img {
				margin-top: .28rem;
				width: .4rem;
				height: .48rem;
				background-size: 100% 100%;
			}
		}
		.yy {
			float: left;
			width: 2.06rem;
			height: 1.0rem;
			text-align: center;
			background: #69B0FF;
		}
	}
	
	.disable {
		background: #e1e1e1;
		pointer-events: none;
	}
</style>