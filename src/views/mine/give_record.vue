<template>
	<div class="gift">
		<div class="gift-selsectBtn f28 color_font-99" @click="selectBtn">
			<p :class="checkBol?'blueLine':''">未领取({{res.unreceivedCount}})</p>
			<p :class="checkBol?'':'blueLine'">已领取({{res.receivedCount}})</p>
		</div>
		<div class="gift-list" v-if="list!=''">
			<p class="f28 color_font-36">
				<span>类型</span>
				<span>{{checkBol?'赠送时间':'领取时间'}}</span>
			</p>
			<div v-for="(i,index) in list" class="gift-list-div borderB">
				<p class="f32">
					<span class="colorFont">{{i.amount}}{{i.couponType==1?'%':'元'}}</span>
					<span>{{i.typeName}}</span>
				</p>
				<p v-if="checkBol" class="f28">
					<span>{{i.giveTime.split(" ")[0]}}</span>
					<span>{{i.giveTime.split(" ")[1]}}</span>
				</p>

				<p v-else class="f28">
					<span>{{i.receiveTime.split(" ")[0]}}</span>
					<span>{{i.receiveTime.split(" ")[1]}}</span>
				</p>
			</div>
		</div>

		<div v-else class="gift-none">
			<img src="../../assets/main/mine/zwjl.png" />
			<p class="f28">暂无赠送记录</p>
		</div>
	</div>
</template>

<script>
	import {
		searchCouponSendList
	} from '@/service'

	export default {

		name: 'give',

		data() {
			return {
				checkBol: true,
				res: {},
				list: [],
				item: {
					beUserCode: this.$route.query.userCode,
					status: 2,
					pageIndex: 1,
				},
				total: 0,
			}
		},
		computed: {},
		created() {
			this.init();
		},
		mounted() {
			window.scroll(0, 0);
			document.body.onscroll = () => {

				if((document.documentElement.scrollTop || document.body.scrollTop) >= document.body.scrollHeight - document.documentElement.clientHeight) {

					this.item.pageIndex++;
					if(this.item.pageIndex > this.total) {
						return;
					}
					if(this.$route.query.rollType) {
						this.init();
					}
				}
			}
		},
		methods: {
			selectBtn() {
				this.item.pageIndex = 1;
				this.list = [];
				this.checkBol = !this.checkBol;
				if(!this.checkBol) {
					this.item.status = 3;
				} else {
					this.item.status = 2;
				}
				this.init();
			},
			init() {
				searchCouponSendList(this.item).then(res => {
					this.res = res;
					this.list = this.list.concat(res.couponSendList);

					if(this.checkBol) {
						this.total = Math.ceil(res.unreceivedCount / 10);
					} else {
						this.total = Math.ceil(res.receivedCount / 10);

					}

				});
			},
		},
		watch: {}
	}
</script>

<style lang="scss" scoped>
	.gift {
		margin: 0 auto;
		padding: 0;
		width: 7.5rem;
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
		&-selsectBtn {
			padding: 0 1.08rem;
			width: 5.34rem;
			height: .8rem;
			line-height: .8rem;
			overflow: hidden;
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #E5E5E5;
			p {
				float: left;
				width: 1.6rem;
				text-align: center;
			}
			.blueLine {
				color: #208AFF;
				border-bottom: 2px solid #208AFF;
				box-sizing: border-box;
			}
		}
		&-list {
			&>p {
				padding: 0 1.08rem;
				width: 5.34rem;
				height: 1.04rem;
				line-height: 1.04rem;
				background: #F7F7F7;
				display: flex;
				justify-content: space-between;
				span:nth-child(1) {
					width: 1.6rem;
					text-align: center;
				}
				span:nth-child(2) {
					width: 1.6rem;
					text-align: center;
				}
			}
			.borderB {
				border-bottom: 1px solid #E5E5E5;
			}
			&-div {
				margin: 0 .3rem;
				padding: 0 .78rem;
				width: 5.34rem;
				height: 1.6rem;
				background: #FFFFFF;
				display: flex;
				justify-content: space-between;
				p:nth-child(1) {
					margin: .4rem 0;
					width: 1.6rem;
					text-align: center;
					.colorFont {
						color: #FF5513;
					}
					span {
						display: block;
						width: 1.4rem;
						line-height: .4rem;
					}
				}
				p:nth-child(2) {
					margin: .48rem 0;
					width: 1.6rem;
					text-align: center;
					color: #666666;
					span {
						line-height: .32rem;
					}
				}
				.dis {
					border: 1px solid #E5E5E5;
					line-height: .54rem;
					box-sizing: border-box;
					color: #666666;
					background-color: #FFFFFF;
				}
			}
		}
	}
</style>