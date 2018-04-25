<template>
	<div class="gift">
		<div class="gift-selsectBtn f28 color_font-99" @click="selectBtn">
			<p :class="checkBol?'blueLine':''">未领取({{giftList.unreceivedCount}})</p>
			<p :class="checkBol?'':'blueLine'">已领取({{giftList.receivedCount}})</p>
		</div>

		<div class="gift-list" v-if="couponList!=''">
			<p class="f28 color_font-36">
				<span>类型</span>
				<span v-if="checkBol">收到时间</span>
				<span v-else>领取时间</span>
				<span>操作</span>
			</p>
			<div v-for="(i,index) in couponList" class="gift-list-div borderB">
				<p class="f32">
					<span class="colorFont">{{i.profitRate}}{{i.type==1?'%':'元'}}</span>
					<span>{{i.couponName}}</span>
				</p>
				<p class="f28">
					<span>{{checkBol?i.giveTime.split(" ")[0]:i.receiveTime.split(" ")[0]}}</span>
					<span>{{checkBol?i.giveTime.split(" ")[1]:i.receiveTime.split(" ")[1]}}</span>
				</p>
				<p v-if="checkBol" class="gift-list-div-btn f28" @click="getGift(index,i.couponNo,i.receiveNo)">领取</p>
				<p v-else class="gift-list-div-btn f28 dis" @click="$go('/coupon/main?rollType=1')">查看</p>
			</div>

		</div>

		<div v-else class="gift-list-none">
			<img src="../../assets/main/mine/zw.png" />
		</div>

	</div>
</template>

<script>
	import {
		searchUserCouponInfo,
		searchCouponReceiveDetails
	} from '@/service'
	export default {

		name: 'gift',

		data() {
			return {
				checkBol: true, //btn选择按钮
				giftList: [], //礼物列表
				pageIndex: 1, //分页
				status: 2, //查询类型
				total:0,
				couponList:[],
			}
		},
		computed: {},
		created() {
			if(this.$route.query.rollType) {
						this.mgGift();
			}
		},
		mounted() {
			window.scroll(0, 0);
			document.body.onscroll = () => {

				if((document.documentElement.scrollTop || document.body.scrollTop) >= document.body.scrollHeight - document.documentElement.clientHeight) {

					this.pageIndex++;
					if(this.pageIndex > this.total) {
						return;
					}
					if(this.$route.query.rollType) {
						this.mgGift();
					}
				}
			}
		},
		methods: {
			//选择栏切换
			selectBtn() {
				this.pageIndex = 1;
				this.giftList = [];
				this.couponList=[];
				this.checkBol = !this.checkBol;
				if(!this.checkBol) {
					this.status = 3;
				} else {
					this.status = 2;
				}
				this.mgGift();
			},
			//我的礼物
			mgGift() {
				searchUserCouponInfo({
					type: 2,
					status: this.status,
					pageIndex: this.pageIndex,
				}).then(res => {
					this.giftList = res;
					this.couponList=this.couponList.concat(res.couponList);
					if(!this.checkBol) {
						this.total = Math.ceil(res.receivedCount / 10);
					} else {
						this.total = Math.ceil(res.unreceivedCount / 10);
//						console.log(res.unreceivedCount);
					}
					
					
				})
			},
			//领取礼物
			getGift(index, couponNo, receiveNo) {

				searchCouponReceiveDetails({
					receiveNo,
					couponNo
				}).then(res => {
					this.giftList.unreceivedCount -= 1;
					this.giftList.receivedCount += 1;
					this.couponList.splice(index, 1);
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
			&-none {
				margin: 2.5rem 2.74rem 0;
				img {
					width: 2.02rem;
					height: 1.36rem;
					background-size: 100% 100%;
				}
			}
			&>p {
				padding: 0 .44rem 0 .66rem;
				width: 6.4rem;
				height: 1.04rem;
				line-height: 1.04rem;
				background: #F7F7F7;
				display: flex;
				justify-content: space-between;
				span:nth-child(1) {
					width: 1.4rem;
					text-align: center;
				}
				span:nth-child(2) {
					width: 1.4rem;
					text-align: center;
				}
				span:nth-child(3) {
					width: 1.4rem;
					text-align: center;
				}
			}
			.borderB {
				border-bottom: 1px solid #E5E5E5;
			}
			&-div {
				margin: 0 .3rem;
				padding: 0 .14rem 0 .36rem;
				width: 6.4rem;
				height: 1.6rem;
				background: #FFFFFF;
				display: flex;
				justify-content: space-between;
				p:nth-child(1) {
					margin: .4rem 0;
					width: 1.4rem;
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
					width: 1.4rem;
					text-align: center;
					color: #666666;
					span {
						line-height: .32rem;
					}
				}
				&-btn {
					float: right;
					margin: .52rem 0;
					width: 1.4rem;
					height: .56rem;
					line-height: .56rem;
					text-align: center;
					background-color: #E4F1FF;
					border-radius: .52rem;
					color: #208AFF;
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