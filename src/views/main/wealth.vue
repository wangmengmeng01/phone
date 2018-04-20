<template>
  <div class="wealth pageCenter">
    <!--<div class="wealthTop">
      <p>财富</p>
      <div class="wealthA">
        <span>总金额(元)</span>
        <img @click="tips" src="../../assets/wealth/wealth/tips.png">
        <div class="status" v-if="getUserS.openStatus">已开通存管账户</div>
        <div class="amount">{{home.totalAmount|formatNum}}</div>
      </div>
      <div class="wealthEarn">
        <div class="totalE">
          <div>累计收益(元)</div>
          <div class="wealthEarnData">{{home.sumAmount|formatNum}}</div>
        </div>
  
        <div class="avalibleE">
          <div>可用余额(元)</div>
          <div class="wealthEarnData">{{home.availableAmount|formatNum}}</div>
        </div>
      </div>
    </div>
    <div class="RWWrap">
      <div class="withdraw" @click="gowithdraw()"><img src="../../assets/wealth/wealth/withdraw.png" alt="">提现</div>
      <div class="recharge" @click="goRecharge()"><img src="../../assets/wealth/wealth/recharge.png" alt="">充值</div>
    </div>
    <ul class="wealthContent">
      <li v-for="(i,index) in menu" @click="linkto(i.url)"  :class="index>6?'hideDiv':''">
        <img :src="require(`@/assets/wealth/wealth/${i.icon}.png`)" alt="" class="icon">
        <div class="wealthCName" >{{i.name}}</div>
      </li>
    </ul>-->
  
  	<div class="wealth-top sonDiv f28">
  		<img src="../../assets/main/mine/lcs.png"/>
  		<span>赵毅明  185****6666</span>
  	</div>
  	<div class="wealth-center sonDiv">
  		<p class="zzc"><span class="f24 color_font-99">总资产(元)</span> <img src="../../assets/wealth/openEye.png"/></p>
  		<p class="total color_font-36 f56">{{home.totalAmount|formatNum}}</p>
  		<div class="wealth-center-div borderB">
  			<p class="p1">
  				<span class="f24 span1 color_font-99">累计收益(元) <img src="../../assets/common/arrow-right.png"/></span>
  				<span class="f40 span2">{{home.sumAmount|formatNum}}</span>
  			</p>
  			<p class="p2">
  				<span class="f24 span1 color_font-99">昨日收益(元) <img src="../../assets/common/arrow-right.png"/></span>
  				<span class="f40 span2">{{home.yesterdayAmount|formatNum}}</span>
  			</p>
  		</div>
  		
  		<div class="wealth-center-next f32">
  			<p class="f28 color_font-99">可用余额(元)</p>
  			<p class="f28">{{home.availableAmount|formatNum}}</p>
  			<p @click="gowithdraw()">提现</p>
  			<p @click="goRecharge()">充值</p>
  		</div>
  	</div>
  	
  	<div class="wealth-record f28 color_font-99">
  		<p @click="$go('/wealth/assertList',{rollType:1})">
  			<img src="../../assets/wealth/wdtz.png"/>
  			<span>我的投资</span>
  		</p>
  		<p @click="$go('/wealth/continueInvest',{rollType:1})">
  			<img src="../../assets/wealth/wdxt.png"/>
  			<span>我的续投</span>
  		</p>
  		<p @click="$go('/wealth/tradeRecord',{rollType:1})">
  			<img src="../../assets/wealth/jyjl.png"/>
  			<span>交易记录</span>
  		</p>
  	</div>
  	
  
  	<div class="wealth-list f30 color_font-36 sonDiv">
  		<p class="borderB " @click="$go('/coupon/main',{rollType:1})"> 
  			<img class="img1" src="../../assets/wealth/icon-coupon.png"/>
  			<span>优惠券</span>
  			<img class="img2" src="../../assets/common/arrow-right.png"/>
  		</p>
  		<p class="borderB ">
  			<img class="img1" src="../../assets/wealth/icon-bank.png"/>
  			<span>银行卡</span>
  			<img  class="img2" src="../../assets/common/arrow-right.png"/>
  		</p>
  		<p>
  			<img class="img1" src="../../assets/wealth/icon-risk.png"/>
  			<span>风险评估</span>
  			<img  class="img2" src="../../assets/common/arrow-right.png"/>
  		</p>
  	</div>
  	
  	<div class="wealth-tips sonDiv f26">
  		开通自动授权投标功能，才能进行投资<span>立即开通</span> <img src="../../assets/wealth/icon-close.png"/>
  	</div>
  	
  </div>
</template>

