<template>
	<div class="calculation">
		<div class="calculation-top boderBottom">
			<p class="calculation-top-p1 f40"><i>{{detail.annualizedRate|tofixed2}}</i>% <span v-show="detail.appendRate>0">+{{detail.appendRate|tofixed2}}%</span></p>
			<p class="calculation-top-p2 f24 color_font-99">历史年化</p>
		</div>
		<div class="calculation-center boderBottom">
			<p class="calculation-center-p1 f28 color_font">购买金额(元)</p>
			<p class="calculation-center-p2 f24 color_font-99">{{detail.investMinAmount|formatNum}}元起投，{{detail.investAscendingAmount|formatNum}}的整数倍递增</p>
			<p class="calculation-center-p3">
				<img v-if="money<=detail.investMinAmount" @click="reduce" :class="money<=detail.investMinAmount?'disable':''" src="../../assets/main/prod/reduce.png" />
				<img v-else  @click="reduce" :class="money<=detail.investMinAmount?'disable':''"  src="../../assets/main/prod/reduce-h.png" />
				<input type="number" @blur="inputBlur" name="" id="" v-model.number="money" maxlength="8" />
				<img @click="add" v-if="money<detail.investMaxAmount" :class="money>=detail.investMaxAmount?'disable':''" src="../../assets/main/prod/add.png" />
				<img @click="add" v-else :class="money>=detail.investMaxAmount?'disable':''" src="../../assets/main/prod/add-h.png" />
			</p>
		</div>
		<div class="calculation-time boderBottom">
			<p class="calculation-time-p1 f48 color_font">{{detail.periodLength}}{{detail.periodUnit|Totime}}</p>
			<p class="calculation-time-p2 f24 color_font-99">期限</p>
		</div>
		<div class="calculation-earn">
			<p class="calculation-earn-p1 f48">{{ExpectedRevenue}}</p>
			<p class="calculation-earn-p2 f24 color_font-99">参考收益(元)</p>
		</div>
		<div class="btn" @click="getStatus">
			按此金额购买
		</div>
	</div>
</template>

<script>
	import {
		searchProductBidsDetail,
		getUserStatus,
		userActivate,
		getExpectedRevenue
	} from '@/service'
	import axios from 'axios'
	export default {
		name: 'calculation',
		data() {
			return {
				item: {
					bidNo: this.$route.query.bidNo,
				},
				itemStatus: {},
				detail: {},
				money: 0,
				itemProd: {}, //计算收益参数
				ExpectedRevenue: 0, //预期收益
			}

		},
		created() {
			searchProductBidsDetail(this.item).then(res => {
				this.detail = res;
				this.money = parseInt(res.investMinAmount);
				this.itemProd = {
					appendRate: this.detail.appendRate,
					annualizedRate: this.detail.annualizedRate,
					periodLength: this.detail.periodLength,
					periodUnit: this.detail.periodUnit,
					profitPlan: this.detail.profitPlan,
				};
				this.inputBlur();
			});
		},
		methods: {
			reduce() {
				if(this.money < this.detail.investAscendingAmount) {
					return;
				}
				this.money -= parseInt(this.detail.investAscendingAmount);
				this.inputBlur();
			},
			add() {
				this.money += parseInt(this.detail.investAscendingAmount);
				this.inputBlur();
			},
			//计算收益

			inputBlur() {

				if(this.money > this.detail.investMaxAmount) {
					this.money = this.detail.investMaxAmount
				};
				if(this.money == "") {
					this.money = detail.investMinAmount;
				};
				this.itemProd.amount = this.money;
				getExpectedRevenue(this.itemProd).then(res => {
					this.ExpectedRevenue = (parseFloat(res.amount) - this.money).toFixed(2);
				});

			},
			getStatus() {
				getUserStatus(this.itemStatus).then(res => {
					//@click=""
					console.log(res);
					const info = res.result;
					if(res.code == "100") {

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
											bidNo: this.$route.query.bidNo,
											backTitle: '确认购买',
											inviteAmount:this.money,//计算器购买金额
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
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.boderBottom {
		border-bottom: 1px solid #ececec;
	}
	
	.disable {
		pointer-events: none;
	}
	
	.calculation {
		margin: 0 auto;
		padding: 0;
		width: 7.5rem;
		background-color: #FFFFFF;
		text-align: center;
		border-top: 1px solid rgba(0, 0, 0, 0.03);
		&-top {
			margin: 0 .3rem;
			width: 6.9rem;
			&-p1 {
				margin: .6rem 0 .24rem;
				line-height: .54rem;
				color: #FF5513;
				i {
					font-size: .72rem;
					font-style: inherit;
				}
			}
			&-p2 {
				margin-bottom: .38rem;
			}
		}
		&-center {
			margin: 0 .3rem;
			width: 6.9rem;
			&-p1 {
				margin-top: .33rem;
			}
			&-p2 {
				margin: .16rem 0 .40rem;
			}
			&-p3 {
				margin: 0 0 .40rem;
				img {
					width: .5rem;
					height: .5rem;
					background-size: 100% 100%;
				}
				input {
					width: 3.0rem;
					height: .5rem;
					line-height: .5rem;
					font-size: .6rem;
					text-align: center;
				}
			}
		}
		&-time {
			margin: 0 .3rem;
			width: 6.9rem;
			&-p1 {
				margin-top: .74rem;
			}
			&-p2 {
				margin: .16rem 0 .76rem;
			}
		}
		&-earn {
			margin: 0 .3rem;
			width: 6.9rem;
			&-p1 {
				margin-top: .71rem;
				color: #208AFF;
			}
			&-p2 {
				margin: .16rem 0 2.1rem;
			}
		}
		.btn {
			margin: 0 .3rem;
			width: 6.9rem;
		}
	}
</style>