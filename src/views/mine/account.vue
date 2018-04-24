<template>
	<div class="account pageCenter">
		<!--<ul class="item">
      <li v-for="i in pwdList" class="m4 flex border-notend-b" @click="$go(i.url)">
        <span class="f32 color_font">{{i.name}}</span>
        <img src="../../assets/common/arrow-right.png" alt="">
      </li>
    </ul>
    <ul class="item">
      <li v-for="i in infoList"  @click="$go(i.url)" class="m4 flex border-notend-b">
        <span class="f32 color_font">{{i.name}}</span>
        <img src="../../assets/common/arrow-right.png" alt="">
      </li>
    </ul>
    <ul class="item">
      <li class="p4">
        <a href="tel:400-088-0888" class="flex border-notend-b">
          <span class="f32 color_font">客服电话 400-088-0888</span>
          <div class="flex">
            <span class="color_main f32 tel">拨打</span>
            <img src="../../assets/common/arrow-right.png" alt="">
          </div>
        </a>
      </li>
    </ul>
    <p class="tip f24 color_font-s">服务时间 9:00-18:00</p>-->
		<div class="account-top sonDiv">
			<img src="../../assets/wealth/Group@2x.png" />
			<p>
				<span class="f36 span1">完善信息</span>
				<span class="f28 span2">为您的资金安全保驾护航</span>
			</p>
		</div>
		<div class="account-div sonDiv">
			<span>姓名</span>
			<span v-if="!statusBol" @click="$go('/reg_bank')" class="color_font-99">未认证<img src="../../assets/common/arrow-right.png"/></span>
			<span v-else class="color_font-99">{{cardMes.realName}}<img src="../../assets/common/arrow-right.png"/></span>

		</div>

		<div class="account-div sonDiv maTop borderB">
			<span>银行卡</span>
			<span v-if="!statusBol" @click="$go('/reg_bank')" class="color_font-99">未绑定<img src="../../assets/common/arrow-right.png"/></span>
			<span v-else class="color_font-99" @click="$go('/wealth/changeBank')">修改<img src="../../assets/common/arrow-right.png"/></span>

		</div>
		<div class="account-div sonDiv">
			<span>银行预留手机</span>
			<span v-if="!statusBol" @click="$go('/reg_bank')" class="color_font-99">未绑定<img src="../../assets/common/arrow-right.png"/></span>
			<span v-else class="color_font-99" >{{cardMes.mobile}}<img src="../../assets/common/arrow-right.png"/></span>

		</div>
		<div class="account-div sonDiv maTop borderB">
			<span>交易密码</span>
			<span v-if="!statusBol" class="color_font-99">未设置<img src="../../assets/common/arrow-right.png"/></span>
			<span v-else class="color_font-99" @click="$go('/wealth/tranderPassword')">已设置<img src="../../assets/common/arrow-right.png"/></span>

		</div>

		<div class="account-div sonDiv">
			<span>登录密码</span>
			<span class="color_font-99" @click="$go('/forget_pwd',{backTitle:'修改登录密码',mobile:item.userNmae,type:1})" >修改<img src="../../assets/common/arrow-right.png"/></span>
		</div>

	</div>
</template>

<script>
	import {
		getUserStatus,
		selectBeforeRecharge
	} from '@/service'
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: 'account',
		data() {
			return {
				statusInfo: '',
				statusBol: true,
				cardMes: '',
				item:'',
				
			}
		},
		computed: {
			...mapGetters([
				'user'
			])
		},
		created() {
			this.init();
			this.item = this.user;
		},
		
		components: {},
		methods: {
			init() {
				getUserStatus().then(res => {
					const info = res.result;
					this.statusInfo = res.result;
					console.log(info);
					switch(parseInt(info.openAccountStatus)) {
						case 1:
							this.statusBol = false;
							break;
						default:
							this.mes();
							this.statusBol = true;
							break;
					}

				})

			},
			mes() {
				selectBeforeRecharge().then(res => {
					this.cardMes = res;
				});
			}

		},
		watch: {}
	}
</script>

<style lang="scss" scoped>
	.account {
		&-top {
			float: left;
			background: #1E76FD;
			width: 6.9rem;
			padding: .54rem .3rem;
			height: 1.36rem;
			color: #FFFFFF;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			img {
				width: 1.36rem;
				height: 1.36rem;
				background-size: 100% 100%;
				margin: 0 .16rem 0 .4rem;
			}
			p {
				.span1 {
					display: block;
					margin: .24rem 0;
				}
				.span2 {
					display: block;
				}
			}
		}
		&-div {
			float: left;
			width: 6.9rem;
			height: 1.0rem;
			background-color: #FFFFFF;
			color: #363636;
			font-size: .28rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			img {
				width: .14rem;
				height: .24rem;
				background-size: 100% 100%;
				margin-left: .2rem;
			}
		}
		.maTop {
			margin-top: .2rem;
		}
	}
</style>