<template>
	<div class="tradeRecord">

		<div class="tradeRecord-div" v-if="list.length">
			<div class="tradeRecord-list sonDiv" v-for="(i,index) in list">
				<div class="div1 f32">
					<p>{{i.typeName}}</p>
					<p :class="i.optype==1?'color':''">{{i.optype|optype}}{{i.operationAmount|formatNum}}</p>
				</div>
				<div class="div2 f24 color_font-99">
					<p>{{i.createTime}}</p>
					<p>余额:{{i.availableAmountAfter|formatNum}}元</p>
				</div>
			</div>
		</div>

		<div v-else  class="tradeRecord-none">
			<img src="../../assets/main/mine/zwjl.png" />
			<p class="f28">暂无交易记录</p>
		</div>

	</div>
</template>

<script>
	import {
		transactionRecord
	} from '@/service'
	export default {
		name: 'tradeRecord',
		data() {
			return {
				item: {
					type: '0',
					pageIndex: 1,
				},
				list: [],
			}
		},
		created() {
			this.init();
		},
		mounted() {
			window.scroll(0, 0);
			document.body.onscroll = () => {
				if((document.documentElement.scrollTop || document.body.scrollTop) >= document.body.scrollHeight - document.documentElement.clientHeight) {
					this.item.pageIndex++;
					if(this.item.pageIndex > this.totalPage) {
						return;
					}
					if(this.$route.query.rollType) {
						this.init();
					}
				}
			}

		},
		methods: {
			init() {

				transactionRecord(this.item).then(res => {
					console.log(res);
					this.list = this.list.concat(res.dataList);
					this.totalPage = Math.ceil(res.total / 10);
				});

			}
		},
		watch: {}
	}
</script>

<style lang="scss" scoped>
	.tradeRecord {
		&-none {
			/*display: none;*/
			img {
				margin: 4.02rem 3.04rem .6rem;
				width: 1.42rem;
				height: .98rem;
				background-size: 100% 100%;
			}
			p {
				color: #666666;
				text-align: center;
			}
		}
		&-div{
			background: #F6F5F5;
			overflow: hidden;
		}
		&-list {
			float: left;
			margin-bottom: .16rem;
			background-color: #FFFFFF;
			.div1 {
				margin: .3rem 0 0 0;
				width: 6.9rem;
				height: .32rem;
				color: #666666;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.div2 {
				margin: .24rem 0 0.32rem 0;
				width: 6.9rem;
				height: .24rem;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.color{
				color: #FF9616;
			}
		}
	}
</style>