<template>
	<div class="continueInvest pageCenter">
		<div v-if="list.length">
			<p class="continueInvest-title center f24">为我的资产开启自动续期 到期后本金将自动购<br />买同款产品 避免资金闲置而损失收益</p>
			<div class="continueInvest-list borderB sonDiv2" v-for="(i,index) in list">
				<p class="continueInvest-list-p f28">{{i.bidName}}</p>
				<div class="div1">
					<p class="f36 p1">{{i.investAmount|formatNum}}</p>
					<p class="p2" @click="submit(i.investId,i.continueFlag,index)">
						<img :src="require(`@/assets/main/prod/${i.continueFlag==1?'On':'off'}@2x.png`)" alt="" class="eyes" />

					</p>
				</div>
				<div class="div2 ">
					<p class="f24 color_font-99">投资金额(元)</p>
					<p>
						<span class="f24 color_font-99">到期日期</span>
						<span class="f24 color_font-36">{{i.investDueDate}}</span>
					</p>
				</div>
			</div>
		</div>
		<div v-else class="continueInvest-none">
			<img src="../../assets/main/mine/zwjl.png" />
			<p class="f28">暂无记录</p>
		</div>
	</div>
	</div>
</template>

<script>
	import {
		getUserEarningsDetail,
		continueOpenOperator
	} from '@/service'
	export default {
		name: 'continueInvest',
		data() {
			return {
				autoRenewBol: true, //自动续费
				item: {
					pageIndex: 1, //续投列表分页
				},
				totalPage: 0,
				list: [], //购买记录

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
				getUserEarningsDetail(this.item).then(res => {
					console.log(res);
					this.list = this.list.concat(res.list);
					this.totalPage = Math.ceil(res.totalCount / 10);
				});
			},
			submit(a, b, c) {
				if(b == 1) {
					b = 2;
				} else {
					b = 1;
				}

				continueOpenOperator({
					investId: a,
					isContinue: b,
				}).then(res => {

					if(res.isContinue == 1) {
						this.list[c].continueFlag = 1;
					} else {
						this.list[c].continueFlag = 2;
					}

				});

				//				
			}
		},
		watch: {}
	}
</script>

<style lang="scss" scoped>
	.continueInvest {
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
		&-title {
			padding: .12rem 0;
			background: #FFF6E0;
			color: #FF9616;
			line-height: .36rem;
		}
		&-list {
			width: 6.9rem;
			height: 2.32rem;
			overflow: hidden;
			&-p {
				float: left;
				margin: .45rem 0 0 0;
				width: 6.9rem;
				color: #666666;
				line-height: .32rem;
			}
			.div1 {
				float: left;
				height: .62rem;
				width: 6.9rem;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.p1 {
					padding: .3rem 0 0 0;
					line-height: .32rem;
					color: #FF5513;
				}
				.p2 {
					img {
						width: 1.02rem;
						height: .62rem;
						background-size: 100% 100%;
					}
				}
			}
			.div2 {
				float: left;
				width: 6.9rem;
				margin: 0.3rem 0 .4rem 0;
				height: .24rem;
				display: flex;
				justify-content: space-between;
				align-items: center;
				p {
					height: .24rem;
					width: 2.68rem;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
			}
			.marginB {
				margin-bottom: .4rem;
			}
			.color {
				color: #FF5513;
			}
		}
	}
</style>