<script>
  import {
    wealthIndex,
    invesProperty,
    getUserStatus,
    userActivate
  } from '@/service'
   import axios from 'axios'
   export default {
	name: 'wealth',
	data() {

		return {
			totalAmount: 0,
			menu: [{
					icon: 'wtradeP',
					name: '改交易密码',
					url: '/wealth/tranderPassword'
				},
//				{
//					icon: 'wEarn',
//					name: '收益明细',
//					url: ''
//				},
				{
					icon: "wcontinue",
					name: '我的续投',
					url: 'wealth/continueInvest'
				},
				{
					icon: 'wchangeBank',
					name: '我的银行卡',
					url: 'wealth/changeBank'
				},
				{
					icon: 'wtradeRecord',
					name: '交易记录',
					url: 'wealth/tradeRecord'
				},
				{
					icon: 'wmyConpun',
					name: '我的优惠',
					url: '/coupon'
				},
				{
					icon: 'wautoin',
					name: '自动投标',
					url: 'wealth/autoInvest'
				},
				{
					icon: 'wrisktest',
					name: '风险测评',
					url: 'wealth/riskTest'
				},
				{
					icon: 'wmyPoint',
					name: '我的积分',
					url: ''
				},
				
				{
					icon: 'wmyPoint',
					name: '我的积分',
					url: ''
				}
			],
			home: "",
			invesProperty: {
				data: {
					bidType: '2',
					status: '2',
					pageNum: '1'
				},
				res: {}
			},
			getUserS: {
				"openStatus": true
			},
			statusInfo: '',

		}
	},
	created() {
		this.init()
	},
	methods: {
		linkto(url) {
			if(url == "wealth/changeBank") {
				if(this.getUserS.openStatus == true) {
					this.TouserActivate('/wealth/changeBank');
				} else {
					this.$go('/reg_bank')
				}
			} else if(url == "wealth/autoInvest") {
				if(this.getUserS.openStatus == true) {
					this.TouserActivate('/wealth/autoInvest');
				} else {
					this.$go('/reg_bank')
				}
			} else {
				this.$go(url)

			}

		},
		tips() {
			this.$toask("总金额=可用金额+我的合计资产额");
		},
		init() {
			wealthIndex().then(res => {
				this.home = res;
			});
			getUserStatus().then(res => {
				const info = res.result;
				this.statusInfo = res.result;
				console.log(info);
				switch(parseInt(info.openAccountStatus)) {
					case 1:
						this.getUserS.openStatus = false;
						break;

				}

			});
			invesProperty(this.invesProperty.data).then(res => {
				console.log(res)
				this.invesProperty.res = res.dataList.slice(0, 2);
				this.totalAmount = res.totalAmount;
				console.log(this.invesProperty.res)
			});
		},
		gowithdraw() {
			if(this.getUserS.openStatus == true) {
				this.TouserActivate('/wealth/withdraw');
			} else {
				this.$go('/reg_bank')
			}
		},

		TouserActivate(val) {

			let info = this.statusInfo;
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
				this.$go(val);
			}

		},

		goRecharge() {
			if(this.getUserS.openStatus == true) {
				this.TouserActivate('/wealth/recharge');
			} else {
				this.$go('/reg_bank')
			}
		},
	},
	watch: {}
}</script>

<style lang="scss" scoped>
	.wealth{
		padding-bottom: 1.0rem;
		&-top{
			float: left;
			color: #FFF;
			margin: 0;
			padding: .44rem .3rem .48rem;
			height: 1.0rem;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			background:#0C80FE;
			img{
				width: 1.0rem;
				height: 1.0rem;
				background-size: 100% 100%;
				margin-right: .22rem;
			}
		}
		&-center{
			float: left;
			background-color: #FFFFFF;
			.zzc{
				margin-top: .34rem;
				height: .48rem;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				img{
					width: .48rem;
					height: .48rem;
					background-size: 100% 100%;
					margin-left: .34rem;
				}
			}
			.total{
				margin: .08rem 0 .5rem;
				font-style: .56rem;
				line-height: .56rem;
			}
			&-div{
				display: flex;
				justify-content: flex-start;
				.p1{
					width: 3.64rem;
				}
				.p2{
					width: 3.26rem;
				}
				
				.span1{
					margin: 0 0 .16rem 0;
					width: 100%;
					height: .24rem;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					img{
						width: .14rem;
						height: .24rem;
						background-size: 100% 100%;
						margin-left: .3rem;
					}
					
				}
				.span2{
					margin: 0 0 .46rem 0;
					width: 100%;
					height: .40rem;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					color: #FF5513;
				}
			}
			&-next{
				margin: .44rem 0 .46rem;
				height: .32rem;
				height: .32rem;
				overflow: hidden;
				text-align: left;
				p:nth-child(1){
					float: left;
					width: 1.92rem;
				}
				p:nth-child(2){
					float: left;
					width: 3.04rem;
					color: #666666;
				}
				p:nth-child(3){
					width: .96rem;
					float: left;
					text-align: left;
					border-right:1px solid  #E5E5E5;
					color: #0C80FE ;
				}
				p:nth-child(4){
					float: left;
					width: .96rem;
					text-align: right;
					color: #0C80FE ;
				}
			}
		}
		
		
		
		
		&-record{
			float: left;
			margin: .16rem 0;
			padding: 0 .7rem;
			width: 6.1rem;
			background-color: #FFFFFF;
			display: flex;
			justify-content: space-between;
			p{
				width: 1.12rem;
				text-align: center;
				img{
					width: .56rem;
					height: .56rem;
					background-size: 100% 100%;
					margin: .3rem .28rem .1rem;
				}
				span{
					margin: 0 0 .32rem;
					display: block;
					line-height: .28rem;
				}
			}
		}
		&-list{
			background: #FFFFFF;
			overflow: hidden;
			p{ 
				float: left;
				padding:.26rem 0;
				height: .48rem;
				line-height: .48rem;
				width: 6.9rem;
				overflow: hidden;
				.img1{
					float: left;
					width: .48rem;
					height: .48rem;
					background-size: 100% 100%;
					margin-right: .32rem;
				}
				.img2{
					float: right;
					width: .14rem;
					height: .24rem;
					background-size: 100% 100%;
				}
				
			}
			
		}
		&-tips{
			position: fixed;
			left: 0;
			right: 0;
			bottom: 1.0rem;
			height: .8rem;
			background: #FFF6E0;
			color: #FF9616 ;
			display: flex;
			align-items: center;
			justify-content: space-between;
			span{
				width: 1.4rem;
				height: .48rem;
				line-height: .48rem;
				text-align: center;
				background: #FF9000 ;
				color: #FFFFFF;
				border-radius: .48rem;
			}
			img{
				width: .4rem;
				height: .4rem;
				background-size: 100%;
			}
		}
		
	}


</style>

