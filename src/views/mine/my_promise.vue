<template>
	<div class="promise">
		<div class="promise-selsectBtn f28 color_font-99" @click="selectBtn">
			<p :class="checkBol?'blueLine':''">待履约({{promiseList.waitPromiseCount}})</p>
			<p :class="checkBol?'':'blueLine'">已履约({{promiseList.alreadyPromiseCount}})</p>
		</div>
		<div class="promise-list" v-show="promiseInviteList!=''">
			<div class="promise-div" v-for="(i,index) in promiseInviteList">
				<div class="promise-div-join" @click="buyBid(i)" :class="checkBol?((i.isSoldOut && i.isNotFunds)?'':'opacity') : 'unClick'">
					<p class="f28">{{i.productName}}</p>
					<p>{{i.annualizedRate}}<i>%</i></p>
					<p class="f28">
						<span class="promise-div-join-span1">履约金额(元)</span>
						<span class="promise-div-join-span2">{{i.inviteAmount|formatNum}}</span>
					</p>
					<p class="f28">
						<span class="promise-div-join-span1">预计收益(元)</span>
						<span class="promise-div-join-span2">{{i.interest|formatNum}}</span>
					</p>
				</div>
				<p class="promise-div-p f24">
					<span class="color_font-99">{{checkBol?'邀约时间':'履约时间'}}&nbsp;&nbsp; {{i.createdTime}}</span>
					<span> <a :href="`tel:${i.mobile}`"></a><img src="../../assets/main/mine/xdh.png"/>联系理财师 </span>
				</p>

				<p v-show=" !i.isSoldOut && checkBol" class="promise-div-tips f24">产品已售罄，等待新产品发布</p>

				<p v-show="i.isSoldOut && !i.isNotFunds && checkBol" class="promise-div-tips f24">产品剩余可投金额不足，等待新产品发布</p>

			</div>

		</div>

		<div class="promise-none" v-show="promiseInviteList==''">
			<img src="../../assets/main/mine/zwjl.png" />
			<p class="f28">暂无履约记录</p>
		</div>

	</div>
</template>

<script>
	import {
		getPromiseInviteList,
		getUserStatus,
		userActivate
	} from '@/service'
	 import axios from 'axios'
	export default {

		name: 'promise',

		data() {
			return {
				checkBol: true,
				promiseItem: {
					type: 1,
					pageIndex: 1,
					beUserCode: this.$route.query.userCode,
				}, //履约参数
				promiseList: {}, //履约数据
				promiseInviteList: [], //履约列表
				total: 0,
			}
		},
		computed: {},
		created() {
			this.getPromiseInviteList();
		},
		mounted() {
			window.scroll(0, 0);
			document.body.onscroll = () => {

				if((document.documentElement.scrollTop || document.body.scrollTop) >= document.body.scrollHeight - document.documentElement.clientHeight) {

					this.promiseItem.pageIndex++;
					if(this.promiseItem.pageIndex > this.total) {
						return;
					}
					if(this.$route.query.rollType) {
						this.getPromiseInviteList();
					}
				}
			}
		},
		methods: {
			//选择栏切换
			selectBtn() {
				this.promiseItem.pageIndex = 1;
				this.promiseInviteList = [];
				this.checkBol = !this.checkBol;
				if(!this.checkBol) {
					this.promiseItem.type = 2;
				} else {
					this.promiseItem.type = 1;
				}
				this.getPromiseInviteList();
			},
			getPromiseInviteList() {
				getPromiseInviteList(this.promiseItem).then(res => {
					this.promiseList = res;
					this.promiseInviteList = this.promiseInviteList.concat(res.promiseInviteList);
					if(this.checkBol) {
						this.total = Math.ceil(res.waitPromiseCount / 10);
						//						console.log(res.waitPromiseCount);
					} else {
						this.total = Math.ceil(res.alreadyPromiseCount / 10);
					}

				});
			},
			buyBid(item) {

				const i = item;

				getUserStatus().then(res => {

					if(res.code == "100") {
						const info = res.result;

						if(info.openAccountStatus == "1") {
							//未开户
							this.$go('/reg_bank');
						} else if(info.openAccountStatus == "4") {
							//激活

							userActivate({
								retUrl: location.origin + location.pathname
							}).then(res => {
								axios({
									method: 'post',
									url: location.origin + new URL(res.serviceUrl).pathname,
									data: res.inMap,
									transformRequest: [function(data) {
										let ret = '';
										for(let it in data) {
											ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
										}
										return ret.slice(0, ret.length - 1)
									}],
								}).then(r => {
									if(r.status === 200) {
										if(r.data) {
											document.body.innerHTML = r.data;
											setTimeout(() => {
												document.form.submit()
											}, 0)
										}
									}
								})
							})

						} else {
							//电子签约
							if(info.autoBuyBidGrantFlag == "1") {

								//复投
								if(info.autoBuyBidFlag == "1") {

									//风险测评

									if(info.riskRatingFlag == "1") {

										this.$go('/prod/buyBid', {
											bidNo: i.bidNo,
											promiseInviteId: i.promiseInviteId,
											backTitle: '确认履约',
											inviteAmount: i.inviteAmount
										});

									} else {
										this.$go('/wealth/riskTest');
									}

								} else {
									this.$go('/wealth/autoInvest');
								}

							} else {
								this.$go('/wealth/autoInvest');
							}

						}

					} else if(res.code == "1210" || res.code == "1000") {
						this.$go('/login');
					} else {
						this.$toask(res.message);
					}

				});

			}
		},
		watch: {}
	}
