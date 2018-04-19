<template>
	<div class="product" style="background: #f1f1f1;">
		<p style="background: #f1f1f1;height: .2rem;width: 100%;"></p>
		<div class="productListDiv" v-for="(i,index) in productList">
			<div class="recommend"  :class="index>0?'borderTop':''">
				<p class="newTitle bottomBorder" @click="$go('/prod/productList',{productName:i.productName,productNo:i.productNo,productType:i.productType,backTitle:i.productName,rollType:1})">{{i.productName}} <span class="newTitlespan">{{i.profitPlan|profitPlan}}</span> <span class="more">更多</span></p>
				
				<div class="recommendDiv"  v-for="(j,n) in i.bidList"  :class="(i.bidList.length>1 && n<i.bidList.length-1)?'bottomBorder':''"   @click="$go('/prod/productDetail',{bidNo:j.bidNo,productNo:j.productNo,backTitle:j.bidName})">
					<p class="recommendDivTitle">{{j.bidName}}</p>
					<div class="bidMessage">
						<div>
							<p class="bidMesRate"><i>{{j.annualizedRate|tofixed2}}</i>% <span v-show="j.appendRate>0">+{{j.appendRate|tofixed2}}%</span></p>
							<p class="bidMesP f24 color_font-99">历史年化</p>
						</div>
						<div>
							<p class="bidMesTime"><i>{{j.periodLength}}</i>{{j.periodUnit|Totime}}</p>
							<p v-if="j.amountWait>=10000" class="bidMesP f24 color_font-99">剩余{{j.amountWait/10000}}万元</p>
							<p v-else class="bidMesP f24 color_font-99">剩余{{j.amountWait|formatNum}}元</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--风险提示-->
		<!--<p class="RiskTips">————<i>出借有风险，选择需谨慎</i>————</p>-->
	</div>
</template>

<script>
	import {
		productSearchBidsList
	} from '@/service'
	export default {
		name: 'product',
		data() {
			return {
				item: {
					productType: 2,
					userToken: "",
				},
				productList: '',
				profitPlanArr: ['', '等额本息', '等额本金', '按期付息，到期还本', '一次性还款', '其他'],
			}
		},
		created() {
			productSearchBidsList(this.item).then(res => {
				this.productList = res.productList;
				console.log(this.productList);
			});

		},
		methods: {},
		watch: {}
	}
</script>

<style scoped>
	.recommend {
		margin: 0 auto;
		padding: 0;
		text-align: center;
		width: 7.5rem;
		background-color: #fff;
		overflow: hidden;
	}
	
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
	.bidMesRate i{
		font-size: .52rem;
		font-style: inherit;
	}
	.bidMesRate span{
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
	
	.borderTop{
		margin-top: .2rem;
	}
	
</style>