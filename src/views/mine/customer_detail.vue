<template>
	<div class="customer_detail">
		<!--<div class="head center">
      <img class="icon place-img" src="/" alt="">
      <h2 class="name f28 color_font">{{item.userName}}</h2>
      <p class="text f24 color_font-s">{{item.beInviteDate}} 成为我的客户</p>
    </div>
    <div class="bg p4">
      <h2 class="title f32 color_font">客户投资背景</h2>
      <ul>
        <li>
          <h2 class="f28 color_font">{{['男','女','未确定'][item.sex-1] || '--'}} {{item.age+'岁' || '--'}}</h2>
          <p class="f24 color_font-s">性别&年龄</p>
        </li>
        <li>
          <h2 class="f28 color_font">--</h2>
          <p class="f24 color_font-s">被展业次数</p>
        </li>
        <li>
          <h2 class="f28 color_font">{{item.investCount+'次' || '--'}}</h2>
          <p class="f24 color_font-s">投资次数</p>
        </li>
        <li>
          <h2 class="f28 color_font">{{['激进型','进取型','稳健型','谨慎型','保守型'][item.endurance-1] || '--'}}</h2>
          <p class="f24 color_font-s">收益偏好</p>
        </li>
        <li>
          <h2 class="f28 color_font">--</h2>
          <p class="f24 color_font-s">风险偏好</p>
        </li>
        <li>
          <h2 class="f28 color_font">--</h2>
          <p class="f24 color_font-s">期限偏好</p>
        </li>
        <li>
          <h2 class="f28 color_font">--</h2>
          <p class="f24 color_font-s">累计收益</p>
        </li>
        <li>
          <h2 class="f28 color_font">{{item.investAmount || '--'}}</h2>
          <p class="f24 color_font-s">最高单笔投资额</p>
        </li>
        <li>
          <h2 class="f28 color_font">--</h2>
          <p class="f24 color_font-s">累积年化投资总额</p>
        </li>
        <li>
          <h2 class="f28 color_font">-</h2>
          <p class="f24 color_font-s">身价估算</p>
        </li>
        <li>
          <h2 class="f28 color_font">--</h2>
          <p class="f24 color_font-s">在平台的资产总额</p>
        </li>
        <li>
          <h2 class="f28 color_font">--</h2>
          <p class="f24 color_font-s">年收入</p>
        </li>
      </ul>
    </div>-->
		<!--<div class="introduction">-->

		<!--</div>-->
		<!--<div class="record">-->

		<!--</div>-->

		<div class="customer_detail-top">
			<img src="../../assets/main/mine/userImg.png" />
			<p class="f36 center customer_detail-top-p1"><span v-show="item.userName">{{item.userName|nameDesensitization}}</span><span>{{item.mobile|desensitization}}</span></p>
			<p class="f28 center customer_detail-top-p2">{{item.beInviteDate}}成为我的客户</p>
		</div>

		<div class="customer_detail-record borderB">
			<p @click="$go('InfoRegisterList',{userCode:userCode,rollType:1})">
				<img src="../../assets/main/mine/zy.png" />
				<span class="f28 color_font-36">展业记录</span>
			</p>
			<p @click="$go('user_promise',{userCode:userCode,backTitle:'邀约记录',rollType:1})">
				<img src="../../assets/main/mine/yy.png" />
				<span class="f28 color_font-36">邀约记录</span>
			</p>
			<p @click="$go('give_record',{userCode:userCode,rollType:1})">
				<img src="../../assets/main/mine/zs.png" />
				<span class="f28 color_font-36">赠送记录</span>
			</p>
		</div>

		<div class="customer_detail-mess borderB">
			<p class="f28">
				<span class="color_font-99 customer_detail-mess-span1">性别</span>
				<span class="color_font-36  customer_detail-mess-span2">{{['男','女','未确定'][item.sex-1] || '--'}}</span>
				<span class="color_font-99 customer_detail-mess-span1">投资次数</span>
				<span class="color_font-36  customer_detail-mess-span3">{{item.investCount|| '--'}}次</span>
			</p>
			<p class="f28">
				<span class="color_font-99  customer_detail-mess-span1">年龄</span>
				<span class="color_font-36 customer_detail-mess-span2">{{item.age|| '--'}}岁</span>
				<span class="color_font-99  customer_detail-mess-span1">单笔最高</span>
				<span class="color_font-36 customer_detail-mess-span3">{{item.investAmount/10000 || '--'}}万元</span>
			</p>
			<p class="f28">
				<span class="color_font-99  customer_detail-mess-span1">风险偏好</span>
				<span class="color_font-36 customer_detail-mess-span2">{{['激进型','进取型','稳健型','谨慎型','保守型'][item.endurance-1] || '--'}}</span>
			</p>
		</div>

		<div class="customer_detail-list">
			<!---->
			<p class="customer_detail-list-title f32">客户资产 <span v-show="AssetsItem.length" @click="$go('userAssets',{rollType:1,userCode:userCode})" class="f28 color_font-99">更多</span></p>
			<div v-if="AssetsItem.length">
				<div class="customer_detail-list-detail borderB" v-for="(i,index) in AssetsItem" v-show="index<=2">
					<p class="f28 customer_detail-list-detail-p">{{i.borrowName}} <span class="f28 customer_detail-list-detail-p-span">持有中</span></p>
					<div class="customer_detail-list-detail-div">
						<p><span class="f36">{{i.initCashAmount|formatNum}}</span><span class="f24">投资金额(元)</span></p>
						<p><span class="f24"><i class="f36">{{i.interestEndDate}}</i></span><span class="f24">到期日期</span></p>
						<p><span class="f36">+{{i.holdAmount|formatNum}}</span><span class="f24">持有收益(元)</span></p>
					</div>
				</div>
			</div>
			<div v-else>
				<img class="customer_detail-list-img" src="../../assets/main/mine/Groupzwzc@2x.png" />
				<p class="f28 center" style="color: #666666;margin-bottom: 1.0rem;">暂无资产</p>
			</div>

		</div>

	</div>
