<template>
	<div>
		<div class="head flex"> </div>
		
	 <div v-for="(i,index) in productList">
		<div class="recommend" v-for="(j,n) in i.bidList"  :class="j.status<=4?'':'bidOver'"  @click="$go('/prod/productDetail',{bidNo:j.bidNo,productNo:j.productNo,backTitle:j.bidName,status:j.status})">
				<div class="recommendDiv bottomBorder">
					<img v-show="j.status>4" src="../../assets/main/prod/sq.png"/>
					<p class="recommendDivTitle">{{j.bidName}}</p>
					<div class="bidMessage">
						<div>
							<p class="bidMesRate"><i>{{j.annualizedRate}}</i>%<span v-show="j.appendRate>0">+{{j.appendRate}}%</span></p>
							<p class="bidMesP f24 color_font-99">历史年化收益率</p>
						</div>
						<div>
							<p class="bidMesTime"><i>{{j.periodLength}}</i> {{j.periodUnit|Totime}}</p>
							<p class="bidMesP f24 color_font-99">剩余{{j.amountWait}}元</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	
	</div>
</template>

<script>
	import {
		getProductBidsList
	} from '@/service'
	export default {
		name: 'productList',
		data() {
			return {
				item: {
					userToken: "",
					productNo: this.$route.query.productNo,
					pageIndex: 1,
				},
				productList: [],
				totalPage: 0,
	
			}
		},
		created() {
			this.init();

		},
		mounted() {
			window.scroll(0, 0);
			document.body.onscroll = () => {
				if ((document.documentElement.scrollTop || document.body.scrollTop)>= document.body.scrollHeight - document.documentElement.clientHeight) {
					this.item.pageIndex++;
					if (this.item.pageIndex > this.totalPage) {
						return;
					}
					if(this.$route.query.rollType){
						this.init();
					}
	
				}
			}
	
		},
		methods: {
	
			init() {
				getProductBidsList(this.item).then(res => {
					this.productList = this.productList.concat(res.productList);
					if (res.total) {
						this.totalPage = Math.ceil(res.total / 10);
					}
	
				});
			}
	
		}
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
		position: relative;
	}
	 .recommendDiv img{
	 	position: absolute;
	 	top: .8rem;
	 	right: .3rem;
	 	width: 1.24rem;
	 	height: .76rem;
	 	background-size: 100% 100%;
	 	opacity: 1;
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
	.bidMesTime {
		margin: 0.2rem 0 0.18rem 0;
		height: 0.526rem;
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
	
	.bidOver{
		opacity: 0.5;
	}
	
</style>