</script>

<style lang="scss" scoped>
	.promise {
		margin: 0 auto;
		padding: 0;
		width: 7.5rem;
		padding-bottom: 1.5rem;
		&-none {
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
			background-color: #FFFFFF;
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
		&-list {}
		&-div {
			margin: .44rem .3rem 0;
			width: 6.9rem;
			/*height: 3.52rem;*/
			background: url(../../assets/main/mine/lxcn.png) no-repeat 0 0;
			background-size: 100% 100%;
			box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.06);
			background-color: #FFFFFF;
			.opacity {
				opacity: .5;
				pointer-events: none;
			}
			.unClick {
				opacity: 1;
				pointer-events: none;
			}
			&-join {
				margin: 0 .3rem;
				width: 6.3rem;
				height: 2.64rem;
				text-align: left;
				border-bottom: 1px solid #E5E5E5;
				overflow: hidden;
				p:nth-child(1) {
					float: left;
					margin: .3rem 0;
					color: #666666;
					line-height: .28rem;
					width: 100%;
				}
				p:nth-child(2) {
					float: left;
					color: #FF5513;
					margin: 0 0 .28rem 0;
					width: 100%;
					text-align: left;
					font-size: .56rem;
					i {
						font-style: inherit;
						font-size: .36rem;
					}
				}
				p:nth-child(3) {
					float: left;
					width: 3.0rem;
					height: 1.0rem;
					text-align: left;
					line-height: .28rem;
				}
				p:nth-child(4) {
					float: left;
					width: 3.0rem;
					height: 1.0rem;
					text-align: left;
				}
				&-span1 {
					display: inline-block;
					color: #999999;
					margin-bottom: .2rem;
					text-align: left;
				}
				&-span2 {
					display: inline-block;
					width: 3.0rem;
					color: #666;
					text-align: left;
				}
			}
			&-p {
				margin: 0 .3rem;
				height: .87rem;
				line-height: .87rem;
				overflow: hidden;
				span:nth-child(1) {
					float: left;
				}
				span:nth-child(2) {
					margin: .16rem 0;
					float: right;
					width: 1.96rem;
					height: .52rem;
					line-height: .52rem;
					text-align: center;
					color: #208AFF;
					background-color: rgb(222, 237, 255);
					border: 1px solid rgb(187, 218, 253);
					border-radius: .52rem;
					display: flex;
					align-items: center;
					justify-content: center;
					position: relative;
					a {
						position: absolute;
						z-index: 2;
						width: 100%;
						height: 100%;
					}
					img {
						margin: .11rem .12rem;
						width: .3rem;
						height: .3rem;
						background-size: 100% 100%;
					}
				}
			}
			&-tips {
				width: 6.9rem;
				height: .9rem;
				line-height: .9rem;
				background: #FFF6E0;
				box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.06);
				color: #FF9616;
				text-align: center;
			}
		}
	}
</style>