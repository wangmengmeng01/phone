<template>
	<div class="productDetail">
		<!--详情页-->
		<!--详情头部-->
		<div class="productDetailTop">
			<p class="proBidMes">
				<span>{{list.borrowName}}</span>
				<span>{{list.status=='4'?'已到期':'持有中'}}</span>
				<span>{{profitPlanArr[list.profitPlan>4?'5':list.profitPlan]}}</span>
				<span></span>
			</p>
			<p class="pdtWord">资产金额(元)</p>
			<p class="pdtRate"><i>{{list.initCashAmount}}</i>元</p>
			<div class="pdtMessage">
				<p><span>历史年化率</span><span>{{list.annualizedRate}}</span></p>
				<p><span>持有收益(元)</span><span>{{list.yesProfit|formatNum}}</span></p>
				<p><span>剩余收益(元)</span><span>{{list.waitProfit|formatNum}}</span></p>
			</div>
			<div class="pdtProgress">
				<p class="pdtGrayLine"></p>
				<p class="pdtLine"></p>
			</div>
			<p class="pptime m1"><span>起息日</span><span>到期日</span></p>
			<p class="pptime m2"><span>{{list.interestStartDate}}</span><span>{{list.interestEndDate}}</span></p>
		</div>
		<!--返佣规则-->
		<div class="productDetailCenter">
			<p class="pdcTitle">
				<span>P2P信息穿透</span>
				<span>查看详情 <img src="../../assets/common/arrow-right.png"/></span>
			</p>
			<div class="pdcIntroduce">
				<p @click="$go('/wealth/claims',{cashNo:item.cashNo})">
					<img class="pdcIntroduceImg1" src="../../assets/wealth/wealth/xczq.png" />
					<span>现持债权</span>
				</p>
				<p @click="loanAgreement" style="margin-left: 2.6rem;">
					<img class="pdcIntroduceImg2" src="../../assets/wealth/wealth/cjxy.png" />
					<span>出借协议</span></p>
			</div>
		</div>
		<!--返佣规则-->
		<div class="productDetailCenter">
	
			<p class="pdcTitle">
				<span>产品亮点</span>
				<span>查看详情 <img src="../../assets/common/arrow-right.png"/></span>
			</p>
			<div class="pdcIntroduce">
				<p @click="$go('/prod/bankDepository')">
					<img class="pdcIntroduceImg1" src="../../assets/main/prod/Group47@2x.png" />
					<span>资金银行存管</span>
				</p>
				<p @click="$go('/prod/higHqualityAssets')">
					<img class="pdcIntroduceImg1" src="../../assets/main/prod/Group46@2x.png" />
					<span>严选优质资产</span></p>
				<p @click="$go('/prod/Honour')">
					<img class="pdcIntroduceImg2" src="../../assets/main/prod/Group45@2x.png" />
					<span>历史100%兑付</span></p>
			</div>
		</div>
	
	</div>
</template>

<script>
	import loanAgreement from '@/components/loanAgreement'
	import {
		investPropertyDetail
	} from '@/service'
	export default {
		name: 'changeBank',
		data() {
			return {
				item: {
					cashNo: '',
					bidNo: '',
					bidType: '',
				},
				list: {},
				profitPlanArr: ['', '等额本息', '等额本金', '按期付息，到期还本', '一次性还款', '其他'],
			}
		},
		created() {
			this.item.cashNo = this.$route.query.cashNo;
			this.item.bidNo = this.$route.query.bidNo;
			this.item.bidType = this.$route.query.bidType;
			investPropertyDetail(this.item).then(res => {
				console.log(res);
				this.list = res;
			});
		},
		methods: {
			loanAgreement() {
				this.$alert({
					type: 'protocol',
					content: loanAgreement
				})
			}
		},
		watch: {}
	}
</script>

