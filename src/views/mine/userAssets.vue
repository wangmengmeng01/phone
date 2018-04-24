<template>
	<div class="userAssets">

		<div class="userAssets-list" v-if="AssetsItem.length">

			<div class="userAssets-list-detail borderB" v-for="(i,index) in AssetsItem">
				<p class="f28 userAssets-list-detail-p">{{i.borrowName}} <span class="f28 userAssets-list-detail-p-span" :class="i.cashStatus==4?'dis':' '">{{i.cashStatus==4?'已到期':'持有中'}}</span></p>
				<div class="userAssets-list-detail-div">
					<p><span class="f36">{{i.initCashAmount|formatNum}}</span><span class="f24">投资金额(元)</span></p>
					<p><span class="f24"><i class="f36">{{i.interestEndDate}}</i></span><span class="f24">到期日期</span></p>
					<p><span class="f36">+{{i.holdAmount|tofixed2}}</span><span class="f24">持有收益(元)</span></p>
				</div>
			</div>

			<!--<div class="userAssets-list-detail borderB">
    			<p class="f28 userAssets-list-detail-p">周周赢20180402-02期 <span class="f28 userAssets-list-detail-p-span dis">持有中</span></p>
    			<div class="userAssets-list-detail-div">
    				<p><span class="f36">40,000.00</span><span class="f24">投资金额(元)</span></p>
    				<p><span class="f24"><i class="f36">12</i>天</span><span class="f24">到期天数</span></p>
    				<p><span class="f36">+60.00</span><span class="f24">持有收益(元)</span></p>
    			</div>
    		</div>
    		<div class="userAssets-list-detail borderB">
    			<p class="f28 userAssets-list-detail-p">周周赢20180402-02期 <span class="f28 userAssets-list-detail-p-span dis">持有中</span></p>
    			<div class="userAssets-list-detail-div">
    				<p><span class="f36">40,000.00</span><span class="f24">投资金额(元)</span></p>
    				<p><span class="f24"><i class="f36">12</i>天</span><span class="f24">到期天数</span></p>
    				<p><span class="f36">+60.00</span><span class="f24">持有收益(元)</span></p>
    			</div>
    		</div>
    		-->

		</div>
		<div v-else class="userAssets-none">
			<img src="../../assets/main/mine/zwjl.png" />
			<p class="f28 center">暂无记录</p>
		</div>

	</div>
</template>

<script>
	import {
		getExistingCustomers,
		invesPropertyCustomer
	} from '@/service'
	export default {
		name: 'userAssets',
		data() {
			return {
				item: {},
				AssetsItem: [],
				userCode: this.$route.query.userCode,
				pageNum: 1,
				total: 0,
			}
		},
		created() {
			this.customerAssets();
		},
		mounted() {
			window.scroll(0, 0);
			document.body.onscroll = () => {

				if((document.documentElement.scrollTop || document.body.scrollTop) >= document.body.scrollHeight - document.documentElement.clientHeight) {

					this.pageNum++;
					if(this.pageNum > this.total) {
						return;
					}
					if(this.$route.query.rollType) {
						this.customerAssets();
					}
				}
			}
		},
		methods: {

			customerAssets() {
				const userCode = this.$route.query.userCode;
				invesPropertyCustomer({
					userCode,
					bidType: 2,
					status: 1,
					pageNum: this.pageNum,
				}).then(r => {
					this.AssetsItem =this.AssetsItem.concat(r.dataList);
					this.total = Math.ceil(r.totalNum / 10);
				});
			}

		}
	}
</script>

<style lang="scss" scoped>
	.userAssets {
		margin: 0 auto;
		padding: 0;
		width: 7.5rem;
		.borderB {
			border-bottom: 1px solid #E5E5E5;
		}
		&-none {
			padding: 0 .3rem;
			width: 6.9rem;
			img {
				margin: 4.8rem 2.74rem .6rem;
				padding: 0;
				width: 1.42rem;
				height: .98rem;
				background-size: 100% 100%;
			}
			p {
				color: #666666;
			}
		}
		&-list {
			margin: 0 .3rem;
			width: 6.9rem;
			&-title {
				margin-top: .6rem;
				line-height: .32rem;
				overflow: hidden;
				font-weight: 500;
				span {
					float: right;
					font-weight: normal;
				}
			}
			&-detail {
				&-p {
					margin: .32rem 0 .18rem;
					width: 6.9rem;
					line-height: .4rem;
					&-span {
						margin-left: .16rem;
						width: .96rem;
						height: .4rem;
						line-height: .4rem;
						padding: 0.03rem .12rem;
						text-align: center;
						border: 1px solid #208AFF;
						border-radius: 3px;
						color: #208AFF;
					}
					.dis {
						color: #999999;
						border: 1px solid #999999;
					}
				}
				&-div {
					overflow: hidden;
					p:nth-child(1) {
						float: left;
						width: 3.06rem;
						overflow: hidden;
						span:nth-child(1) {
							text-align: left;
							display: block;
							margin-bottom: .32rem;
							line-height: .32rem;
							color: #FF5513;
						}
						span:nth-child(2) {
							text-align: left;
							display: block;
							margin-bottom: .4rem;
							line-height: .24rem;
						}
					}
					p:nth-child(2) {
						float: left;
						width: 2.22rem;
						overflow: hidden;
						span:nth-child(1) {
							text-align: left;
							display: block;
							margin-bottom: .32rem;
							line-height: .32rem;
							color: #3F3F3F;
							i {
								font-style: inherit;
								color: #363636;
							}
						}
						span:nth-child(2) {
							text-align: left;
							display: block;
							margin-bottom: .4rem;
							line-height: .24rem;
						}
					}
					p:nth-child(3) {
						float: left;
						width: 1.4rem;
						overflow: hidden;
						span:nth-child(1) {
							text-align: left;
							display: block;
							margin-bottom: .32rem;
							line-height: .32rem;
							color: #FAC151;
						}
						span:nth-child(2) {
							text-align: left;
							display: block;
							margin-bottom: .4rem;
							line-height: .24rem;
						}
					}
				}
			}
		}
	}
</style>