</template>

<script>
	import {
		getExistingCustomers,
		invesPropertyCustomer
	} from '@/service'
	export default {
		name: 'customer_detail',
		data() {
			return {
				item: {},
				AssetsItem: [],
				userCode: this.$route.query.userCode,
			}
		},
		created() {
			this.init();
			this.customerAssets();
		},
		methods: {
			init() {
				const userCode = this.$route.query.userCode;
				getExistingCustomers({
					userCode
				}).then(r => this.item = r);
			},
			customerAssets() {
				const userCode = this.$route.query.userCode;
				invesPropertyCustomer({
					userCode,
					bidType: 2,
					status: 2,
					pageNum: 1,
				}).then(r => this.AssetsItem = r.dataList);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.customer_detail {
		margin: 0 auto;
		padding: 0;
		width: 7.5rem;
		.borderB {
			border-bottom: 1px solid #E5E5E5;
		}
		&-top {
			width: 7.5rem;
			height: 3.24rem;
			background: #208AFF;
			color: #FFF6E0;
			img {
				margin: .48rem 3.15rem 0;
				width: 1.2rem;
				height: 1.2rem;
				background-size: 100% 100%;
			}
			&-p1 {
				margin: .2rem 0 .24rem;
				line-height: .36rem;
				span {
					margin-left: .2rem;
				}
			}
			&-p2 {
				color: #C6E1FF;
			}
		}
		&-record {
			margin: 0 .3rem;
			padding: 0 .48rem;
			width: 5.92rem;
			display: flex;
			justify-content: space-between;
			p {
				width: 1.2rem;
				overflow: hidden;
				img {
					float: left;
					margin: .6rem .38rem .22rem;
					width: .44rem;
					height: .44rem;
					background-size: 100% 100%;
				}
				span {
					float: left;
					width: 1.2rem;
					text-align: center;
					margin-bottom: .6rem;
				}
			}
		}
		&-mess {
			margin: 0 .3rem;
			padding: .28rem 0 .6rem;
			width: 6.9rem;
			p {
				margin: .32rem 0 0 0;
				line-height: .28rem;
				overflow: hidden;
				text-align: left;
			}
			&-span1 {
				float: left;
				width: 1.92rem;
			}
			&-span2 {
				float: left;
				width: 1.78rem;
			}
			&-span3 {
				float: left;
				width: 1.28rem;
			}
		}
		&-list {
			margin: 0 .3rem;
			width: 6.9rem;
			&-img {
				margin: 1.2rem 2.39rem .4rem;
				width: 2.12rem;
				height: 2.14rem;
				background-size: 100% 100%;
			}
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