<style scoped>
	.pptime {
		float: left;
		height: 0.34rem;
		line-height: 0.34rem;
		color: #FFFFFF;
		font-size: 0.24rem;
		overflow: hidden;
	}
	
	.pptime>span:nth-child(1) {
		width: 3.35rem;
		height: 0.34rem;
		float: left;
		text-align: left;
	}
	
	.pptime>span:nth-child(2) {
		width: 3.35rem;
		height: 0.34rem;
		float: right;
		text-align: right;
	}
	
	.m1 {
		margin: 0.18rem 0 0.08rem;
	}
	
	.m2 {
		margin-bottom: 0.68rem;
	}
	
	.productDetailTop {
		margin: 0 auto;
		padding: 0;
		width: 6.7rem;
		/*height: 3.0rem;*/
		background-color: #3299D1;
		padding: 0 0.4rem;
		color: #FFFFFF;
		overflow: hidden;
	}
	
	.proBidMes {
		width: 6.7rem;
		height: 0.98rem;
		background: rgba(237, 236, 242, 1);
		border-radius: 8px;
		overflow: hidden;
	}
	
	.proBidMes>span:nth-child(1) {
		margin: 0.12rem 0.2rem 0.02rem;
		width: 2.95rem;
		float: left;
		font-size: 0.28rem;
		color: #181818;
		line-height: 0.4rem;
		text-align: left;
	}
	
	.proBidMes>span:nth-child(2) {
		margin: 0.12rem 0.2rem 0.02rem;
		width: 2.95rem;
		float: right;
		font-size: 0.28rem;
		color: #181818;
		line-height: 0.4rem;
		text-align: right;
	}
	
	.proBidMes>span:nth-child(3) {
		margin: 0 0.2rem 0.16rem;
		width: 2.95rem;
		float: left;
		font-size: 0.20rem;
		color: #8D8D94;
		line-height: 0.28rem;
		text-align: left;
	}
	
	.proBidMes>span:nth-child(4) {
		margin: 0 0.2rem 0.16rem;
		width: 2.95rem;
		float: right;
		font-size: 0.20rem;
		color: #8D8D94;
		line-height: 0.28rem;
		text-align: right;
	}
	
	.pdtWord {
		float: left;
		width: 6.7rem;
		margin-top: 0.4rem;
		text-align: center;
		height: 0.28rem;
		line-height: 0.28rem;
		font-size: 0.28rem;
	}
	
	.pdtRate {
		float: left;
		width: 6.7rem;
		margin: 0.08rem 0 0.44rem;
		height: 0.76rem;
		text-align: center;
		font-size: 0.48rem;
	}
	
	.pdtRate>i {
		font-style: inherit;
		font-size: 0.76rem;
		line-height: 0.76rem;
	}
	
	.pdtMessage {
		float: left;
		width: 6.7rem;
		height: 0.8rem;
		overflow: hidden;
	}
	
	.pdtMessage>p:nth-child(1) {
		float: left;
		text-align: center;
		width: 1.95rem;
		height: 0.8rem;
		overflow: hidden;
	}
	
	.pdtMessage>p:nth-child(2) {
		float: left;
		text-align: center;
		width: 2.8rem;
		height: 0.8rem;
		overflow: hidden;
	}
	
	.pdtMessage>p:nth-child(3) {
		float: left;
		text-align: center;
		width: 1.95rem;
		height: 0.8rem;
		overflow: hidden;
	}
	
	.pdtMessage span:nth-child(1) {
		float: left;
		width: 100%;
		font-size: 0.24rem;
		height: 0.34rem;
		line-height: 0.34rem;
		margin-bottom: 0.02rem;
	}
	
	.pdtMessage span:nth-child(2) {
		float: left;
		width: 100%;
		font-size: 0.32rem;
		height: 0.44rem;
		line-height: 0.44rem;
	}
	
	.pdtProgress {
		float: left;
		margin-top: 0.34rem;
		width: 6.7rem;
		height: 0.56rem;
		position: relative;
	}
	
	.pdtGrayLine {
		position: absolute;
		left: 0;
		top: 0;
		width: 6.7rem;
		height: 0.56rem;
		background: #F0EAF0;
		border-radius: 0.08rem;
	}
	
	.pdtLine {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 2;
		width: 6.7rem;
		height: 0.56rem;
		background: linear-gradient(to right, #8E9EAB, rgba(142, 158, 181, 0.3));
		border-radius: 0.08rem 0 0 0.08rem;
	}
	
	.pdtProgressMes {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 32;
		width: 6.7rem;
		height: 0.56rem;
		line-height: 0.56rem;
		font-size: 0.32rem;
		/*margin-left: 0.76rem;*/
		text-align: center;
		color: #181818;
	}
	
	.pdtProgressMes>i {
		font-style: inherit;
		font-size: 0.36rem;
		line-height: 0.56rem;
		color: #F84740;
	}
	
	.pdtBugMes {
		float: left;
		margin: 0.18rem 0 0.58rem;
		width: 6.7rem;
		height: 0.34rem;
		text-align: center;
		overflow: hidden;
	}
	
	.pdtBugMes>span {
		float: left;
		text-align: center;
		line-height: 0.34rem;
		font-size: 0.24rem;
	}
	
	.pdtBugMesImg1 {
		float: left;
		margin: 0.01rem 0.16rem 0.01rem 2.4rem;
		width: 0.3rem;
		height: 0.32rem;
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
		height: 0.44rem;
		overflow: hidden;
		margin-top: 0.6rem;
	}
	
	.pdcTitle>span:nth-child(1) {
		float: left;
		font-size: 0.32rem;
		line-height: 0.44rem;
		text-align: left;
		color: #181818;
	}
	
	.pdcTitle>span:nth-child(2) {
		float: right;
		font-size: 0.32rem;
		line-height: 0.44rem;
		text-align: right;
		color: #8D8D94;
		overflow: hidden;
		display: none;
	}
	
	.pdcTitle>span:nth-child(2) img {
		float: right;
		margin: 0.04rem 0 0.04rem 0.14rem;
		width: 0.2rem;
		height: 0.34rem;
		background-size: 100% 100%;
	}
	
	.pdcTime {
		float: left;
		margin-top: 0.64rem;
		padding: 0 0.48rem;
		width: 5.76rem;
		height: 1.44rem;
		overflow: hidden;
	}
	
	.pdcTimeWord {
		float: left;
		width: 5.76rem;
		height: 0.44rem;
		font-size: 0.32rem;
		color: #181818;
		line-height: 0.44rem;
		overflow: hidden;
	}
	
	.pdcTimeWord>span:nth-child(1) {
		float: left;
		text-align: left;
		width: 1.82rem;
		padding-left: 0.1rem;
	}
	
	.pdcTimeWord>span:nth-child(2) {
		float: left;
		text-align: center;
		width: 1.92rem;
	}
	
	.pdcTimeWord>span:nth-child(3) {
		float: left;
		text-align: right;
		width: 1.72rem;
		padding-right: 0.2rem;
	}
	
	.pdcTimeProgress {
		float: left;
		margin: 0.24rem 0 0.22rem;
		height: 0.2rem;
		width: 5.76rem;
		overflow: hidden;
	}
	
	.pdcTimeProgress>span:nth-child(1) {
		float: left;
		margin-left: 0.34rem;
		width: 0.2rem;
		height: 0.2rem;
		border-radius: 0.2rem;
		background-color: #7DE8D8;
	}
	
	.pdcTimeProgress>span:nth-child(2),
	.pdcTimeProgress>span:nth-child(4) {
		float: left;
		margin: 0.04rem 0.2rem;
		width: 1.8rem;
		height: 0.12rem;
		border-radius: 0.2rem;
		background: linear-gradient(to right, #8E9EAB, #EEF2F3);
	}
	
	.pdcTimeProgress>span:nth-child(3) {
		float: left;
		width: 0.2rem;
		height: 0.2rem;
		border-radius: 0.2rem;
		background-color: #FAB2FF;
	}
	
	.pdcTimeProgress>span:nth-child(5) {
		float: left;
		width: 0.2rem;
		height: 0.2rem;
		border-radius: 0.2rem;
		background-color: #FFBBB6;
	}
	
	.pdcTimeT {
		float: left;
		height: 0.34rem;
		font-size: 0.24rem;
		line-height: 0.34rem;
		width: 5.76rem;
		color: #8D8D94;
		overflow: hidden;
	}
	
	.pdcTimeT>span:nth-child(1) {
		float: left;
		text-align: left;
		width: 1.76rem;
		padding-left: 0.16rem;
	}
	
	.pdcTimeT>span:nth-child(2) {
		float: left;
		text-align: center;
		width: 1.92rem;
	}
	
	.pdcTimeT>span:nth-child(3) {
		float: left;
		text-align: right;
		width: 1.92rem;
	}
	
	.pdcRule {
		float: left;
		width: 6.7rem;
		height: 0.34rem;
		color: #181818;
		font-size: 0.24rem;
		line-height: 0.34rem;
		text-align: left;
		overflow: hidden;
		margin-bottom: 0.08rem;
	}
	
	.pdcRule>img {
		float: left;
		margin: 0.05rem 0.2rem 0.05rem 0;
		width: 0.16rem;
		height: 0.24rem;
	}
	
	.pdcRule1 {
		margin-top: 0.82rem;
		color: #F84740;
	}
	
	.pdcRule2 {
		margin-bottom: 0.92rem;
	}
	
	.pdcRule3 {
		margin-top: 0.86rem;
	}
	
	.pdcRule4 {
		margin-bottom: 0.94rem;
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
		float: left;
		margin: 0.66rem 0 0.86rem;
		width: 6.7rem;
		height: 1.44rem;
		overflow: hidden;
		color: #181818;
		font-size: 0.24rem;
	}
	
	.pdcIntroduce>p:nth-child(1) {
		float: left;
		width: 1.45rem;
		height: 1.44rem;
		margin-left: 0.4rem;
		overflow: hidden;
	}
	
	.pdcIntroduce>p:nth-child(2) {
		float: left;
		width: 1.45rem;
		height: 1.44rem;
		margin: 0 0.74rem;
		overflow: hidden;
	}
	
	.pdcIntroduce>p:nth-child(3) {
		float: left;
		width: 1.6rem;
		height: 1.44rem;
		overflow: hidden;
	}
	
	.pdcIntroduce p>span {
		float: left;
		width: 1.44rem;
		margin-top: 0.14rem;
		text-align: center;
		height: 0.34rem;
		line-height: 0.34rem;
	}
	
	.pdcIntroduce p>img {
		float: left;
		width: 0.96rem;
		height: 0.96rem;
		background-size: 100% 100%;
	}
	
	.pdcIntroduceImg1 {
		margin: 0 0.24rem;
	}
	
	.pdcIntroduceImg2 {
		margin: 0 0.32rem;
	}
	
	.productDetailBottom {
		margin: 0 auto;
		padding: 0;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		width: 7.5rem;
		height: 1.1rem;
		overflow: hidden;
		line-height: 1.1rem;
		font-size: 0.36rem;
		text-align: center;
		background-color: #3299D1;
		color: #FFFFFF;
	}
</style>